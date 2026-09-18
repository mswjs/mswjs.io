---
order: 5
title: Closing the connection
description: Mocking SSE connection closure.
keywords:
  - sse
  - close
  - connection
  - mock
---

You can close the intercepted client connection by calling `client.close()` at any time in your request handler.

```ts {2}
sse('/stream', ({ client }) => {
  client.close()
})
```

Unlike [`client.error()`](/docs/sse/server-events/erroring-the-connection), calling `client.close()` produces a _graceful_ connection closure and will not emit the `error` event on the underlying `EventSource` instance.
