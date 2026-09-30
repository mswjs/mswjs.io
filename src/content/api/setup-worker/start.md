---
order: 1
title: start()
description: Register the Service Worker and starts the request interception.
---

## Call signature

The `worker.start()` method accepts an optional [Options](#options) object that you can use to customize the worker registration.

By default, when called without any arguments, the `worker.start()` method registers the Service Worker served under `./mockServiceWorker.js` and starts the request interception.

```js {5}
import { setupWorker } from 'msw/browser'
import { handlers } from './handlers'

const worker = setupWorker(...handlers)
await worker.start() // Promise<{ pending }>
```

::: warning
  Note that registering and activating the Service Worker is an asynchronous
  action. The `worker.start()` returns you a promise that resolves when the
  worker is ready. Do not forget to await it to prevent race conditions between
  the worker registration and your network-dependent code.
:::

You can see a confirmation message printed in the browser's console when MSW is active.

```sh
[MSW] Mocking enabled.
```

## Options

### `serviceWorker`

#### `url`

- _String_, default: `"/mockServiceWorker.js"`

Custom Service Worker registration URL. Use this option if you are serving the worker script under a custom path.

```js
worker.start({
  serviceWorker: {
    url: '/assets/mockServiceWorker.js',
  },
})
```

::: warning
  Keep in mind that a Service Worker can only control the network from the
  clients (pages) hosted at its level or down. You likely always want to
  register the worker at the root.
:::

#### `options`

- [_Service Worker registration options_](https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerContainer/register#parameters)

These options modify the Service Worker registration itself and are not related to MSW directly.

```js
worker.start({
  serviceWorker: {
    options: {
      // Narrow down the scope of the pages that the worker can control.
      scope: '/product',
    },
  },
})
```

### `findWorker`

- _Function_, expected return type: _Boolean_

A custom function to locate the worker script on the server. You may want to use this option if your application runs behind a proxy or has a dynamic hostname that otherwise prevents the library from locating the worker script at `<HOSTNAME>/mockServiceWorker.js`.

```js
worker.start({
  findWorker(scriptUrl, mockServiceWorkerUrl) {
    return scriptUrl.includes('mockServiceWorker')
  },
})
```

### `quiet`

- _Boolean_, default: `false`

Disables all the logging from the library (e.g. the activation message, the intercepted requests' messages).

```js
worker.start({
  quiet: true,
})
```

### `onUnhandledFrame`

- _String_, default: `"warn"`
- _Function_

Decide how to react to unhandled network frames (i.e. requests or WebSocket connections that do not have a matching handler).

```js
worker.start({
  onUnhandledFrame: 'error',
})
```

#### Predefined strategies

| Handling mode    | Description                                                                  |
| ---------------- | ---------------------------------------------------------------------------- |
| `warn` (Default) | Prints a warning message to the browser's console, performs the frame as-is. |
| `error`          | Prints an error, aborts the frame.                                           |
| `bypass`         | Prints nothing, performs the frame as-is.                                    |

#### Custom strategy

Provide a function to decide how to react to unhandled frames on a case-by-case basis. The function receives an object with the following properties:

| Property   | Type                                   | Description                                                                                          |
| ---------- | -------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| `frame`    | `NetworkFrame`                         | The unhandled network frame. Use `frame.protocol` (`"http"` or `"ws"`) to distinguish between them. |
| `defaults` | `{ warn(): void, error(): void }`      | The predefined strategies to reuse in your custom callback.                                          |

For HTTP frames, the intercepted request is available under `frame.data.request`. For WebSocket frames, the intercepted connection is available under `frame.data.connection`.

```js
worker.start({
  onUnhandledFrame({ frame, defaults }) {
    // Ignore any requests containing "cdn.com" in their URL.
    if (frame.protocol === 'http' && frame.data.request.url.includes('cdn.com')) {
      return
    }

    // Otherwise, print an unhandled frame warning.
    defaults.warn()
  },
})
```

> By default, MSW will ignore common static asset requests so they won't be considered unhandled. If you provide a custom callback to the `onUnhandledFrame` option, _you will opt out from that behavior_. You can tap into it at any time by manually calling the [`isCommonAssetRequest()`](/api/is-common-asset-request) function.

### `waitUntilReady`

- _Boolean_, default: `true`

Defers any application requests that happen during the Service Worker registration.

::: warning
  Disabling this option is **not recommended** as this will create a race
  condition between the worker registration and your application's runtime.
:::
