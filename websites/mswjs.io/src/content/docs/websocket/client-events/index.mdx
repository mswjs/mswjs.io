---
order: 2
title: Client events
description: Intercepting and handling WebSocket client events
keywords:
  - websocket
  - client
  - event
  - message
---

You can intercept the following WebSocket client events:

| Event name                      | Description                                                    |
| ------------------------------- | -------------------------------------------------------------- |
| [`message`](#the-message-event) | Dispatched when the client is sending a message to the server. |
| [`close`](#the-close-event)     | Dispatched when the client has closed the connection.          |

> The [`open`](#the-open-event) event is represented by the `connection` event listener and doesn't have a designated listener.

You can listen to these events by adding a respective event listener to the `client` object anywhere in your event handler:

```ts {2} /client/
api.addEventListener('connection', ({ client }) => {
  client.addEventListener('close', () => {})
})
```

## Intercepting client events

### The `open` event

There is no `open` event on the `client` object. Instead, you should handle a client opening the connection in the `connection` event listener:

```ts /'connection'/
api.addEventListener('connection', ({ client }) => {
  console.log('Client opening connection', client)
})
```

The `connection` event is dispatched on the WebSocket link whenever a client opens a new connection in your app. The listener is called _before_ the actual client dispatches the `open` event so you can forcefully [close the connection](/docs/websocket/client-events/closing-client-connection) without opening it.

If you don't establish the actual server connection in the `connection` listener, MSW will treat this connection as mocked and your handler will act as a server. If you choose to establish the actual server connection, the `open` and other client events will be dispatched based on that connection's state.

### The `message` event

You can intercept the data sent from your client by adding a `message` listener on the `client` object:

```ts /'message'/
api.addEventListener('connection', ({ client }) => {
  client.addEventListener('message', (event) => {
    console.log('Intercepted message from the client', event)
  })
})
```

> The `event` argument of the `message` listener is a [`MessageEvent`](https://developer.mozilla.org/en-US/docs/Web/API/MessageEvent) instance. You can read the data sent from the client via the `event.data` property.

Your mocks are always written from _the server's perspective_, which means the `message` event will be dispatched when your client _sends_ some data:

```ts {5}
// app.js
const ws = new WebSocket(url)

ws.onopen = () => {
  ws.send('hello world')
  // "Client sent data: hello world"
}
```

### The `close` event

You can intercept the `close` event dispatched when your client closes the connection by adding a `close` event listener on the `client` object:

```ts /'close'/
api.addEventListener('connection', ({ client }) => {
  client.addEventListener('close', (event) => {
    console.log('Client is closing the connection', client)
  })
})
```

> The `event` argument of the `close` listener is a [`CloseEvent`](https://developer.mozilla.org/en-US/docs/Web/API/CloseEvent) instance. It contains additional information about the closure, like the `event.code` and `event.reason`.
