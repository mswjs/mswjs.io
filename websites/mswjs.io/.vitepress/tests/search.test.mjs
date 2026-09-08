import assert from 'node:assert/strict'
import { readFile, readdir } from 'node:fs/promises'
import { createRequire } from 'node:module'
import { test } from 'node:test'
import ts from 'typescript'
import { pathToFileURL } from 'node:url'
import { createMarkdownRenderer, disposeMdItInstance } from 'vitepress'

const require = createRequire(import.meta.url)
const requireFromVitePress = createRequire(require.resolve('vitepress'))
const MiniSearch = requireFromVitePress('minisearch')
const source = await readFile(new URL('../search.ts', import.meta.url), 'utf8')
const { outputText } = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
})
const { prioritizeSearchResults, rankLocalSearchResults } = await import(
  `data:text/javascript;base64,${Buffer.from(outputText).toString('base64')}`
)

await test('prioritizes docs matches before guides and API in local search', () => {
  const search = new MiniSearch({
    fields: ['title', 'text'],
    storeFields: ['title'],
    searchOptions: {
      boost: { title: 4, text: 2 },
    },
  })
  search.addAll([
    { id: '/api/graphql#usage', title: 'GraphQL', text: 'GraphQL API' },
    { id: '/guides/graphql', title: 'GraphQL guide', text: 'GraphQL setup' },
    { id: '/docs/graphql/queries', title: 'Queries', text: 'Intercept GraphQL queries' },
    { id: '/docs/graphql/mutations', title: 'Mutations', text: 'Intercept GraphQL mutations' },
  ])

  assert.deepEqual(rankLocalSearchResults(search.search('graphql'), 'graphql').map((result) => result.id.split('/')[1]), [
    'docs',
    'docs',
    'guides',
    'api',
  ])
})

await test('groups remote results by section while preserving relevance within each', () => {
  const items = [
    { url: 'https://mswjs.io/api/graphql' },
    { url: 'https://mswjs.io/docs/graphql#queries' },
    { url: '/blog/graphql' },
    { url: '/guides/graphql' },
    { url: '/docs/graphql/mutations' },
  ]

  assert.deepEqual(prioritizeSearchResults(items), [
    items[1], items[4], items[3], items[0], items[2],
  ])
  assert.equal(items[0].url, 'https://mswjs.io/api/graphql')
})

await test('lists GraphQL overview pages before their headings and omits Next Steps', async () => {
  const requireFromShared = createRequire(new URL('../../../shared/package.json', import.meta.url))
  const splitterSource = await readFile(new URL('../../../shared/searchSections.ts', import.meta.url), 'utf8')
  const splitter = ts.transpileModule(splitterSource, {
    compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
  }).outputText.replace("'gray-matter'", JSON.stringify(pathToFileURL(requireFromShared.resolve('gray-matter')).href))
  const { splitSearchSections } = await import(`data:text/javascript;base64,${Buffer.from(splitter).toString('base64')}`)
  const markdown = await createMarkdownRenderer(process.cwd())
  const root = new URL('../../src/content/', import.meta.url)
  const search = new MiniSearch({
    fields: ['title', 'titles', 'text'],
    storeFields: ['title', 'titles'],
    searchOptions: { prefix: true, fuzzy: 0.2, boost: { title: 4, text: 2, titles: 1 } },
  })
  for (const file of (await readdir(root, { recursive: true })).filter((file) => file.endsWith('.md'))) {
    const url = new URL(file, root)
    const html = markdown.render(await readFile(url, 'utf8'))
    const sections = await splitSearchSections(url, html)
    const pathname = '/' + file.replace(/(^|\/)index\.md$/, '$1').replace(/\.md$/, '')
    for (const section of sections) {
      search.add({ id: `${pathname}#${section.anchor}`, title: section.titles.at(-1), titles: section.titles.slice(0, -1), text: section.text })
    }
  }
  const results = rankLocalSearchResults(search.search('graphql'), 'graphql')
  assert.deepEqual(results.slice(0, 4).map((result) => result.title), [
    'Mocking GraphQL',
    'Intercepting operations',
    'Mocking responses',
    'Schema-first mocking',
  ])
  assert.equal(results[4].id.startsWith('/docs/graphql/#'), true)
  assert.equal(results.some((result) => /^next steps?$/i.test(result.title)), false)
  disposeMdItInstance()
})
