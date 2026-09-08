import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { afterEach, test } from 'node:test'
import ts from 'typescript'
import { createMarkdownRenderer, disposeMdItInstance } from 'vitepress'

const source = await readFile(new URL('../../../shared/externalLinks.ts', import.meta.url), 'utf8')
const { outputText } = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
})
const { createExternalLinkChecker } = await import(
  `data:text/javascript;base64,${Buffer.from(outputText).toString('base64')}`
)

afterEach(() => {
  disposeMdItInstance()
})

await test('checks unique Markdown and component links with HEAD only', async () => {
  const requests = []
  const checker = createExternalLinkChecker(async (url, options) => {
    requests.push({ url, method: options.method, redirect: options.redirect })
    return new Response(null, { status: 200 })
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
  await checker.plugin.buildEnd()
  await checker.plugin.buildEnd()

  assert.deepEqual(requests, [
    { url: 'https://example.com/page', method: 'HEAD', redirect: 'follow' },
    { url: 'https://example.com/reference', method: 'HEAD', redirect: 'follow' },
    { url: 'https://example.com/card', method: 'HEAD', redirect: 'follow' },
  ])
})

await test('fails the build with the URL, status and Markdown source', async () => {
  const checker = createExternalLinkChecker(async () => new Response(null, { status: 404 }))
  const markdown = await createMarkdownRenderer(process.cwd(), { config: checker.markdown })
  markdown.render('[Missing](https://example.com/missing)', { relativePath: 'blog/post.md' })

  await assert.rejects(checker.plugin.buildEnd(), /https:\/\/example.com\/missing — HTTP 404\n  in blog\/post.md/)
})

await test('requires exactly 200 even for other successful statuses', async () => {
  const checker = createExternalLinkChecker(async () => new Response(null, { status: 204 }))
  const markdown = await createMarkdownRenderer(process.cwd(), { config: checker.markdown })
  markdown.render('[Empty](https://example.com/empty)', { relativePath: 'docs/empty.md' })

  await assert.rejects(checker.plugin.buildEnd(), /HTTP 204/)
})

await test('fails the build when a HEAD request cannot complete', async () => {
  const checker = createExternalLinkChecker(async () => {
    throw new Error('Connection timed out')
  })
  const markdown = await createMarkdownRenderer(process.cwd(), { config: checker.markdown })
  markdown.render('[Slow](https://example.com/slow)', { relativePath: 'docs/slow.md' })

  await assert.rejects(checker.plugin.buildEnd(), /Connection timed out\n  in docs\/slow.md/)
})
