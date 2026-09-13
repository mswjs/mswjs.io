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
import { http, HttpResponse } from 'msw'
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

// One mock for every request client.
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



</HomePage>
