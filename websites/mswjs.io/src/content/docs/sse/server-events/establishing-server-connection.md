---
order: 6
title: Establishing server connection
keywords:
  - sse
  - connect
  - server
  - bypass
  - patch
---

Similar to the [WebSocket API](/docs/websocket/server-events/establishing-server-connection), you can establish an actual connection to the server by calling `server.connect()`:

```ts {2} /server/
sse('/stream', ({ server }) => {
  const source = server.connect()
})
```

The result of calling `server.connect()` is an [`EventSource`](https://developer.mozilla.org/en-US/docs/Web/API/EventSource) instance that you can use to listen and handle the events received from the actual production server.

## Event forwarding

By default, all server events are forwarded to the client. That means that calling `server.connect()` turns your request handler into a _transparent proxy_. You can use that to inspect the incoming server traffic and react to it, e.g. by emitting WebSocket events.

```ts {11-17}
import { sse, ws } from 'msw'

const chat = ws.link('https://api.example.com/chat')

export const handlers = [
  chat.addEventListener('connection', () => {}),

  sse('/stream', ({ server }) => {
    const source = server.connect()

    source.addEventListener('message', (event) => {
      // If the actual server sends a certain event,
      // broadcast mock data on the WebSocket connection.
      if (event.data === 'hello') {
        chat.broadcast('Hello from the server!')
      }
    })
  }),
]
```

You can opt-out from the default server-to-client event forwarding by calling `event.preventDefault()` on the received server event. For example, here's how you can prevent a server event with a particular payload and send another, mocked payload to the client instead:

```ts {5-8} /client/#g
sse('/stream', ({ server, client }) => {
  const source = server.connect()

  source.addEventListener('message', (event) => {
    if (event.data === 'hello') {
      event.preventDefault()
      client.send({ data: 'Hello from the mock!' })
    }
  })
})
```

> Preventing the default prevents the event forwarding for all events: `open`, `message`, and `error`.
