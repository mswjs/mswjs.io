---
title: stop()
order: 2
description: Stop the request interception for the current client.
---

## Call signature

The `worker.stop()` function does not accept any arguments and returns a promise that resolves once the request interception has been disabled for the current client.

```js
await worker.stop() // Promise<void>
```

Although it's a logical opposite to `worker.start()`, the `worker.stop()` method does not unregister the worker. Instead, it instructs the worker to disable API mocking for the current client (page). This way you can have multiple open clients with the different state of the request interception.

This method is designed to be called on runtime to control the request interception flow. You do so by exposing the `worker` reference globally and calling `await window.worker.stop()` at any time in the browser.

::: code-group

```js [mocks/browser.js]
import { setupWorker } from 'msw/browser'
import { handlers } from './handlers'

export const worker = setupWorker(...handlers)

// Expose the worker instance globally.
window.worker = worker
```

:::

::: info
  When stopping the worker on runtime, the stopped state will not persist across
  page reloads.
:::
