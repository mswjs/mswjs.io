---
title: HandlersController
---

`HandlersController` is an abstract class for implementing custom handlers controllers.

## Default controllers

The library comes with the following ready-to-use handlers controllers. Please consider using or extending them before implementing your own custom controllers.

### `InMemoryHandlersController`

A handlers controller that stores the handlers in-memory.

```ts
import { InMemoryHandlersController } from 'msw/experimental'
```

### `AsyncHandlersController`

A handlers controller that stores handlers in [`AsyncLocalStorage`]() ...

```ts
import { defineNetwork, AsyncHandlersController } from 'msw/experimental'

const controller = new AsyncHandlersController([...initialHandlers]) 
const network = defineNetwork({
  sources,
  handlers: controller
})
```

```ts
beforeEach((test) => {
  return controller.boundary(test)()
})
```

## API

### `.currentHandlers`

Returns an array of the current handlers.

### `.use(nextHandlers: Array<AnyHandler>)`

```ts
controller.use(
  http.get('/user', () => {
    return HttpResponse.json({ override: true })
  })
)
```

### `.reset(nextInitialHandlers: Array<AnyHandler>)`

### `.getHandlersByKind(kind: HandlerKind): Array<AnyHandler>`

Returns a list of handlers by the given `kind`.

```ts
const httpOne = http.get('/one', resolver)
const httpTwo = http.post('/two', resolver)
const graphqlOne = graphql.query('GetUser', resolver)
const wsOne = ws.link('*').addEventListener('connection', listener)

controller.use([
  httpOne,
  httpTwo,
  graphql,
  wsOne,
])

controller.getHandlersByKind('request')
// [httpOne, httpTwo, graphqlOne]
```

> Note that both `http` and `graphql` namespaces produce handlers of the `request` kind.
