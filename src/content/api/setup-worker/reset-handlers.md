---
order: 4
title: resetHandlers()
description: Reset handlers to the initial list.
---

## Call signature

The `worker.resetHandlers()` method can be called without any arguments. When done so, all the [Runtime handlers](/guides/best-practices/network-behavior-overrides) (those prepended via `worker.use()`) will be removed.

```js {4}
const worker = setupWorker(http.get('/resource', resolver))
worker.use(http.post('/user', resolver))

worker.resetHandlers()
// The "POST /user" runtime handler is removed,
// and only the "GET /resource" initial handler remains.
```

The `worker.resetHandlers()` method also accepts an optional list of handlers spread as its arguments. When such a list is provided, the initial handlers passed to `setupWorker()` will also be removed, and the given list of handlers would act as the initial handlers.

```js
const worker = setupWorker(http.get('/resource', resolver))
worker.use(http.post('/user', resolver))

worker.resetHandlers(http.patch('/book/:bookId', resolver))
// Both the runtime "POST /user" and the initial "GET /resource"
// handlers are removed, and only the "PATCH /book/:bookId"
// handler remains.
```

## Related materials

- [Network behavior overrides](/guides/best-practices/network-behavior-overrides)
- [`server.resetHandlers()`](/api/setup-server/reset-handlers)
