---
order: 2
title: close()
description: Stops the request interception in the current Node.js process.
---

## Call signature

The `server.close()` function does not accept any argument and doesn't return anything. It is a _synchronous_ function since request interception in Node.js is performed via native class extensions, which is a synchronous process.

```js
server.close()
```

This method is designed to be called when the API mocking capabilities are no longer needed, for example when the test run is finished.

## Related materials

- [`server.listen()`](/docs/api/setup-server/listen)
