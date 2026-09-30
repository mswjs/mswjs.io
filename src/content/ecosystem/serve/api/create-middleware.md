---
order: 2
title: createMiddleware
description: Create a server framework middleware from handlers.
---

The `createMiddleware` function creates a framework-specific middleware that resolves incoming requests against the given handlers. Requests that match no handler are passed to the rest of your application.

## Call signature

Each supported server framework has its own `createMiddleware` function, available under a dedicated import path:

| Framework                                         | Import path          |
| ------------------------------------------------- | -------------------- |
| [Express](/ecosystem/serve/integrations/express)  | `@msw/serve/express` |
| [Hono](/ecosystem/serve/integrations/hono)        | `@msw/serve/hono`    |
| [Fastify](/ecosystem/serve/integrations/fastify)  | `@msw/serve/fastify` |

```ts
import { createMiddleware } from '@msw/serve/express'

createMiddleware(...handlers)
```

```ts
import type { AnyHandler } from 'msw'
import type { RequestHandler } from 'express'
// ---cut---
declare function createMiddleware(
  ...handlers: Array<AnyHandler>
): RequestHandler
```

### Arguments

- `...handlers`, `Array<AnyHandler>`, a list of handlers to resolve the incoming requests and WebSocket connections against. Accepts any handler: HTTP, GraphQL, and WebSocket.

### Return value

The return value depends on the import path:

| Import path          | Return value                                                                                                  |
| -------------------- | ------------------------------------------------------------------------------------------------------------- |
| `@msw/serve/express` | Express middleware ([`RequestHandler`](https://expressjs.com/en/guide/writing-middleware.html)).             |
| `@msw/serve/hono`    | Hono middleware ([`MiddlewareHandler`](https://hono.dev/docs/guides/middleware)).                            |
| `@msw/serve/fastify` | Fastify `onRequest` hook ([`onRequestAsyncHookHandler`](https://fastify.dev/docs/latest/Reference/Hooks/#onrequest)). |

## Usage

### Express

```ts /createMiddleware/
import express from 'express'
import { http, HttpResponse } from 'msw/http'
import { createMiddleware } from '@msw/serve/express'

const app = express()

app.use(
  createMiddleware(
    http.get('/user', () => {
      return HttpResponse.json({ firstName: 'John' })
    }),
  ),
)
```

### Hono

```ts /createMiddleware/
import { Hono } from 'hono'
import { http, HttpResponse } from 'msw/http'
import { createMiddleware } from '@msw/serve/hono'

const app = new Hono()

app.use(
  createMiddleware(
    http.get('/user', () => {
      return HttpResponse.json({ firstName: 'John' })
    }),
  ),
)
```

### Fastify

```ts /createMiddleware/
import fastify from 'fastify'
import { http, HttpResponse } from 'msw/http'
import { createMiddleware } from '@msw/serve/fastify'

const app = fastify()

app.addHook(
  'onRequest',
  createMiddleware(
    http.get('/user', () => {
      return HttpResponse.json({ firstName: 'John' })
    }),
  ),
)
```

In all three cases, making a `GET /user` request to the application returns the following response:

```txt
200 OK
Content-Type: application/json

{"firstName":"John"}
```

## Behaviors

### Relative URLs

Handlers with relative URLs, like `http.get('/user', resolver)`, are resolved against the origin of the incoming request. Handlers with absolute URLs only match if their origin is the same as the request's origin.

### Unhandled requests

The middleware doesn't respond to the requests that match no handler, or whose handler returns [`passthrough()`](/api/passthrough). Those are passed to the rest of your application (the next middleware or the matching route).

### WebSocket

If you provide any [WebSocket handlers](/docs/websocket/), the middleware upgrades the matching WebSocket connections and routes them through your handlers. Upgrade requests that match no WebSocket handler are passed to the rest of your application.

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

- The middleware _is_ the WebSocket server. There is no original server to connect to, so calling `server.connect()`, `server.send()`, or `server.close()` in the connection listener throws an error.
- In Hono, WebSocket support requires running your application on Node.js via [`@hono/node-server`](https://github.com/honojs/node-server).

## Related materials

<PageCard
  icon="ServerIcon"
  url="/ecosystem/serve/integrations/express"
  title="Express"
  description="Apply handlers as an Express middleware."
/>

<PageCard
  icon="ServerIcon"
  url="/ecosystem/serve/integrations/hono"
  title="Hono"
  description="Apply handlers as a Hono middleware."
/>

<PageCard
  icon="ServerIcon"
  url="/ecosystem/serve/integrations/fastify"
  title="Fastify"
  description="Apply handlers as a Fastify hook."
/>
