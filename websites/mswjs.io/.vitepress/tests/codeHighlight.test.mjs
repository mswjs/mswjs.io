import assert from 'node:assert/strict'
import { readFile, readdir } from 'node:fs/promises'
import { test } from 'node:test'
import ts from 'typescript'
import { createMarkdownRenderer } from 'vitepress'

const source = await readFile(
  new URL('../../../shared/codeHighlight.ts', import.meta.url),
  'utf8',
)
const { outputText } = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
})
const { wordHighlightMetaPlugin, wordHighlightTransformer } = await import(
  `data:text/javascript;base64,${Buffer.from(outputText).toString('base64')}`
)

await test('preserves line ranges alongside filenames and word occurrences', async () => {
  const markdown = await createMarkdownRenderer(process.cwd(), {
    codeTransformers: [wordHighlightTransformer()],
    config: wordHighlightMetaPlugin,
  })
  const html = markdown.render(`\`\`\`js [mocks/handlers.js] {2,9} /withAuth/1,3
import { http } from 'msw'
import { withAuth } from './middleware'

export const handlers = [
  // withAuth wraps the resolver.
  // Requires authorization.
  // Returns a response.
  // Handles comments.
  http.post('/comment', withAuth(() => {}))
]
\`\`\``)
  const lines = Array.from(html.matchAll(/<span class="line(?: highlighted)?"/g))
  assert.deepEqual(
    lines.flatMap((match, index) => {
      return match[0].includes('highlighted') ? [index + 1] : []
    }),
    [2, 9],
  )
  assert.equal((html.match(/class="highlighted-word"/g) ?? []).length, 2)
})

await test('highlights the declared lines in every published code block', async (context) => {
  const markdown = await createMarkdownRenderer(process.cwd(), {
    codeTransformers: [wordHighlightTransformer()],
    config: wordHighlightMetaPlugin,
  })
  const roots = [
    new URL('../../src/content/', import.meta.url),
    new URL('../../../source.mswjs.io/src/content/', import.meta.url),
  ]
  const mismatches = []
  let blockCount = 0
  let highlightedBlockCount = 0

  for (const root of roots) {
    const files = await readdir(root, { recursive: true })

    for (const file of files.filter((file) => file.endsWith('.md'))) {
      const content = await readFile(new URL(file, root), 'utf8')
      const fences = markdown.parse(content, {}).filter((token) => token.type === 'fence')

      for (const fence of fences) {
        blockCount += 1
        const metadata = content.split('\n')[fence.map[0]].trim().replace(/^(`{3,}|~{3,})/, '')
        const lineRange = metadata.match(/\{([\d, -]+)\}/)?.[1]
        const expectedLines = new Set()

        if (lineRange) {
          highlightedBlockCount += 1
          for (const range of lineRange.split(',')) {
            const [start, end = start] = range.trim().split('-').map(Number)
            for (let line = start; line <= end; line += 1) {
              expectedLines.add(line)
            }
          }
        }

        const html = markdown.renderer.render([fence], markdown.options, {})
        const lines = Array.from(html.matchAll(/<span class="line(?: highlighted)?"/g))
        const actualLines = lines.flatMap((match, index) => {
          return match[0].includes('highlighted') ? [index + 1] : []
        })
        const expected = Array.from(expectedLines).sort((left, right) => left - right)

        if (JSON.stringify(actualLines) !== JSON.stringify(expected)) {
          mismatches.push({ file, line: fence.map[0] + 1, metadata, expected, actualLines })
        }
      }
    }
  }

  context.diagnostic(`Checked ${blockCount} code blocks, including ${highlightedBlockCount} with line highlights`)
  assert.deepEqual(mismatches, [])
})
