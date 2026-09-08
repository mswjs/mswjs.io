import { execFileSync } from 'node:child_process'
import {
  mkdir,
  mkdtemp,
  readFile,
  writeFile,
  readdir,
  rm,
  rename,
  realpath,
} from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { Application } from 'typedoc'
import { MarkdownPageEvent } from 'typedoc-plugin-markdown'
import {
  resolvePublicEntryPoints,
  excludeSymbolMembers,
} from './api-exports.mjs'
import {
  repositoryUrl,
  resolveLatestRelease,
  nameModules,
  organizeSidebar,
} from './api-reference.mjs'

const siteDirectory = fileURLToPath(new URL('../', import.meta.url))
const outputDirectory = path.join(siteDirectory, 'src/content/api/reference')
const cacheDirectory = path.join(siteDirectory, '.vitepress/cache/api-source')
const release = await resolveLatestRelease()
console.log(`Generating MSW API reference from ${release.tag}`)

await mkdir(cacheDirectory, { recursive: true })
const sourceDirectory = await realpath(
  await mkdtemp(path.join(tmpdir(), 'msw-api-')),
)
const stagingDirectory = `${outputDirectory}.pending`

function run(command, argumentsList) {
  return execFileSync(command, argumentsList, {
    cwd: sourceDirectory,
    stdio: ['ignore', 'pipe', 'inherit'],
    encoding: 'utf8',
    timeout: 600_000,
  }).trim()
}

try {
  run('git', ['init', '--quiet'])
  run('git', ['remote', 'add', 'origin', `${repositoryUrl}.git`])
  run('git', ['fetch', '--depth=1', 'origin', `refs/tags/${release.tag}`])
  run('git', ['checkout', '--quiet', '--detach', 'FETCH_HEAD'])
  const commit = run('git', ['rev-parse', 'HEAD'])
  // Lifecycle scripts are unnecessary for documentation generation.
  run('pnpm', [
    'install',
    '--frozen-lockfile',
    '--ignore-scripts',
    '--store-dir',
    cacheDirectory,
  ])

  const manifest = JSON.parse(
    await readFile(path.join(sourceDirectory, 'package.json'), 'utf8'),
  )
  const publicEntries = resolvePublicEntryPoints(manifest, sourceDirectory)
  const entryPoints = publicEntries.map((entry) => entry.sourcePath)
  console.log(
    `Public modules: ${publicEntries.flatMap((entry) => entry.exports).join(', ')}`,
  )
  const configurationPath = path.join(sourceDirectory, 'tsconfig.docs.json')
  await writeFile(
    configurationPath,
    JSON.stringify({
      extends: './tsconfig.base.json',
      compilerOptions: {
        lib: ['ESNext', 'DOM', 'DOM.Iterable', 'WebWorker'],
        types: ['node'],
      },
      files: [
        './global.d.ts',
        './src/browser/global.browser.d.ts',
        ...entryPoints,
      ],
      include: [],
    }),
  )

  await rm(stagingDirectory, { recursive: true, force: true })
  const application = await Application.bootstrapWithPlugins({
    plugin: [
      'typedoc-plugin-markdown',
      'typedoc-vitepress-theme',
      fileURLToPath(new URL('./api-markdown-theme.mjs', import.meta.url)),
    ],
    theme: 'msw-api',
    entryPoints,
    entryPointStrategy: 'resolve',
    tsconfig: configurationPath,
    name: 'MSW',
    readme: 'none',
    out: stagingDirectory,
    docsRoot: path.join(siteDirectory, 'src/content'),
    gitRevision: commit,
    basePath: sourceDirectory,
    displayBasePath: sourceDirectory,
    disableGit: true,
    sourceLinkTemplate: `${repositoryUrl}/blob/${commit}/{path}#L{line}`,
    excludePrivate: true,
    excludeInternal: true,
    // The release is already validated upstream; combining browser and Node
    // entrypoints here is for documentation, not another library type check.
    skipErrorChecking: true,
    categorizeByGroup: false,
    navigation: {
      includeCategories: true,
      includeGroups: false,
      includeFolders: false,
    },
    hidePageHeader: true,
    hidePageTitle: true,
    hideBreadcrumbs: true,
    useCodeBlocks: true,
  })
  const deprecatedLinks = new Set()
  application.renderer.on(MarkdownPageEvent.END, (page) => {
    if (page.isReflectionEvent() && page.model.isDeprecated()) {
      deprecatedLinks.add(`/api/reference/${page.url.replace(/\.md$/, '')}`)
    }
    page.contents = `---\ntitle: ${JSON.stringify(page.model.name)}\neditLink: false\nlastUpdated: false\n---\n\n${page.contents}`
  })
  excludeSymbolMembers(application)
  const project = await application.convert()
  if (!project) {
    throw new Error('TypeDoc failed to convert the MSW release source')
  }
  nameModules(
    project,
    new Map(
      publicEntries.map((entry) => {
        const modulePath = path
          .relative(sourceDirectory, entry.sourcePath)
          .replace(/(?:\/index)?\.[cm]?[jt]sx?$/, '')
        return [modulePath, entry.exports[0]]
      }),
    ),
  )
  for (const reflection of Object.values(project.reflections)) {
    // Inherited DOM and dependency declarations are not files in MSW's repo.
    if (reflection.sources) {
      reflection.sources = reflection.sources.filter((source) => {
        return source.fileName.startsWith('src/')
      })
    }
  }
  await application.generateOutputs(project)
  if (application.logger.hasErrors()) {
    throw new Error('TypeDoc failed to generate the API reference')
  }
  const sidebarPath = path.join(stagingDirectory, 'typedoc-sidebar.json')
  const sidebar = organizeSidebar(
    JSON.parse(await readFile(sidebarPath, 'utf8')),
    JSON.parse(
      await readFile(new URL('./api-order.json', import.meta.url), 'utf8'),
    ),
    deprecatedLinks,
  )
  // The staging location must never leak into published links.
  await writeFile(
    sidebarPath,
    JSON.stringify(sidebar).replaceAll('/reference.pending/', '/reference/'),
  )
  await writeFile(
    path.join(stagingDirectory, 'release.json'),
    JSON.stringify(
      {
        ...release,
        commit,
        entryPoints: publicEntries.map((entry) => ({
          source: path.relative(sourceDirectory, entry.sourcePath),
          exports: entry.exports,
        })),
      },
      null,
      2,
    ),
  )
  if ((await readdir(stagingDirectory)).length < 3) {
    throw new Error('TypeDoc generated no API pages')
  }
  await rm(outputDirectory, { recursive: true, force: true })
  await rename(stagingDirectory, outputDirectory)
  console.log(`Generated API reference: ${release.tag} (${commit})`)
} finally {
  await rm(sourceDirectory, { recursive: true, force: true })
  await rm(stagingDirectory, { recursive: true, force: true })
}
