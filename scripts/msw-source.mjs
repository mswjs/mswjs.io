import { execFileSync } from 'node:child_process'
import { existsSync, readFileSync } from 'node:fs'
import { mkdir, readFile, readdir, rm, stat, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import ts from 'typescript'

export const repositoryUrl = 'https://github.com/mswjs/msw'

const siteDirectory = fileURLToPath(new URL('../', import.meta.url))
const cacheDirectory = path.join(siteDirectory, '.vitepress/cache/msw-source')
const storeDirectory = path.join(cacheDirectory, 'store')
const READY_MARKER = '.msw-source.json'

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

/**
 * Map the package.json "exports" of a release checkout to its source
 * modules, so "msw", "msw/browser", etc. resolve to the release's "src/".
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
      if (subpath.includes('*') || target.includes('*')) {
        throw new Error(`Cannot map wildcard export ${subpath} to release source`)
      }
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
      const candidates = [
        '.ts',
        '.mts',
        '.cts',
        '.tsx',
        '.js',
        '.mjs',
        '.cjs',
        '.jsx',
      ].map((extension) => path.resolve(sourceDirectory, `${stem}${extension}`))
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
      // package.json and the standalone service-worker script are public
      // assets, not modules with library APIs.
      if (!ts.isExternalModule(source)) {
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

async function readSource(sourceDirectory) {
  const marker = JSON.parse(
    await readFile(path.join(sourceDirectory, READY_MARKER), 'utf8'),
  )
  return { ...marker, sourceDirectory }
}

/**
 * Check out the source of the given MSW release and install its
 * dependencies so TypeScript can resolve the release's types.
 * The checkout is cached per release tag under ".vitepress/cache".
 */
export async function ensureMswSource(release) {
  const sourceDirectory = path.join(cacheDirectory, release.tag)

  if (existsSync(path.join(sourceDirectory, READY_MARKER))) {
    return readSource(sourceDirectory)
  }

  console.log(`Checking out MSW ${release.tag} source`)
  await rm(sourceDirectory, { recursive: true, force: true })
  await mkdir(sourceDirectory, { recursive: true })
  await mkdir(storeDirectory, { recursive: true })

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
  // The checkout lives inside this pnpm workspace, so workspace mode is off.
  run(
    'pnpm',
    [
      'install',
      '--frozen-lockfile',
      '--ignore-scripts',
      '--ignore-workspace',
      '--store-dir',
      storeDirectory,
    ],
    sourceDirectory,
  )

  const manifest = JSON.parse(
    await readFile(path.join(sourceDirectory, 'package.json'), 'utf8'),
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
  await writeFile(
    path.join(sourceDirectory, READY_MARKER),
    JSON.stringify(marker, null, 2),
  )

  return { ...marker, sourceDirectory }
}

/**
 * Resolve the latest published MSW release and check out its source.
 */
export async function ensureLatestMswSource() {
  const release = await resolveLatestRelease()
  return ensureMswSource(release)
}

/**
 * Find the most recently checked out MSW source, if any.
 */
export async function findCachedMswSource() {
  if (!existsSync(cacheDirectory)) {
    return undefined
  }

  const candidates = []

  for (const entry of await readdir(cacheDirectory)) {
    const markerPath = path.join(cacheDirectory, entry, READY_MARKER)

    if (existsSync(markerPath)) {
      const { mtimeMs } = await stat(markerPath)
      candidates.push({ entry, mtimeMs })
    }
  }

  candidates.sort((left, right) => {
    return right.mtimeMs - left.mtimeMs
  })

  const newest = candidates[0]

  if (!newest) {
    return undefined
  }

  return readSource(path.join(cacheDirectory, newest.entry))
}

/**
 * Resolve the MSW source used to type the documentation's code snippets.
 *
 * Builds always resolve the latest published release. The development
 * server prefers an existing checkout to avoid network access on every
 * start, and resolves the latest release only when nothing is cached yet.
 */
export async function resolveMswSourceForSite({ preferCache = false } = {}) {
  if (preferCache) {
    const cached = await findCachedMswSource()

    if (cached) {
      console.log(
        `Typing code snippets with the cached MSW ${cached.tag} source`,
      )
      return cached
    }
  }

  return ensureLatestMswSource()
}
