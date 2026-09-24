---
title: defineNetwork
description: Create a custom network instance.
---

## Call signature

```ts
import { defineNetwork, InterceptorSource } from 'msw/experimental'

const network = defineNetwork({
  sources: [new InterceptorSource()],
})
```

## Options

### `sources`

- _Array_ of [_Network sources_](/api/experimental/network-source)

The list of network sources to intercept. Every network source emits _frames_ (i.e. requests or WebSocket connections), and every frame describes how to handle the respective network scenario, like mocking a response, erroring the request, or performing it as-is.

```js
const network = defineNetwork({
  sources: [source],
})
```

### `handlers`

- _Array_ of _Handlers_, default: `[]`
- [_Handlers controller_](/api/experimental/handlers-controller)

The list of handlers to describe the network. Any request handlers (`http`, `graphql`, `sse`) and event handlers (`ws`) are supported.

```js
const network = defineNetwork({
  sources: [...],
  handlers: [http.get('/user', resolver)],
})
```

Provide a handlers controller instead of an array to control how the handlers are stored and resolved (e.g. to isolate the handlers between concurrent tests).

```js
const network = defineNetwork({
  sources: [...],
  handlers: new AsyncHandlersController(handlers),
})
```

### `context`

#### `baseUrl`

- _String_ or _URL_, default: `location.href` (if available)

The base URL to resolve relative handler paths (e.g. `http.get('/user')`) against.

```js
const network = defineNetwork({
  sources: [...],
  context: {
    baseUrl: 'https://api.example.com',
  },
})
```

#### `quiet`

- _Boolean_, default: `false`

Disables the logging of the handled frames (e.g. the intercepted requests' messages).

```js
const network = defineNetwork({
  sources: [...],
  context: {
    quiet: true,
  },
})
```

### `onUnhandledFrame`

- _String_, default: `"warn"`
- _Function_

Decide how to react to unhandled network frames (i.e. requests or WebSocket connections that do not have a matching handler). Accepts the same predefined strategies and custom strategy function as the [`onUnhandledFrame`](/api/setup-worker/start#onunhandledframe) option of `worker.start()` and `server.listen()`.

```js
const network = defineNetwork({
  sources: [...],
  onUnhandledFrame: 'error',
})
```

```js
const network = defineNetwork({
  sources: [...],
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

> All of the options can also be provided later via the `network.configure()` method. The options provided in the `.configure()` call override the same options of the `defineNetwork()` call. You cannot configure an already enabled network.

## Usage

The `defineNetwork` API is a flexible way to pre-configure the network interception by describing the [network source](/api/experimental/network-source) and the handlers to route it through.

For example, say you are only interested in the `fetch` requests in the current process. Use the `FetchInterceptor` as the network source and the HTTP `handlers` you'd like to apply to it.

```ts
import { http } from 'msw/http'
import { defineNetwork, InterceptorSource } from 'msw/experimental'
import { FetchInterceptor } from '@mswjs/interceptors/fetch'

const network = defineNetwork({
  sources: [
    new InterceptorSource({
      interceptors: [new FetchInterceptor()],
    }),
  ],
  handlers: [http.get('/user', resolver)],
})

// Start the network interception.
await network.enable()

// Control handlers.
network.use(...handlers)
network.resetHandlers()

// Stop the interception.
await network.disable()
```

> Both `setupWorker` and `setupServer` APIs are implemented on top of `defineNetwork`. Use their source code as the inspiration.

Anything can become a network source: from the runtime requests to third-party libraries' events to locally stored HAR files. Learn more about defining [custom network sources](/TODO/BROKEN).
