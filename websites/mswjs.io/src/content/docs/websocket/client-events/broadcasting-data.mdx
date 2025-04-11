---
order: 2
title: Broadcasting data
description: Sending mocked data to multiple WebSocket clients.
keywords:
  - multiple
  - clients
  - blob
  - buffer
---

You can send data to multiple WebSocket clients by calling the `.broadcast()` method on the WebSocket link matching those client connections:

```ts {7} /.broadcast/
import { ws } from 'msw'

const chat = ws.link('wss://chat.example.com')

export const handlers = [
  chat.addEventListener('connection', () => {
    chat.broadcast('Hello, everyone!')
  }),
]
```

> Similar to the `client.send()` method, you can broadcast [various data types](/docs/websocket/client-events/sending-data#examples).

This will send the same data to all intercepted WebSocket clients.

## Examples

### Excluding clients

You can exclude a specific client from the broadcast by using the `broadcastExcept()` method of the WebSocket link and providing it with the `client` instance to exclude:

```ts {10} /.broadcastExcept/
import { ws } from 'msw'

const chat = ws.link('wss://chat.example.com')

export const handlers = [
  chat.addEventListener('connection', (client) => {
    client.addEventListener('message', (event) => {
      // Whenever this client sends a message,
      // broadcast it to all other clients.
      chat.broadcastExcept(client, event.data)
    })
  }),
]
```

You can also provide a _list of clients_ as the first argument to the `broadcastExcept()` method to have a finer control over which clients get excluded from the broadcast:

```ts {3-5} /chat.clients/
chat.addEventListener('connection', () => {
  chat.broadcastExcept(
    chat.clients.filter((client) => {
      return client
    }),
    'Hello to some of you!',
  )
})
```

> The `clients` property of your WebSocket link contains an array of all intercepted clients.
