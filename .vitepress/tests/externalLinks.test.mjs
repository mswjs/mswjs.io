import assert from 'node:assert/strict'
import { mkdtemp, readFile, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { afterEach, test } from 'node:test'
import ts from 'typescript'
import { createMarkdownRenderer, disposeMdItInstance } from 'vitepress'

const source = await readFile(new URL('../externalLinks.ts', import.meta.url), 'utf8')
const { outputText } = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
})
const { createExternalLinkChecker } = await import(
  `data:text/javascript;base64,${Buffer.from(outputText).toString('base64')}`
)

afterEach(() => {
  disposeMdItInstance()
})

/** Run the client build hooks in order: validation starts at "buildEnd", the build waits for it at "closeBundle". */
async function finishClientBuild(checker) {
  checker.plugin.buildEnd()
  await checker.plugin.closeBundle()
}

await test('checks unique Markdown and component links with HEAD only', async () => {
  const requests = []
  const checker = createExternalLinkChecker({
    request: async (url, options) => {
      requests.push({ url, method: options.method, redirect: options.redirect })
      return new Response(null, { status: 200 })
    },
  })
  const markdown = await createMarkdownRenderer(process.cwd(), { config: checker.markdown })
  markdown.render(`
[Example](https://example.com/page#first)
[Duplicate](https://example.com/page#second)
[Local](/docs/)
[Reference][reference]

[reference]: https://example.com/reference

<PageCard url="https://example.com/card" />

\`\`\`js
const example = '<a href="https://example.com/code">'
\`\`\`
`, { relativePath: 'docs/example.md' })
  await finishClientBuild(checker)
  await finishClientBuild(checker)

  assert.deepEqual(requests, [
    { url: 'https://example.com/page', method: 'HEAD', redirect: 'follow' },
    { url: 'https://example.com/reference', method: 'HEAD', redirect: 'follow' },
    { url: 'https://example.com/card', method: 'HEAD', redirect: 'follow' },
  ])
})

await test('skips validation in the SSR build so failures are reported once', async () => {
  const requests = []
  const checker = createExternalLinkChecker({
    request: async (url) => {
      requests.push(url)
      return new Response(null, { status: 404 })
    },
  })
  const markdown = await createMarkdownRenderer(process.cwd(), { config: checker.markdown })
  markdown.render('[Missing](https://example.com/missing)', { relativePath: 'blog/post.md' })

  checker.plugin.configResolved({ build: { ssr: true } })
  await finishClientBuild(checker)
  assert.deepEqual(requests, [])

  checker.plugin.configResolved({ build: { ssr: false } })
  await assert.rejects(finishClientBuild(checker), /HTTP 404/)
  assert.deepEqual(requests, ['https://example.com/missing'])
})

await test('fails the build with the URL, status and Markdown source', async () => {
  const checker = createExternalLinkChecker({
    request: async () => new Response(null, { status: 404 }),
  })
  const markdown = await createMarkdownRenderer(process.cwd(), { config: checker.markdown })
  markdown.render('[Missing](https://example.com/missing)', { relativePath: 'blog/post.md' })

  const error = await finishClientBuild(checker).catch((error) => error)
  assert.match(error.message, /https:\/\/example.com\/missing — HTTP 404\n  in blog\/post.md/)
  // Vite rewrites "stack" from "message" and VitePress prints both.
  error.stack = `${error.message}\n    at rewritten`
  assert.equal(error.stack, '')
})

await test('requires exactly 200 even for other successful statuses', async () => {
  const checker = createExternalLinkChecker({
    request: async () => new Response(null, { status: 204 }),
  })
  const markdown = await createMarkdownRenderer(process.cwd(), { config: checker.markdown })
  markdown.render('[Empty](https://example.com/empty)', { relativePath: 'docs/empty.md' })

  await assert.rejects(finishClientBuild(checker), /HTTP 204/)
})

await test('fails the build when a HEAD request cannot complete', async () => {
  const checker = createExternalLinkChecker({
    request: async () => {
      throw new Error('Connection timed out')
    },
  })
  const markdown = await createMarkdownRenderer(process.cwd(), { config: checker.markdown })
  markdown.render('[Slow](https://example.com/slow)', { relativePath: 'docs/slow.md' })

  await assert.rejects(finishClientBuild(checker), /Connection timed out\n  in docs\/slow.md/)
})

await test('leaves ignored URLs unvalidated regardless of hash or source', async () => {
  const requests = []
  const checker = createExternalLinkChecker({
    request: async (url) => {
      requests.push(url)
      return new Response(null, { status: 404 })
    },
    ignore: ['https://example.com/broken#section'],
  })
  const markdown = await createMarkdownRenderer(process.cwd(), { config: checker.markdown })
  markdown.render(`
[Broken](https://example.com/broken)
[Broken again](https://example.com/broken#other)
[Checked](https://example.com/checked)
`, { relativePath: 'blog/post.md' })

  await assert.rejects(finishClientBuild(checker), /https:\/\/example.com\/checked — HTTP 404/)
  assert.deepEqual(requests, ['https://example.com/checked'])
})

await test('skips URLs that passed within the cache max age and re-checks failed ones', async (context) => {
  const directory = await mkdtemp(path.join(tmpdir(), 'msw-external-links-'))
  context.after(async () => {
    await rm(directory, { recursive: true, force: true })
  })
  const cache = { path: path.join(directory, 'links.json'), maxAgeMs: 1_000 }
  let clock = 10_000
  const requests = []
  const request = async (url) => {
    requests.push(url)
    return new Response(null, { status: url.endsWith('/broken') ? 404 : 200 })
  }
  const content = `
[Fine](https://example.com/fine)
[Broken](https://example.com/broken)
`

  const first = createExternalLinkChecker({ request, cache, now: () => clock })
  const firstMarkdown = await createMarkdownRenderer(process.cwd(), { config: first.markdown })
  firstMarkdown.render(content, { relativePath: 'docs/page.md' })
  await assert.rejects(finishClientBuild(first), /broken — HTTP 404/)
  assert.deepEqual(requests, ['https://example.com/fine', 'https://example.com/broken'])
  assert.deepEqual(JSON.parse(await readFile(cache.path, 'utf8')), {
    'https://example.com/fine': 10_000,
  })
  disposeMdItInstance()

  // Within the max age, only the failed URL is checked again.
  requests.length = 0
  clock = 10_500
  const second = createExternalLinkChecker({ request, cache, now: () => clock })
  const secondMarkdown = await createMarkdownRenderer(process.cwd(), { config: second.markdown })
  secondMarkdown.render(content, { relativePath: 'docs/page.md' })
  await assert.rejects(finishClientBuild(second), /broken — HTTP 404/)
  assert.deepEqual(requests, ['https://example.com/broken'])
  disposeMdItInstance()

  // Past the max age, the passing URL is checked again.
  requests.length = 0
  clock = 12_000
  const third = createExternalLinkChecker({ request, cache, now: () => clock })
  const thirdMarkdown = await createMarkdownRenderer(process.cwd(), { config: third.markdown })
  thirdMarkdown.render(content, { relativePath: 'docs/page.md' })
  await assert.rejects(finishClientBuild(third), /broken — HTTP 404/)
  assert.deepEqual(requests, ['https://example.com/fine', 'https://example.com/broken'])
})
