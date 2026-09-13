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
  chat.addEventListener('connection', ({ client }) => {
    client.addEventListener('message', (event) => {
      // Whenever this client sends a message,
      // broadcast it to all other clients.
      chat.broadcastExcept(client, event.data)
    })
  }),
]
```

You can also provide a _list of clients_ as the first argument to the `broadcastExcept()` method to have finer control over which clients get excluded from the broadcast:

```ts {9-11} /chat.clients/
import { ws } from 'msw'

const chat = ws.link('wss://chat.example.com')

export const handlers = [
  chat.addEventListener('connection', ({ client }) => {
    client.addEventListener('message', (event) => {
      // Exclude the clients that connected to a different room.
      const otherRooms = Array.from(chat.clients).filter((otherClient) => {
        return otherClient.url.searchParams.get('room') !== 'general'
      })

      chat.broadcastExcept(otherRooms, event.data)
    })
  }),
]
```

> The `clients` property of your WebSocket link is a `Set` of all intercepted clients. Each client exposes the `url` it connected to.
