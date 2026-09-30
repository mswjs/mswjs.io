---
order: 3
title: Fastify
description: Use MSW handlers like a Fastify server middleware.
---

## Install

Fastify is an optional peer dependency of Serve. Make sure you have it installed:

<div class="copyable-code">

::: code-group

```sh [npm]
npm install fastify
```

```sh [pnpm]
pnpm add fastify
```

:::

</div>

> Serve supports Fastify 5 and newer.

## Import

Import the `createMiddleware()` function from `@msw/serve/fastify`:

```ts
import { createMiddleware } from '@msw/serve/fastify'
```

## Apply the hook

Provide your handlers as the arguments to the `createMiddleware()` function and add the returned function as the `onRequest` hook on your Fastify application:

```ts /createMiddleware/
import fastify from 'fastify'
import { createMiddleware } from '@msw/serve/fastify'
import { handlers } from './handlers'

const app = fastify()

app.addHook('onRequest', createMiddleware(...handlers))
await app.listen({ port: 9090 })
```

> Unlike Express and Hono, Fastify has no middleware. The `createMiddleware()` function returns an [`onRequest` hook](https://fastify.dev/docs/latest/Reference/Hooks/#onrequest) instead.

## Features

### Unhandled requests

Requests that match no handler continue to the routes of your application. The same applies to the requests whose handler returns [`passthrough()`](/api/passthrough). This allows you to combine mocks with actual routes:

```ts {8-10}
import fastify from 'fastify'
import { createMiddleware } from '@msw/serve/fastify'
import { handlers } from './handlers'

const app = fastify()

app.addHook('onRequest', createMiddleware(...handlers))
app.get('/health', () => {
  return 'OK'
})
```

### WebSocket

If you provide any [WebSocket handlers](/docs/websocket/), the hook upgrades the matching WebSocket connections and routes them through your handlers. There is nothing else to configure.

```ts /chat/
import fastify from 'fastify'
import { ws } from 'msw/ws'
import { createMiddleware } from '@msw/serve/fastify'

const app = fastify()
const chat = ws.link('/chat')

app.addHook(
  'onRequest',
  createMiddleware(
    chat.addEventListener('connection', ({ client }) => {
      client.addEventListener('message', (event) => {
        client.send(`Hello, ${event.data}!`)
      })
    }),
  ),
)
```

> Upgrade requests that match no WebSocket handler continue to the routes of your application.

## Related materials

<PageCard
  icon="CubeTransparentIcon"
  url="/ecosystem/serve/api/create-middleware"
  title="createMiddleware"
  description="API reference for the `createMiddleware` function."
/>
