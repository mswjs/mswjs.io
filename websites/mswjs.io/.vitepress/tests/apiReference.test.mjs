import assert from 'node:assert/strict'
import { test } from 'node:test'
import {
  resolveLatestRelease,
  nameModules,
  organizeSidebar,
} from '../../scripts/api-reference.mjs'

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

await test('names platform sections while preserving explicit module names', () => {
  const project = {
    children: [
      { name: 'core' },
      { name: 'browser' },
      { name: 'node' },
      { name: 'core/experimental' },
      { name: 'Custom module' },
    ],
  }
  nameModules(project)
  assert.deepEqual(
    project.children.map((module) => module.name),
    ['API', 'Browser', 'Node.js', 'Experimental', 'Custom module'],
  )
})

await test('orders non-clickable API sections and preserves category navigation', () => {
  const sidebar = organizeSidebar([
    {
      text: 'Node.js',
      link: '/node',
      items: [
        {
          text: 'Lifecycle',
          items: [{ text: 'setupServer', link: '/node/setupServer' }],
        },
      ],
    },
    {
      text: 'API',
      link: '/core',
      items: [{ text: 'http', link: '/core/http' }],
    },
    { text: 'Experimental', link: '/experimental' },
    { text: 'Browser', link: '/browser' },
  ])
  assert.deepEqual(
    sidebar.map((section) => section.text),
    ['API', 'Browser', 'Node.js', 'Experimental'],
  )
  assert.equal(sidebar[0].link, undefined)
  assert.equal(sidebar[2].items[0].items[0].link, '/node/setupServer')
})

await test('uses clean published URLs for nested reference pages', () => {
  const sidebar = organizeSidebar([
    {
      text: 'API',
      items: [
        {
          text: 'HTTP',
          items: [
            {
              text: 'http',
              link: '/api/reference.pending/API/variables/http.md',
            },
          ],
        },
      ],
    },
  ])
  assert.equal(
    sidebar[0].items[0].items[0].link,
    '/api/reference/API/variables/http',
  )
})

await test('names modules relative to the release repository root', () => {
  const project = {
    children: [
      { name: 'src/core' },
      { name: 'src/browser' },
      { name: 'src/node' },
      { name: 'src/core/experimental' },
    ],
  }
  nameModules(project)
  assert.deepEqual(
    project.children.map((module) => module.name),
    ['API', 'Browser', 'Node.js', 'Experimental'],
  )
})

await test('renders module and category tags into reference navigation', async (context) => {
  const { mkdtemp, writeFile, readFile, rm } = await import('node:fs/promises')
  const { tmpdir } = await import('node:os')
  const path = await import('node:path')
  const { Application } = await import('typedoc')
  const directory = await mkdtemp(path.join(tmpdir(), 'msw-reference-test-'))
  context.after(async () => {
    await rm(directory, { recursive: true, force: true })
  })
  const entrypoint = path.join(directory, 'index.ts')
  await writeFile(
    entrypoint,
    `/** @module Browser */
/**
 * Starts browser mocking.
 * @category Lifecycle
 * @param strategy How unhandled requests are reported.
 * @returns Resolves when mocking is ready.
 * @default false
 * @see https://mswjs.io/api/start
 * @deprecated Use \`setupWorker()\` instead.
 * This API will be removed in the next major release.
 */
export async function start(strategy: string = 'warn'): Promise<void> {}
`,
  )
  const configuration = path.join(directory, 'tsconfig.json')
  await writeFile(configuration, JSON.stringify({ files: [entrypoint] }))
  const output = path.join(directory, 'reference')
  const application = await Application.bootstrapWithPlugins({
    plugin: [
      import.meta.resolve('typedoc-plugin-markdown'),
      import.meta.resolve('typedoc-vitepress-theme'),
      new URL('../../scripts/api-markdown-theme.mjs', import.meta.url).href,
    ],
    theme: 'msw-api',
    useCodeBlocks: true,
    entryPoints: [entrypoint],
    alwaysCreateEntryPointModule: true,
    tsconfig: configuration,
    skipErrorChecking: true,
    readme: 'none',
    out: output,
    docsRoot: directory,
    categorizeByGroup: false,
    navigation: { includeCategories: true, includeGroups: false },
  })
  const project = await application.convert()
  assert.ok(project)
  nameModules(project)
  await application.generateOutputs(project)
  const sidebar = organizeSidebar(
    JSON.parse(
      await readFile(path.join(output, 'typedoc-sidebar.json'), 'utf8'),
    ),
  )
  assert.equal(sidebar[0].text, 'Browser')
  assert.equal(sidebar[0].items[0].text, 'Lifecycle')
  assert.equal(sidebar[0].items[0].items[0].text, 'start')
  const markdown = await readFile(
    path.join(output, 'Browser/functions/start.md'),
    'utf8',
  )
  assert.match(markdown, /Starts browser mocking/)
  assert.doesNotMatch(markdown, /https:\/\/mswjs.io\/api\/start/)
  assert.doesNotMatch(markdown, /^#+ See|\*\*See\*\*/m)
  assert.ok(
    markdown.includes(
      '::: danger Deprecated\nThis API is deprecated and must not be used.\n\nUse `setupWorker()` instead.\nThis API will be removed in the next major release.\n:::',
    ),
  )
  const { createMarkdownRenderer } = await import('vitepress')
  const renderer = await createMarkdownRenderer(directory)
  const html = renderer.render(markdown)
  assert.match(html, /class="danger custom-block"/)
  assert.doesNotMatch(html, /::: (?:error|danger)/)
  assert.doesNotMatch(markdown, /^#+ Deprecated|\*\*Deprecated\*\*/m)
  assert.match(markdown, /## Call signature\n\n- Parameters:/)
  assert.match(
    markdown,
    /- Returns: `Promise<void>`, Resolves when mocking is ready\./,
  )
  assert.match(markdown, /How unhandled requests are reported\./)
  assert.match(html, /<li>Returns: <code>Promise&lt;void&gt;<\/code>/)
  assert.match(
    markdown,
    /  - `strategy` \(`string`, <em>optional<\/em>\)\. Default: `'warn'`/,
  )
  assert.doesNotMatch(markdown, /`strategy\?`/)
  assert.match(
    html,
    /<code>strategy<\/code> \(<code>string<\/code>, <em>optional<\/em>\)/,
  )
  assert.doesNotMatch(markdown, /^#+ (?:Parameters|Returns)$/m)
  assert.match(markdown, /Default\n\n` false `/)
  assert.doesNotMatch(markdown, /```(?:ts)?\nfalse\n```/)
  assert.match(markdown, /Source:/)
  assert.doesNotMatch(markdown, /Defined in:/)
  for (const reflection of Object.values(project.reflections)) {
    if (reflection.sources) {
      reflection.sources = []
    }
  }
  await application.generateOutputs(project)
  const markdownWithoutSources = await readFile(
    path.join(output, 'Browser/functions/start.md'),
    'utf8',
  )
  assert.doesNotMatch(markdownWithoutSources, /Source:|Defined in:/)
  assert.match(markdownWithoutSources, /Starts browser mocking/)
})

await test('prioritizes configured APIs while retaining the remaining order', () => {
  const sidebar = organizeSidebar(
    [
      {
        text: 'API',
        items: [
          { text: 'HttpMethods' },
          { text: 'HttpResponse' },
          { text: 'http' },
          { text: 'delay' },
        ],
      },
    ],
    { API: ['http', 'HttpResponse'] },
  )
  assert.deepEqual(
    sidebar[0].items.map((item) => item.text),
    ['http', 'HttpResponse', 'HttpMethods', 'delay'],
  )
})

await test('orders APIs within categories independently', () => {
  const sidebar = organizeSidebar(
    [
      {
        text: 'Browser',
        items: [
          { text: 'Lifecycle', items: [{ text: 'stop' }, { text: 'start' }] },
        ],
      },
    ],
    { 'Browser/Lifecycle': ['start', 'stop'] },
  )
  assert.equal(sidebar[0].items[0].items[0].text, 'start')
})

await test('marks deprecated links without changing their labels or destinations', () => {
  const sidebar = organizeSidebar(
    [
      {
        text: 'API',
        items: [
          {
            text: 'oldApi',
            link: '/api/reference.pending/API/functions/oldApi.md',
          },
          {
            text: 'http',
            link: '/api/reference.pending/API/variables/http.md',
          },
        ],
      },
    ],
    {},
    new Set(['/api/reference/API/functions/oldApi']),
  )
  assert.equal(sidebar[0].items[0].deprecated, true)
  assert.equal(sidebar[0].items[0].text, 'oldApi')
  assert.equal(sidebar[0].items[0].link, '/api/reference/API/functions/oldApi')
  assert.equal(sidebar[0].items[1].deprecated, undefined)
})

await test('labels additional entrypoints by their public import paths', () => {
  const project = {
    children: [{ name: 'src/core/http' }, { name: 'Custom module' }],
  }
  nameModules(project, new Map([['src/core/http', 'msw/core/http']]))
  assert.deepEqual(
    project.children.map((module) => module.name),
    ['msw/core/http', 'Custom module'],
  )
})
