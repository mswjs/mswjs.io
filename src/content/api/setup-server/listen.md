---
order: 1
title: listen()
description: Enable the interception of requests in the current process.
---

## Call signature

```js
server.listen()
server.listen({ onUnhandledFrame: 'error' })
```

## Usage

It's common to enable the interception in the `beforeAll` hook of your testing framework. Below you can find an example of how to do that with Jest.

```js {7}
import { setupServer } from 'msw/node'
import { handlers } from './handlers'

const server = setupServer(...handlers)

beforeAll(() => {
  server.listen()
})
```

> Unlike `worker.start()`, the `.listen()` method is synchronous because there are no workers to register or actual connections to establish.

## Options

### `onUnhandledFrame`

- _Predefined strategy_ or _Custom strategy_ (default: `"warn"`).

Specifies how to react to network frames (i.e. requests or WebSocket connections) that are not handled by any handlers.

#### Predefined strategies

| Strategy name        | Description                                          |
| -------------------- | ---------------------------------------------------- |
| `"warn"` (_Default_) | Print a warning but perform the frame as-is.         |
| `"error"`            | Print an error and halt the frame execution.         |
| `"bypass"`           | Does not print anything and perform the frame as-is. |

```js
server.listen({
  onUnhandledFrame: 'error',
})
```

#### Custom strategy

Provide a function to decide how to react to unhandled frames on a case-by-case basis. The function receives an object with the following properties:

| Property   | Type                                   | Description                                                                                          |
| ---------- | -------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| `frame`    | `NetworkFrame`                         | The unhandled network frame. Use `frame.protocol` (`"http"` or `"ws"`) to distinguish between them. |
| `defaults` | `{ warn(): void, error(): void }`      | The predefined strategies to reuse in your custom callback.                                          |

For HTTP frames, the intercepted request is available under `frame.data.request`. For WebSocket frames, the intercepted connection is available under `frame.data.connection`.

```js
server.listen({
  onUnhandledFrame({ frame }) {
    if (frame.protocol === 'http') {
      const { request } = frame.data
      console.log('Unhandled %s %s', request.method, request.url)
    }
  },
})
```

The predefined strategies are available under the `defaults` property of the callback argument so you could reuse them. Here's an example of how you can utilize that to bypass static assets but still warn on other unhandled frames:

```js
server.listen({
  onUnhandledFrame({ frame, defaults }) {
    if (frame.protocol === 'http') {
      const url = new URL(frame.data.request.url)

      // Ignore requests to fetch static assets.
      if (url.pathname.includes('/assets/')) {
        return
      }
    }

    // Otherwise, print a warning for any unhandled frame.
    defaults.warn()
  },
})
```

> By default, MSW will ignore common static asset requests so they won't be considered unhandled. If you provide a custom callback to the `onUnhandledFrame` option, _you will opt out from that behavior_. You can tap into it at any time by manually calling the [`isCommonAssetRequest()`](/api/is-common-asset-request) function.
