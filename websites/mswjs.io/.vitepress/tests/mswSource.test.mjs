import assert from 'node:assert/strict'
import { mkdtemp, mkdir, writeFile, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { test } from 'node:test'
import {
  resolveLatestRelease,
  resolvePublicEntryPoints,
} from '../../scripts/msw-source.mjs'

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

await test('selects the published release tag instead of its target branch', async () => {
  const release = await resolveLatestRelease(async (url) => {
    assert.equal(url, 'https://api.github.com/repos/mswjs/msw/releases/latest')
    return Response.json({
      tag_name: 'v2.15.0',
      target_commitish: 'main',
      draft: false,
      prerelease: false,
    })
  })
  assert.equal(release.tag, 'v2.15.0')
})

await test('rejects unavailable release metadata instead of falling back to main', async () => {
  await assert.rejects(
    resolveLatestRelease(async () => {
      return new Response(null, { status: 403 })
    }),
    /HTTP 403/,
  )
})

await test('rejects prereleases', async () => {
  await assert.rejects(
    resolveLatestRelease(async () => {
      return Response.json({
        tag_name: 'v3.0.0-beta.1',
        draft: false,
        prerelease: true,
      })
    }),
    /published stable/,
  )
})

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
