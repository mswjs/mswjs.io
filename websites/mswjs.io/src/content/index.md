---
layout: page
title: Mock Service Worker - API mocking library for browser and Node.js
displayTitle: Mock Service Worker - API mocking library for browser and Node.js
titleTemplate: false
description: API mocking library for browser and Node.js
keywords:
  - mock
  - api
  - msw
  - service
  - worker
---

<script setup>
import HomePage from '../../.vitepress/theme/home/HomePage.vue'
</script>

<HomePage>

<template v-slot:hero-code>

```ts:no-line-numbers
import { http, HttpResponse } from 'msw/http'
import { setupWorker } from 'msw/browser'

// Describe the network once.
const handlers = [
  http.get('https://acme.com/product/:id', ({ params }) => {
    return HttpResponse.json({
      id: params.id,
      title: 'Porcelain Mug',
      price: 9.99,
    })
  }),
]

// Integrate API mocking anywhere.
const worker = setupWorker(...handlers)
await worker.start()
```

</template>

<template v-slot:feature-standards>

```ts notwoslash
http.post('/user/:id', async ({ request, params }) => {
  const user = await request.clone().json()
  const headers = request.headers
  headers.set('x-mocked', 'true')

  return Response.json(
    { ...user, id: params.id },
    { headers },
  )
})
```

</template>

<template v-slot:feature-agnostic>

```ts notwoslash
export const handlers = [
  http.get('/user', () => {
    return HttpResponse.json({ id: 1 })
  }),
]

// One mock that works everywhere.
fetch('/user')
axios.get('/user')
useSWR('/user')
```

</template>

<template v-slot:feature-protocols>

```ts notwoslash
const github = graphql.link('https://api.github.com/graphql')
const binance = ws.link('wss://stream.binance.com/ws')

export const handlers = [
  http.get('https://api.stripe.com/v1/balance', resolver),
  github.query('GetRepository', resolver),
  sse('https://api.openai.com/v1/responses', resolver),
  binance.addEventListener('connection', resolver),
]
```

</template>

<template v-slot:scene-testing>

```js notwoslash
// vitest.setup.js
import { setupServer } from 'msw/node'
import { handlers } from './src/mocks/handlers'

const server = setupServer(...handlers)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())
```

</template>

<template v-slot:scene-e2e>

```js notwoslash
// test/fixtures.js
import { test as base } from '@playwright/test'
import { createNetworkFixture } from '@msw/playwright'
import { handlers } from '../src/mocks/handlers'

export const test = base.extend({
  network: createNetworkFixture({ initialHandlers: handlers }),
})
```

</template>

<template v-slot:scene-development>

```js notwoslash
// src/main.js
if (import.meta.env.DEV) {
  const { setupWorker } = await import('msw/browser')
  const { handlers } = await import('./mocks/handlers')
  
  const worker = setupWorker(...handlers)
  await worker.start()
}

render(<App />, root)
```

</template>

<template v-slot:scene-debugging>

```js notwoslash
// src/components/checkout.jsx
worker.use(
  // Stripe rate limits on staging, does my
  // component handle that properly in the UI?
  http.get('https://api.stripe.com/v1/balance', () => {
    return HttpResponse.json(
      { error: 'rate_limit' },
      { status: 429 },
    )
  }),
)
```

</template>

<template v-slot:scene-storybook>

```js notwoslash
// .storybook/preview.js
import { initialize, mswLoader } from 'msw-storybook-addon'
import { handlers } from '../src/mocks/handlers'

initialize()

export default {
  loaders: [mswLoader],
  parameters: { msw: { handlers } },
}
```

</template>

</HomePage>
