---
order: 1
title: Express
description: Use MSW handlers like an Express server middleware.
---

## Install

Express is an optional peer dependency of Serve. Make sure you have it installed:

<div class="copyable-code">

::: code-group

```sh [npm]
npm install express
```

```sh [pnpm]
pnpm add express
```

:::

</div>

> Serve supports Express 5 and newer.

## Import

Import the `createMiddleware()` function from `@msw/serve/express`:

```ts
import { createMiddleware } from '@msw/serve/express'
```

## Apply the middleware

Provide your handlers as the arguments to the `createMiddleware()` function and apply the returned middleware to your Express application:

```ts /createMiddleware/
import express from 'express'
import { createMiddleware } from '@msw/serve/express'
import { handlers } from './handlers'

const app = express()

app.use(createMiddleware(...handlers))
app.listen(9090)
```

## Features

### Unhandled requests

Requests that match no handler are passed to the rest of your application. The same applies to the requests whose handler returns [`passthrough()`](/api/passthrough). This allows you to combine mocks with actual routes, or respond to everything that hasn't been mocked:

```ts {8-10}
import express from 'express'
import { createMiddleware } from '@msw/serve/express'
import { handlers } from './handlers'

const app = express()

app.use(createMiddleware(...handlers))
app.use((req, res) => {
  res.status(404).send({ error: 'Mock not found' })
})
```

### Body parsers

You can use the middleware alongside body parsers, like `express.json()`. The body parsed by a preceding parser is forwarded to your handlers as the request body.

```ts {7}
import express from 'express'
import { createMiddleware } from '@msw/serve/express'
import { handlers } from './handlers'

const app = express()

app.use(express.json())
app.use(createMiddleware(...handlers))
```

### Errors

Exceptions thrown in your handlers are forwarded to the Express [error handling](https://expressjs.com/en/guide/error-handling.html) via `next(error)`.

### WebSocket

If you provide any [WebSocket handlers](/docs/websocket/), the middleware upgrades the matching WebSocket connections and routes them through your handlers. There is nothing else to configure.

```ts /chat/
import express from 'express'
import { ws } from 'msw/ws'
import { createMiddleware } from '@msw/serve/express'

const app = express()
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
```

> Upgrade requests that match no WebSocket handler are passed to the rest of your application.

## Related materials

<PageCard
  icon="CubeTransparentIcon"
  url="/ecosystem/serve/api/create-middleware"
  title="createMiddleware"
  description="API reference for the `createMiddleware` function."
/>
