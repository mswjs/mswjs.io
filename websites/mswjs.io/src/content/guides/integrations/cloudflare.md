---
order: 3
title: Cloudflare
description: Develop and test Cloudflare applications with Mock Service Worker.
keywords:
  - cloudflare
  - workers
  - workerd
  - vitest
---

Use the official `@msw/cloudflare` package to intercept outgoing requests in
Cloudflare Workers and other applications running in `workerd`.

## Install

```sh
npm install --save-dev msw @msw/cloudflare
```

## Setup

Create a network instance and control it in your test lifecycle.

```ts [worker.test.ts]
import { afterAll, afterEach, beforeAll } from 'vitest'
import { setupNetwork } from '@msw/cloudflare'

const network = setupNetwork()

beforeAll(() => {
  network.enable()
})

afterEach(() => {
  network.resetHandlers()
})

afterAll(() => {
  network.disable()
})
```

Use `network.use()` to add request handlers for an individual test.

```ts
import { http, HttpResponse } from 'msw'

network.use(
  http.get('https://api.example.com/user', () => {
    return HttpResponse.json({ id: 1, name: 'John Maverick' })
  }),
)
```

See the [`@msw/cloudflare` repository](https://github.com/mswjs/cloudflare) for
complete Worker testing examples.
