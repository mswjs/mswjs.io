---
order: 11
title: WebSocketHandler
description: The class for WebSocket handler implementation.
---

::: warning
  This class is used internally by the [`ws`](/api/ws) namespace. Please
  prefer creating WebSocket handlers via `ws.link()` before extending this
  class to create a custom WebSocket handler.
:::

## Call signature

```js
import { WebSocketHandler } from 'msw/ws'

export class CustomWebSocketHandler extends WebSocketHandler {
  constructor() {
    super(url)
  }
}
```

The `WebSocketHandler` class constructor expects the following arguments:

| Argument name | Type               | Description                                                                                                           |
| ------------- | ------------------ | --------------------------------------------------------------------------------------------------------------------- |
| `url`         | `string \| RegExp` | The WebSocket server URL to match. Supports the same [path syntax](/docs/http/intercepting-requests/) as `http` handlers. |

Unlike [`RequestHandler`](/api/request-handler), a WebSocket handler does not accept a resolver function. Instead, it emits a [`connection`](#connection-event) event for every matching WebSocket connection.

## Properties

### `id`

- `string`.

Unique ID of this handler. Used to scope event propagation (e.g. `event.stopPropagation()`) to the handler that stopped it.

### `kind`

- `"websocket"`.

The kind of the network frame this handler handles. Use it to distinguish WebSocket handlers from request handlers (`"request"`).

### `callFrame`

- `string`.

The top-most frame of this handler's call. Useful for debugging.

## Methods

### `parse(args)`

Matches the intercepted WebSocket connection URL against the handler's `url`.

| Argument name       | Type            | Description                                                        |
| ------------------- | --------------- | ------------------------------------------------------------------ |
| `url`               | `string \| URL` | The URL of the intercepted WebSocket connection.                   |
| `resolutionContext` | `object`        | _Optional_. Resolution context (e.g. `baseUrl` to resolve relative URLs). |

Returns an object with the following properties:

| Property name | Type     | Description                                                                          |
| ------------- | -------- | ------------------------------------------------------------------------------------ |
| `match`       | `object` | The result of matching the connection URL against the handler's `url`, including path `params`. |

> The `/socket.io/` path prefix is removed from the connection URL before matching so you don't have to include the Socket.IO implementation details in your handlers.

### `predicate(args)`

Decides whether the intercepted WebSocket connection should be handled by this handler. The `predicate()` method is expected to return a boolean.

| Argument name  | Type            | Description                                      |
| -------------- | --------------- | ------------------------------------------------ |
| `url`          | `string \| URL` | The URL of the intercepted WebSocket connection. |
| `parsedResult` | `object`        | The object returned from the `parse()` method.   |

### `test(url, resolutionContext)`

A convenience method that runs the `parse()` and `predicate()` methods against the given URL and returns a boolean indicating whether this handler matches it.

```js
const handler = new WebSocketHandler('wss://chat.example.com')

handler.test('wss://chat.example.com') // true
handler.test('wss://api.example.com') // false
```

### `run(connection, resolutionContext)`

Executes this handler against the intercepted WebSocket connection. If the handler matches the connection, resolves the path `params` and emits the [`connection`](#connection-event) event. Returns the resolved connection object, or `null` if the handler doesn't match.

| Argument name       | Type     | Description                                                                 |
| ------------------- | -------- | --------------------------------------------------------------------------- |
| `connection`        | `object` | The intercepted connection object with `client`, `server`, and `info`.      |
| `resolutionContext` | `object` | _Optional_. Resolution context (e.g. `baseUrl` to resolve relative URLs).   |

### `log(connection)`

Attaches the browser console logging to the given WebSocket connection. Returns a function that detaches it.

| Argument name | Type     | Description                       |
| ------------- | -------- | --------------------------------- |
| `connection`  | `object` | The intercepted connection object. |

## Connection event

Whenever the handler matches an intercepted WebSocket connection, it emits the `connection` event. The event object has the following properties:

| Property name | Type                          | Description                                                              |
| ------------- | ----------------------------- | ------------------------------------------------------------------------ |
| `client`      | `WebSocketClientConnection`   | The intercepted [client connection](/api/ws#websocketclientconnection).  |
| `server`      | `WebSocketServerConnection`   | The actual [server connection](/api/ws#websocketserverconnection).       |
| `info`        | `object`                      | The [connection information](/api/ws#websocketconnectioninfo), like `protocols`. |
| `params`      | `object`                      | Path parameters parsed from the connection URL.                          |

> Use `ws.link(url).addEventListener('connection', listener)` to listen to this event. That method creates a `WebSocketHandler` for you and attaches the listener to it.

## Connection phases

Whenever MSW intercepts a WebSocket connection, it will pass it to the WebSocket handler. The handler will then process the connection in phases listed in the following order:

### Phase 1: Parsing

First, the intercepted connection URL will be parsed using the `parse()` method of the handler. The parsing phase is designed to extract additional information from the connection URL that is otherwise unavailable in the connection object.

Let's create a custom `SearchParamsWebSocketHandler` that will only handle connections whose search parameters will match the expected object.

::: code-group

```js [SearchParamsWebSocketHandler.js] {9-20}
import { WebSocketHandler } from 'msw/ws'

export class SearchParamsWebSocketHandler extends WebSocketHandler {
  constructor(url, expectedParams) {
    super(url)
    this.expectedParams = expectedParams
  }

  parse({ url, resolutionContext }) {
    // Match the connection URL against the handler's URL as usual.
    const parsedResult = super.parse({ url, resolutionContext })

    // Extract search parameters from the intercepted connection URL.
    const searchParams = new URL(url).searchParams

    // Expose the search parameters for the other handler's methods.
    return {
      ...parsedResult,
      searchParams,
    }
  }
}
```

:::

### Phase 2: Predicate

The next phase determines if the intercepted connection should be handled by this handler. The connection URL and the parsing result returned from the `parse()` method are passed to the `predicate()` method of the handler. The predicate method must return a boolean indicating whether this handler is meant to handle the intercepted connection.

For example, let's iterate on the custom `SearchParamsWebSocketHandler` to only match the intercepted connections whose search parameters match the provided `expectedParams` object.

::: code-group

```js [SearchParamsWebSocketHandler.js] {19-37}
import { WebSocketHandler } from 'msw/ws'

export class SearchParamsWebSocketHandler extends WebSocketHandler {
  constructor(url, expectedParams) {
    super(url)
    this.expectedParams = expectedParams
  }

  parse({ url, resolutionContext }) {
    const parsedResult = super.parse({ url, resolutionContext })
    const searchParams = new URL(url).searchParams

    return {
      ...parsedResult,
      searchParams,
    }
  }

  predicate({ url, parsedResult }) {
    // Match the connection URL as usual.
    if (!super.predicate({ url, parsedResult })) {
      return false
    }

    const { searchParams } = parsedResult

    // Iterate over the expected search parameters and
    // make sure that the actual connection matches them.
    for (const [expectedParamName, expectedParamValue] of Object.entries(
      this.expectedParams,
    )) {
      if (searchParams.get(expectedParamName) !== expectedParamValue) {
        return false
      }
    }

    return true
  }
}
```

:::

### Phase 3: Resolution

If the handler returned `true` in the predicate phase, the resolution phase begins. The resolution is implemented in the `run()` method of the handler, which does the following:

1. Runs the `parse()` and `predicate()` methods described above (returns `null` if the handler doesn't match);
1. Resolves the path `params` from the connection URL;
1. Emits the [`connection`](#connection-event) event with the `client`, `server`, `info`, and `params` of the intercepted connection;
1. Returns the resolved connection object.

Whatever happens to the connection next is up to the `connection` event listeners. MSW then calls the `log()` method of the handler.

You can customize the resolution by overriding the `run()` method in your custom handler. Make sure to call `super.run()` to reuse the default resolution logic. For example, let's iterate on the custom `SearchParamsWebSocketHandler` to act on the resolved connection directly.

::: code-group

```js [SearchParamsWebSocketHandler.js] {18-32}
import { WebSocketHandler } from 'msw/ws'

export class SearchParamsWebSocketHandler extends WebSocketHandler {
  constructor(url, expectedParams) {
    super(url)
    this.expectedParams = expectedParams
  }

  parse({ url, resolutionContext }) {
    /* Search params parsing here */
  }

  predicate({ url, parsedResult }) {
    /* Search params predicate here */
  }

  async run(connection, resolutionContext) {
    // Resolve the connection as usual. This returns "null"
    // if the handler doesn't match the connection.
    const resolvedConnection = await super.run(connection, resolutionContext)

    if (resolvedConnection) {
      // The custom handler can act on the matching connection
      // directly, e.g. send a message to the client.
      resolvedConnection.client.send('hello')
    }

    return resolvedConnection
  }
}
```

:::

::: code-group

```js [handlers.js]
import { SearchParamsWebSocketHandler } from './SearchParamsWebSocketHandler'

export const handlers = [
  // Only handle connections to "wss://chat.example.com?room=general".
  new SearchParamsWebSocketHandler('wss://chat.example.com', {
    room: 'general',
  }),
]
```

:::
