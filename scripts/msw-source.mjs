import { execFileSync } from 'node:child_process'
import {
  existsSync,
  mkdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import ts from 'typescript'

export const repositoryUrl = 'https://github.com/mswjs/msw'

const siteDirectory = fileURLToPath(new URL('../', import.meta.url))
const cacheDirectory = path.join(siteDirectory, '.vitepress/cache/msw-source')
const storeDirectory = path.join(cacheDirectory, 'store')
const READY_MARKER = '.msw-source.json'
const pulledReleasePath = path.join(cacheDirectory, 'pulled-release.json')

/**
 * Resolve the latest published stable MSW release from GitHub.
 * Never falls back to "main", the newest Git tag, or a prerelease.
 */
export async function resolveLatestRelease(fetchRelease = fetch) {
  const headers = { Accept: 'application/vnd.github+json' }
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`
  }
  const response = await fetchRelease(
    `https://api.github.com/repos/mswjs/msw/releases/latest`,
    { headers, signal: AbortSignal.timeout(30_000) },
  )
  if (!response.ok) {
    throw new Error(`Cannot resolve latest MSW release: HTTP ${response.status}`)
  }
  const release = await response.json()
  if (
    typeof release.tag_name !== 'string' ||
    !release.tag_name ||
    release.draft ||
    release.prerelease
  ) {
    throw new Error('GitHub did not return a published stable MSW release')
  }
  execFileSync('git', ['check-ref-format', `refs/tags/${release.tag_name}`])
  return { tag: release.tag_name, publishedAt: release.published_at }
}

function collectTargets(value) {
  if (typeof value === 'string') {
    return [value]
  }
  if (value === null) {
    return []
  }
  if (typeof value !== 'object') {
    throw new Error('Invalid package exports condition')
  }
  return Object.values(value).flatMap(collectTargets)
}

const SOURCE_EXTENSIONS = [
  '.ts',
  '.mts',
  '.cts',
  '.tsx',
  '.js',
  '.mjs',
  '.cjs',
  '.jsx',
  // Hand-written declarations shipped straight from "src/".
  '.d.ts',
  '.d.mts',
  '.d.cts',
]

/**
 * Resolve a wildcard export ("./utils/*" -> "./lib/utils/*.js") to a
 * source pattern ("src/utils/*") that TypeScript path mappings expand.
 */
function resolveWildcardSourcePath(subpath, target, stem, sourceDirectory) {
  if (
    subpath.split('*').length !== 2 ||
    target.split('*').length !== 2 ||
    !stem.endsWith('/*')
  ) {
    throw new Error(
      `Cannot map wildcard export ${subpath} (${target}) to release source`,
    )
  }
  const directory = path.resolve(sourceDirectory, stem.slice(0, -2))
  if (!existsSync(directory)) {
    throw new Error(
      `Cannot resolve public export ${subpath} (${target}) to release source`,
    )
  }
  return path.join(directory, '*')
}

function resolveModuleSourcePath(subpath, target, stem, sourceDirectory) {
  const candidates = SOURCE_EXTENSIONS.map((extension) => {
    return path.resolve(sourceDirectory, `${stem}${extension}`)
  })
  const sourcePath = candidates.find(existsSync)
  if (!sourcePath) {
    throw new Error(
      `Cannot resolve public export ${subpath} (${target}) to release source`,
    )
  }
  const source = ts.createSourceFile(
    sourcePath,
    readFileSync(sourcePath, 'utf8'),
    ts.ScriptTarget.Latest,
    true,
  )
  // package.json, the standalone service-worker script, and ambient
  // declarations are public assets, not modules with library APIs.
  if (!ts.isExternalModule(source)) {
    return undefined
  }
  return sourcePath
}

/**
 * Map the package.json "exports" of a release checkout to its source
 * modules, so "msw", "msw/browser", etc. resolve to the release's "src/".
 * Wildcard exports map to a source pattern ("msw/utils/*" -> "src/utils/*").
 */
export function resolvePublicEntryPoints(manifest, sourceDirectory) {
  if (!manifest.exports) {
    throw new Error('The release has no package.json exports map')
  }
  const entries =
    typeof manifest.exports === 'object' &&
    !Array.isArray(manifest.exports) &&
    Object.keys(manifest.exports).some((key) => key.startsWith('.'))
      ? Object.entries(manifest.exports)
      : [['.', manifest.exports]]
  const sources = new Map()
  for (const [subpath, conditions] of entries) {
    for (const target of collectTargets(conditions)) {
      if (!/\.(?:[cm]?js|[cm]?ts|tsx|jsx)$/.test(target)) {
        continue
      }
      if (!target.startsWith('./') || target.split('/').includes('..')) {
        throw new Error(`Invalid package export target: ${target}`)
      }
      // MSW's release build mirrors src/ into lib/. Match both declaration
      // and runtime conditions to their original source, not adjacent files.
      const stem = target
        .replace(/^\.\/lib\//, './src/')
        .replace(/(?:\.d)?\.(?:[cm]?js|[cm]?ts|tsx|jsx)$/, '')
      const isWildcard = subpath.includes('*') || target.includes('*')
      const sourcePath = isWildcard
        ? resolveWildcardSourcePath(subpath, target, stem, sourceDirectory)
        : resolveModuleSourcePath(subpath, target, stem, sourceDirectory)
      if (!sourcePath) {
        continue
      }
      const entry = sources.get(sourcePath) ?? { sourcePath, exports: [] }
      const importPath =
        subpath === '.' ? manifest.name : `${manifest.name}${subpath.slice(1)}`
      if (!entry.exports.includes(importPath)) {
        entry.exports.push(importPath)
      }
      sources.set(sourcePath, entry)
    }
  }
  if (!sources.size) {
    throw new Error('The release exports no documentable source modules')
  }
  return [...sources.values()]
}

function run(command, argumentsList, cwd) {
  return execFileSync(command, argumentsList, {
    cwd,
    stdio: ['ignore', 'pipe', 'inherit'],
    encoding: 'utf8',
    timeout: 600_000,
  }).trim()
}

function readSource(sourceDirectory) {
  const marker = JSON.parse(
    readFileSync(path.join(sourceDirectory, READY_MARKER), 'utf8'),
  )
  return { ...marker, sourceDirectory }
}

/**
 * Check out the source of the given MSW release and install its
 * dependencies so TypeScript can resolve the release's types.
 * The checkout is cached per release tag under ".vitepress/cache".
 *
 * Synchronous because it may also run lazily from inside the (synchronous)
 * Shiki pipeline, the first time a snippet misses the twoslash cache.
 */
export function ensureMswSourceSync(release) {
  const sourceDirectory = path.join(cacheDirectory, release.tag)

  if (existsSync(path.join(sourceDirectory, READY_MARKER))) {
    return readSource(sourceDirectory)
  }

  console.log(`Checking out MSW ${release.tag} source`)
  rmSync(sourceDirectory, { recursive: true, force: true })
  mkdirSync(sourceDirectory, { recursive: true })
  mkdirSync(storeDirectory, { recursive: true })

  run('git', ['init', '--quiet'], sourceDirectory)
  run(
    'git',
    ['remote', 'add', 'origin', `${repositoryUrl}.git`],
    sourceDirectory,
  )
  run(
    'git',
    ['fetch', '--depth=1', 'origin', `refs/tags/${release.tag}`],
    sourceDirectory,
  )
  run('git', ['checkout', '--quiet', '--detach', 'FETCH_HEAD'], sourceDirectory)
  const commit = run('git', ['rev-parse', 'HEAD'], sourceDirectory)
  // Lifecycle scripts are unnecessary for type resolution.
  // The checkout has its own "pnpm-workspace.yaml", so pnpm picks it up
  // (and its install policies) before this site's workspace.
  run(
    'pnpm',
    [
      'install',
      '--frozen-lockfile',
      '--ignore-scripts',
      '--store-dir',
      storeDirectory,
    ],
    sourceDirectory,
  )

  const manifest = JSON.parse(
    readFileSync(path.join(sourceDirectory, 'package.json'), 'utf8'),
  )
  const entryPoints = resolvePublicEntryPoints(manifest, sourceDirectory).map(
    (entry) => ({
      source: path.relative(sourceDirectory, entry.sourcePath),
      exports: entry.exports,
    }),
  )
  const marker = {
    tag: release.tag,
    publishedAt: release.publishedAt,
    commit,
    entryPoints,
  }
  writeFileSync(
    path.join(sourceDirectory, READY_MARKER),
    JSON.stringify(marker, null, 2),
  )

  return { ...marker, sourceDirectory }
}

/**
 * Pull the types of the latest published MSW release: resolve the release,
 * check out its source, and pin it for the development server and builds
 * (see "readPulledMswRelease"). This is the only place that reaches for
 * the network; the site itself only reads what has been pulled.
 *
 * A lazy pull only pins the release. Its source is then checked out the
 * first time a snippet misses the twoslash result cache, so a build whose
 * snippets are all cached never clones MSW at all (meant for CI).
 */
export async function pullMswTypes({ lazy = false } = {}) {
  const release = await resolveLatestRelease()

  if (!lazy) {
    ensureMswSourceSync(release)
  }

  mkdirSync(cacheDirectory, { recursive: true })
  writeFileSync(pulledReleasePath, JSON.stringify(release, null, 2))

  return release
}

/**
 * Read the MSW release pinned by the last "pnpm pull-types", if any.
 */
export function readPulledMswRelease() {
  if (!existsSync(pulledReleasePath)) {
    return undefined
  }

  const { tag, publishedAt } = JSON.parse(
    readFileSync(pulledReleasePath, 'utf8'),
  )

  return { tag, publishedAt }
}
