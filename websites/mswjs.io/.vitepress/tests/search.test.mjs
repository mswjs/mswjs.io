import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { createRequire } from 'node:module'
import { test } from 'node:test'
import ts from 'typescript'

const require = createRequire(import.meta.url)
const requireFromVitePress = createRequire(require.resolve('vitepress'))
const MiniSearch = requireFromVitePress('minisearch')
const source = await readFile(new URL('../search.ts', import.meta.url), 'utf8')
const { outputText } = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
})
const { boostSearchDocument, prioritizeSearchResults } = await import(
  `data:text/javascript;base64,${Buffer.from(outputText).toString('base64')}`
)

await test('prioritizes docs matches before guides and API in local search', () => {
  const search = new MiniSearch({
    fields: ['title', 'text'],
    searchOptions: {
      boost: { title: 4, text: 2 },
      boostDocument: boostSearchDocument,
    },
  })
  search.addAll([
    { id: '/api/graphql#usage', title: 'GraphQL', text: 'GraphQL API' },
    { id: '/guides/graphql', title: 'GraphQL guide', text: 'GraphQL setup' },
    { id: '/docs/graphql/queries', title: 'Queries', text: 'Intercept GraphQL queries' },
    { id: '/docs/graphql/mutations', title: 'Mutations', text: 'Intercept GraphQL mutations' },
  ])

  assert.deepEqual(search.search('graphql').map((result) => result.id), [
    '/docs/graphql/queries',
    '/docs/graphql/mutations',
    '/guides/graphql',
    '/api/graphql#usage',
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
