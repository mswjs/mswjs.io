---
title: HandlersController
---

## Default controllers

The library comes with the following ready-to-use handlers controllers. Please consider using or extending them before implementing your own custom controllers.

### `InMemoryHandlersController`

The most basic controller that keeps all the handlers in-memory.

```ts
import { InMemoryHandlersController } from 'msw/experimental'
```

### `AsyncHandlersController`

A controller that leverages [`AsyncLocalStorage`](https://nodejs.org/api/async_context.html#class-asynclocalstorage) to allow scoping handler changes to its asynchronous boundary.

```ts
import { defineNetwork, AsyncHandlersController } from 'msw/experimental'
import { FetchInterceptor } from '@mswjs/interceptors/fetch'

const controller = new AsyncHandlersController([...initialHandlers])
const network = defineNetwork({
  sources: [new InterceptorSource({ interceptors: [new FetchInterceptor()] })],
  handlers: controller,
})
```

```ts
controller.boundary(async () => {
  // Changes to the controller, such as adding or removing handlers,
  // never leave the boundary in which they were performed.
  controller.use(
    http.get('http://localhost/user', () => {
      return new Response()
    }),
  )

  // A request within the same boundary.
  const response = await fetch('http://localhost/user')
  console.log(response.status) // 200
})()

// A request outside of the boundary.
const response = await fetch('http://localhost/user')
console.log(response.status) // 500
```

## Methods

### `.currentHandlers()`

Returns the list of all current handlers, including the internal sibling handlers (e.g. the WebSocket upgrade handler of a GraphQL subscription).

```js
controller.currentHandlers()
```

### `.listHandlers()`

Returns the list of explicitly registered handlers. Unlike `.currentHandlers()`, this excludes the internal sibling handlers.

```js
controller.listHandlers()
```

### `.getHandlersByKind(kind)`

Returns the list of current handlers of the given `kind` (`"request"` or `"event"`).

```js
const api = graphql.link('https://api.example.com/graphql')

const httpOne = http.get('/one', resolver)
const httpTwo = http.post('/two', resolver)
const graphqlOne = api.query('GetUser', resolver)
const wsOne = ws.link('*').addEventListener('connection', listener)

controller.use([httpOne, httpTwo, graphqlOne, wsOne])

controller.getHandlersByKind('request')
// [httpOne, httpTwo, graphqlOne]
```

> Note that both `http` handlers and GraphQL link handlers are of the `request` kind.

### `.use(handlers)`

Prepends the given handlers to the current handlers so they take priority over the existing ones.

```js
controller.use([
  http.get('/user', () => {
    return HttpResponse.json({ override: true })
  }),
])
```

### `.reset(handlers)`

Resets the current handlers to the initial ones. If the `handlers` argument is provided, replaces the initial handlers with the given ones.

```js
// Reset to the initial handlers.
controller.reset([])

// Replace the initial handlers.
controller.reset([http.get('/user', resolver)])
```

### `.restore()`

Restores the one-time handlers (i.e. those declared with `{ once: true }`) so they can be matched again.

```js
controller.restore()
```

### `.dispose()`

Disposes of all current handlers, letting them release the resources they hold (e.g. close the connections they own). Returns a promise if any of the handlers dispose asynchronously.

```js
await controller.dispose()
```

## `AsyncHandlersController`

### `.boundary(callback)`

Wraps the given `callback` so that any handler changes performed within it never leave its asynchronous boundary. Returns a new function that runs the `callback` within that boundary.

```js
const handleRequest = controller.boundary(async () => {
  controller.use([http.get('/user', resolver)])

  // A request within the same boundary.
  await fetch('/user')
})

await handleRequest()

// A request outside of the boundary.
await fetch('/user')
```
