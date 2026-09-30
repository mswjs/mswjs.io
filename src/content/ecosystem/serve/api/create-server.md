---
order: 1
title: createServer
description: Create a standalone HTTP server from handlers.
---

The `createServer` function creates a standalone HTTP server that resolves all incoming requests against the given handlers. It doesn't require any server framework.

## Call signature

```ts
import { createServer } from '@msw/serve'

createServer(...handlers)
```

```ts
import type { Server } from 'node:http'
import type { AnyHandler } from 'msw'
// ---cut---
declare function createServer(...handlers: Array<AnyHandler>): Server
```

### Arguments

- `...handlers`, `Array<AnyHandler>`, a list of handlers to resolve the incoming requests and WebSocket connections against. Accepts any handler: HTTP, GraphQL, and WebSocket.

### Return value

A Node.js [`http.Server`](https://nodejs.org/api/http.html#class-httpserver) instance. The server doesn't listen on any port until you call `.listen()` on it.

## Usage

```ts /createServer/
import { http, HttpResponse } from 'msw/http'
import { createServer } from '@msw/serve'

const server = createServer(
  http.get('/user', () => {
    return HttpResponse.json({ firstName: 'John' })
  }),
)

server.listen(9090)
```

Making a `GET http://localhost:9090/user` request returns the following response:

```txt
200 OK
Content-Type: application/json

{"firstName":"John"}
```

Since the returned value is a regular `http.Server`, you control its life cycle the same way you would with any other Node.js server:

```ts
import { createServer } from '@msw/serve'

const server = createServer(...handlers)

server.listen(9090, () => {
  console.log('Ready at http://localhost:9090')
})

process.on('SIGTERM', () => {
  server.close()
})
```

## Behaviors

### Relative URLs

Handlers with relative URLs, like `http.get('/user', resolver)`, are resolved against the server's origin. Handlers with absolute URLs only match if their origin is the same as the server's origin.

### Unhandled requests

The server responds with `404 Not Found` to the requests that match no handler, as well as the requests whose handler returns [`passthrough()`](/api/passthrough):

```txt
404 Not Found
Content-Type: application/json

{"error":"Mock not found"}
```

> If you need to handle such requests yourself, use [`createMiddleware`](/ecosystem/serve/api/create-middleware) with the server framework of your choice instead.

### Errors

If a handler throws an exception, the server responds with `500 Internal Server Error` and the error's message as the response body.

### WebSocket

If you provide any [WebSocket handlers](/docs/websocket/), the server upgrades the matching WebSocket connections and routes them through your handlers. Upgrade requests that match no WebSocket handler receive a `404 Not Found` response.

```ts /chat/
import { ws } from 'msw/ws'
import { createServer } from '@msw/serve'

const chat = ws.link('/chat')

const server = createServer(
  chat.addEventListener('connection', ({ client }) => {
    client.addEventListener('message', (event) => {
      client.send(`Hello, ${event.data}!`)
    })
  }),
)

server.listen(9090)
```

Here, Serve _is_ the WebSocket server. There is no original server to connect to, so calling `server.connect()`, `server.send()`, or `server.close()` in the connection listener throws an error.

## Related materials

<PageCard
  icon="WindowIcon"
  url="/ecosystem/serve/getting-started"
  title="Getting started"
  description="Three steps to get started with Serve."
/>
