import assert from 'node:assert/strict'
import { test } from 'node:test'
import {
  createSourceUrl,
  findPopupContainer,
  getSourceDefinition,
  toOriginalIndex,
  enhanceHoverPopups,
  normalizeHoverTags,
} from '../twoslash.ts'

test('maps output indices back through removed ranges', () => {
  // "AAA[cut]BBB" with "[cut]" removed: B moves from 8 to 3.
  assert.equal(toOriginalIndex(3, [[3, 8]]), 8)
  assert.equal(toOriginalIndex(2, [[3, 8]]), 2)
  // Multiple removals accumulate, regardless of their order.
  assert.equal(
    toOriginalIndex(
      6,
      [
        [10, 12],
        [0, 4],
      ],
    ),
    12,
  )
  assert.equal(toOriginalIndex(5, []), 5)
})

test('builds GitHub links pinned to the release tag', () => {
  assert.equal(
    createSourceUrl({ tag: 'v2.15.0' }, { path: 'src/core/ws.ts', line: 35 }),
    'https://github.com/mswjs/msw/blob/v2.15.0/src/core/ws.ts#L35',
  )
})

test('reads only well-formed source definitions from hover nodes', () => {
  const hover = {
    type: 'hover',
    text: 'const chat: WebSocketLink',
    start: 0,
    length: 4,
    line: 0,
    character: 0,
    target: 'chat',
  }
  assert.equal(getSourceDefinition(hover), undefined)
  assert.equal(
    getSourceDefinition({ ...hover, source: { path: 'src/core/ws.ts' } }),
    undefined,
  )
  assert.deepEqual(
    getSourceDefinition({
      ...hover,
      source: { path: 'src/core/ws.ts', line: 35 },
    }),
    { path: 'src/core/ws.ts', line: 35 },
  )
})

test('finds the popup nested in a template content root', () => {
  const popup = {
    type: 'element',
    tagName: 'span',
    properties: { class: ['twoslash-popup-container', 'vp-copy-ignore'] },
    children: [],
  }
  const token = {
    type: 'element',
    tagName: 'v-menu',
    properties: {},
    children: [
      {
        type: 'element',
        tagName: 'template',
        properties: {},
        content: { type: 'root', children: [popup] },
        children: [],
      },
    ],
  }
  assert.equal(findPopupContainer(token), popup)
  assert.equal(
    findPopupContainer({ type: 'text', value: 'chat' }),
    undefined,
  )
})

test('renders "@example" tags as code and "{@link}" tags as links', () => {
  const hover = {
    type: 'hover',
    text: 'const ws',
    start: 0,
    length: 2,
    line: 0,
    character: 0,
    target: 'ws',
    tags: [
      ['example', "const chat = ws.link('wss://chat.example.com')"],
      ['example', '```js\nfenced()\n```'],
      ['see', '{@link https://mswjs.io/docs/api/ws `ws` API reference}'],
      ['deprecated', undefined],
    ],
  }
  normalizeHoverTags(hover)
  assert.deepEqual(hover.tags, [
    ['example', "```ts\nconst chat = ws.link('wss://chat.example.com')\n```"],
    ['example', '```js\nfenced()\n```'],
    ['see', '[`ws` API reference](https://mswjs.io/docs/api/ws)'],
    ['deprecated', undefined],
  ])
})

test('appends a source link to hovers defined in the MSW source', () => {
  const popup = {
    type: 'element',
    tagName: 'span',
    properties: { class: 'twoslash-popup-container' },
    children: [],
  }
  const link = {
    type: 'element',
    tagName: 'a',
    properties: { href: 'https://developer.mozilla.org/' },
    children: [{ type: 'text', value: 'MDN Reference' }],
  }
  const renderer = enhanceHoverPopups(
    {
      nodeStaticInfo(_info, node) {
        return {
          type: 'element',
          tagName: 'span',
          properties: {},
          children: [popup, link, node],
        }
      },
    },
    { tag: 'v2.15.0' },
  )
  const context = {
    source: 'const chat = 1',
    options: { lang: 'ts', decorations: [{ start: 0, end: 1 }] },
  }
  const token = { type: 'text', value: 'chat' }
  const hover = {
    type: 'hover',
    text: 'const chat: WebSocketLink',
    start: 0,
    length: 4,
    line: 0,
    character: 0,
    target: 'chat',
  }

  const plain = renderer.nodeStaticInfo.call(context, hover, token)
  assert.equal(popup.children.length, 0)
  assert.equal(plain.properties['data-source'], undefined)
  assert.match(plain.properties['show-group'], /^[0-9a-f]{8}-0$/)
  assert.equal(link.properties.target, '_blank')

  const linked = renderer.nodeStaticInfo.call(
    context,
    { ...hover, source: { path: 'src/core/ws.ts', line: 35 } },
    token,
  )
  const sourceUrl = 'https://github.com/mswjs/msw/blob/v2.15.0/src/core/ws.ts#L35'
  assert.equal(linked.properties['data-source'], sourceUrl)
  assert.equal(popup.children.length, 1)
  const [sourceLink] = popup.children[0].children
  assert.equal(sourceLink.properties.href, sourceUrl)
  assert.deepEqual(sourceLink.children, [
    { type: 'text', value: 'src/core/ws.ts:35' },
  ])
})

test('drops hovers that would only reveal "any"', async () => {
  const { isUnresolvedHover } = await import('../twoslash.ts')
  const hover = (text) => ({ type: 'hover', text, start: 0, length: 1, line: 0, character: 0, target: 'x' })
  assert.equal(isUnresolvedHover(hover('import z')), true)
  assert.equal(isUnresolvedHover(hover('(parameter) client: any')), true)
  assert.equal(isUnresolvedHover(hover('const result: any')), true)
  assert.equal(isUnresolvedHover(hover('type Arg1 = /*unresolved*/ any')), true)
  assert.equal(isUnresolvedHover(hover('const chat: WebSocketLink')), false)
  assert.equal(isUnresolvedHover(hover('(alias) const ws: WebSocketNamespace\nimport ws')), false)
})

test('regenerates line numbers from the rendered line count', async () => {
  const { twoslashLineNumbersPlugin } = await import('../twoslash.ts')
  const popup = '<code class="twoslash-popup-code"><pre><code><span class="line">a</span>\n<span class="line">b</span></code></pre></code>'
  const rendered = `<div class="language-ts line-numbers-mode"><pre class="shiki" data-line-count="3"><code><span class="line">${popup}x</span>\n<span class="line">y</span>\n<span class="line">z</span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div>`
  const md = { renderer: { rules: { fence: () => rendered } } }
  twoslashLineNumbersPlugin(md)
  const html = md.renderer.rules.fence([{ info: 'ts:line-numbers=5' }], 0)
  assert.equal(html.includes('data-line-count'), false)
  assert.deepEqual(
    [...html.matchAll(/class="line-number">(\d+)</g)].map((match) => match[1]),
    ['5', '6', '7'],
  )
  assert.equal(
    md.renderer.rules.fence([{ info: 'ts' }], 0).includes('line-number">1<'),
    true,
  )
})
