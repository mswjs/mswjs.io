import assert from 'node:assert/strict'
import { test } from 'node:test'
import { consumeHmrScroll } from '../theme/hmrScroll.mjs'

function savedPosition(position) {
  const values = new Map([['msw:hmr-scroll', JSON.stringify(position)]])
  return {
    getItem(key) {
      return values.get(key) ?? null
    },
    removeItem(key) {
      values.delete(key)
    },
  }
}

await test('restores the current page position once after an HMR reload', () => {
  const storage = savedPosition({
    url: 'http://localhost/docs/page#section',
    x: 0,
    y: 1600,
    savedAt: 100,
  })
  assert.equal(
    consumeHmrScroll(storage, 'http://localhost/docs/page#section', 200).y,
    1600,
  )
  assert.equal(
    consumeHmrScroll(storage, 'http://localhost/docs/page#section', 300),
    undefined,
  )
})

await test('does not carry an HMR position into another page', () => {
  const storage = savedPosition({
    url: 'http://localhost/docs/first',
    x: 0,
    y: 1600,
    savedAt: 100,
  })
  assert.equal(
    consumeHmrScroll(storage, 'http://localhost/docs/second', 200),
    undefined,
  )
})

await test('does not restore an expired HMR position', () => {
  const storage = savedPosition({
    url: 'http://localhost/docs/page',
    x: 0,
    y: 1600,
    savedAt: 100,
  })
  assert.equal(
    consumeHmrScroll(storage, 'http://localhost/docs/page', 30100),
    undefined,
  )
})
