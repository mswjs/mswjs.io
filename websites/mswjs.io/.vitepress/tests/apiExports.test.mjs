import assert from 'node:assert/strict'
import { mkdtemp, mkdir, writeFile, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { test } from 'node:test'
import { Application } from 'typedoc'
import { resolvePublicEntryPoints } from '../../scripts/api-exports.mjs'

async function createRelease(context, files) {
  const directory = await mkdtemp(path.join(tmpdir(), 'msw-public-exports-'))
  context.after(async () => {
    await rm(directory, { recursive: true, force: true })
  })
  for (const [filename, contents] of Object.entries(files)) {
    await mkdir(path.dirname(path.join(directory, filename)), {
      recursive: true,
    })
    await writeFile(path.join(directory, filename), contents)
  }
  return directory
}

await test('resolves nested export conditions and deduplicates declaration and runtime targets', async (context) => {
  const directory = await createRelease(context, {
    'src/core/index.ts': 'export const http = {}',
    'src/browser/index.ts': 'export const setupWorker = {}',
    'src/private.ts': 'export const hidden = {}',
  })
  const entries = resolvePublicEntryPoints(
    {
      name: 'msw',
      exports: {
        '.': {
          import: {
            types: './lib/core/index.d.mts',
            default: './lib/core/index.mjs',
          },
          require: './lib/core/index.js',
        },
        './browser': {
          node: null,
          browser: {
            types: './lib/browser/index.d.ts',
            default: './lib/browser/index.js',
          },
        },
        './blocked': null,
      },
    },
    directory,
  )
  assert.deepEqual(entries, [
    { sourcePath: path.join(directory, 'src/core/index.ts'), exports: ['msw'] },
    {
      sourcePath: path.join(directory, 'src/browser/index.ts'),
      exports: ['msw/browser'],
    },
  ])
})

await test('includes additional public subpaths without scanning their private siblings', async (context) => {
  const directory = await createRelease(context, {
    'src/core/http.ts': 'export const http = {}',
    'src/core/internal.ts': 'export const internal = {}',
    'src/native/index.ts': 'export const setupWorker = {}',
  })
  const entries = resolvePublicEntryPoints(
    {
      name: 'msw',
      exports: {
        './core/http': './lib/core/http.mjs',
        './native': { 'react-native': './lib/native/index.js', browser: null },
      },
    },
    directory,
  )
  assert.deepEqual(
    entries.map((entry) => entry.exports),
    [['msw/core/http'], ['msw/native']],
  )
})

await test('omits public assets that do not declare library modules', async (context) => {
  const directory = await createRelease(context, {
    'src/core/index.ts': 'export const http = {}',
    'src/mockServiceWorker.js': 'self.addEventListener("fetch", () => {})',
  })
  const entries = resolvePublicEntryPoints(
    {
      name: 'msw',
      exports: {
        '.': './lib/core/index.js',
        './mockServiceWorker.js': './lib/mockServiceWorker.js',
        './package.json': './package.json',
      },
    },
    directory,
  )
  assert.deepEqual(
    entries.map((entry) => entry.exports),
    [['msw']],
  )
})

await test('fails when a public target cannot be mapped instead of expanding all source files', async (context) => {
  const directory = await createRelease(context, {
    'src/internal.ts': 'export const hidden = {}',
  })
  assert.throws(
    () =>
      resolvePublicEntryPoints(
        { name: 'msw', exports: { '.': './lib/missing.js' } },
        directory,
      ),
    /Cannot resolve public export/,
  )
})

await test('fails when the release has no exports map', () => {
  assert.throws(
    () =>
      resolvePublicEntryPoints(
        { name: 'msw', main: './lib/index.js' },
        '/unused',
      ),
    /no package.json exports map/,
  )
})

await test('documents only symbols exported through the public barrel', async (context) => {
  const directory = await createRelease(context, {
    'src/index.ts': "export { publicApi } from './implementation'",
    'src/implementation.ts':
      'export function publicApi(): void {}\nexport function privateUtility(): void {}',
    'src/hidden.ts': 'export class HiddenApi {}',
  })
  const entryPoints = resolvePublicEntryPoints(
    { name: 'msw', exports: { '.': './lib/index.js' } },
    directory,
  )
  const configuration = path.join(directory, 'tsconfig.json')
  await writeFile(
    configuration,
    JSON.stringify({ files: entryPoints.map((entry) => entry.sourcePath) }),
  )
  const application = await Application.bootstrap({
    name: 'MSW',
    entryPoints: entryPoints.map((entry) => entry.sourcePath),
    entryPointStrategy: 'resolve',
    tsconfig: configuration,
    skipErrorChecking: true,
  })
  const project = await application.convert()
  assert.ok(project)
  assert.deepEqual(
    project.children.map((reflection) => reflection.name),
    ['publicApi'],
  )
})

await test('excludes symbol members while retaining the public class and ordinary computed properties', async (context) => {
  const directory = await createRelease(context, {
    'src/index.ts':
      "export { ResponseImplementation as HttpResponse } from './response'",
    'src/response.ts': `const bodyType: unique symbol = Symbol('bodyType')
const propertyName = 'status'
export class ResponseImplementation {
  readonly [bodyType]: string
  [propertyName] = 200
  json(): string {
    return '{}'
  }
  [Symbol.iterator](): Iterator<string> {
    return [][Symbol.iterator]()
  }
}
export function internalResponseHelper(): void {}
`,
  })
  const entries = resolvePublicEntryPoints(
    { name: 'msw', exports: { '.': './lib/index.js' } },
    directory,
  )
  const configuration = path.join(directory, 'tsconfig.json')
  await writeFile(
    configuration,
    JSON.stringify({
      compilerOptions: { target: 'ES2022' },
      files: entries.map((entry) => entry.sourcePath),
    }),
  )
  const application = await Application.bootstrap({
    entryPoints: entries.map((entry) => entry.sourcePath),
    entryPointStrategy: 'resolve',
    tsconfig: configuration,
    skipErrorChecking: true,
  })
  const { excludeSymbolMembers } = await import('../../scripts/api-exports.mjs')
  excludeSymbolMembers(application)
  const project = await application.convert()
  assert.ok(project)
  assert.deepEqual(
    project.children.map((reflection) => reflection.name),
    ['HttpResponse'],
  )
  assert.deepEqual(
    project.children[0].children.map((reflection) => reflection.name),
    ['constructor', 'status', 'json'],
  )
  assert.equal(
    Object.values(project.reflections).some((reflection) => {
      return (
        reflection.name.includes('bodyType') ||
        reflection.name.includes('iterator')
      )
    }),
    false,
  )
})
