---
order: 2
title: Hono
description: Use MSW handlers like a Hono server middleware.
---

## Install

Hono is an optional peer dependency of Serve. Make sure you have it installed:

<div class="copyable-code">

::: code-group

```sh [npm]
npm install hono
```

```sh [pnpm]
pnpm add hono
```

:::

</div>

> Serve supports Hono 4 and newer.

## Import

Import the `createMiddleware()` function from `@msw/serve/hono`:

```ts
import { createMiddleware } from '@msw/serve/hono'
```

## Apply the middleware

Provide your handlers as the arguments to the `createMiddleware()` function and apply the returned middleware to your Hono application:

```ts /createMiddleware/
import { Hono } from 'hono'
import { createMiddleware } from '@msw/serve/hono'
import { handlers } from './handlers'

const app = new Hono()

app.use(createMiddleware(...handlers))

export default app
```

## Features

### Unhandled requests

Requests that match no handler are passed to the rest of your application. The same applies to the requests whose handler returns [`passthrough()`](/api/passthrough). This allows you to combine mocks with actual routes:

```ts {8-10}
import { Hono } from 'hono'
import { createMiddleware } from '@msw/serve/hono'
import { handlers } from './handlers'

const app = new Hono()

app.use(createMiddleware(...handlers))
app.get('/health', (context) => {
  return context.text('OK')
})
```

### WebSocket

If you provide any [WebSocket handlers](/docs/websocket/), the middleware upgrades the matching WebSocket connections and routes them through your handlers.

**WebSocket support requires running your application on Node.js** via [`@hono/node-server`](https://github.com/honojs/node-server). On other runtimes, the WebSocket handlers are ignored.

```ts /chat/ {2,19}
import { Hono } from 'hono'
import { serve } from '@hono/node-server'
import { ws } from 'msw/ws'
import { createMiddleware } from '@msw/serve/hono'

const app = new Hono()
const chat = ws.link('/chat')

app.use(
  createMiddleware(
    chat.addEventListener('connection', ({ client }) => {
      client.addEventListener('message', (event) => {
        client.send(`Hello, ${event.data}!`)
      })
    }),
  ),
)

serve({ fetch: app.fetch, port: 9090 })
```

> Upgrade requests that match no WebSocket handler are passed to the rest of your application.

## Related materials

<PageCard
  icon="CubeTransparentIcon"
  url="/ecosystem/serve/api/create-middleware"
  title="createMiddleware"
  description="API reference for the `createMiddleware` function."
/>
