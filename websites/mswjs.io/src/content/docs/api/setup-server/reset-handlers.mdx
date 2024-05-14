---
order: 5
title: resetHandlers()
description: Reset request handlers to the initial list.
---

## Call signature

The `server.resetHandlers()` method can be called without any arguments. When done so, all the [Runtime request handlers]() (those prepended via `server.use()`) will be removed.

```js {5}
const server = setupServer(http.get('/resource', resolver))

server.use(http.post('/user', resolver))

server.resetHandlers()
// The "POST /user" runtime request handler is removed,
// and only the "GET /resource" initial request handler remains.
```

The `server.resetHandlers()` method also accepts an optional list of request handlers spread as its arguments. When such a list is provided, the initial request handlers passed to `setupServer()` will also be removed, and the given list of request handlers would act as the initial handlers.

```js {4}
const server = setupServer(http.get('/resource', resolver))
server.use(http.post('/user', resolver))

server.resetHandlers(http.patch('/book/:bookId', resolver))
// Both the runtime "POST /user" and the initial "GET /resource"
// request handlers are removed, and only the "PATCH /book/:bookId"
// request handler remains.
```

## Related materials

- [Network behavior overrides](/docs/best-practices/network-behavior-overrides)
- [`worker.resetHandler()`](/docs/api/setup-worker/reset-handlers)
