---
order: 4
title: Erroring the connection
description: Mocking SSE connection error.
keywords:
  - sse
  - error
  - abort
  - connection
  - mock
---

You can error the intercepted client connection by calling `client.error()` in your request handler:

```ts {2}
sse('/stream', ({ client }) => {
  client.error()
})
```

> Client connection errors do not accept the closure reason.

Unlike [`client.close()`](/docs/sse/server-events/closing-the-connection), calling `client.error()` aborts the connection, which will dispatch the `error` event on the underlying `EventSource` instance.
