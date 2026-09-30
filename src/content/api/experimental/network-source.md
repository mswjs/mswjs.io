---
title: NetworkSource
description: The base class for network source implementation.
---

## Call signature

```js
import { NetworkSource } from 'msw/experimental'

export class CustomSource extends NetworkSource {
  enable() {}
}
```

A network source describes where the network is coming from. It can be the current process, a remote process, a locally stored HAR file, or anything else that can produce network _frames_ (e.g. requests or WebSocket connections). Provide the network sources to the [`defineNetwork()`](/api/experimental/define-network) function to route their frames through your handlers.

## Methods

### `.enable()`

Starts the network source. Implement this method to begin producing frames (e.g. apply the interception, open a file, subscribe to events). It can be synchronous or return a promise.

```js
class CustomSource extends NetworkSource {
  enable() {
    this.interceptor.apply()
  }
}
```

### `.disable()`

Stops the network source and removes all the frame listeners. If you override this method, call `super.disable()` to keep the listeners cleanup.

```js
class CustomSource extends NetworkSource {
  disable() {
    super.disable()
    this.interceptor.dispose()
  }
}
```

### `.queue(frame)`

Emits the given network frame to the network. Returns a promise that resolves once the frame has been resolved against the handlers.

```js
await this.queue(frame)
```

### `.on(type, listener)`

Adds a listener for the given event type. The only event a network source emits is `frame`, which is emitted for every queued frame. This is what `defineNetwork()` uses to subscribe to the source.

```js
source.on('frame', ({ frame }) => {
  console.log(frame.protocol)
})
```

## Default sources

The library comes with the following ready-to-use network sources. Please consider using or extending them before implementing your own custom sources.

### `InterceptorSource`

A network source that produces HTTP and WebSocket frames from the given list of [Interceptors](https://github.com/mswjs/interceptors). This is the source that both `setupWorker()` and `setupServer()` use.

```js
import { InterceptorSource } from 'msw/experimental'
import { FetchInterceptor } from '@mswjs/interceptors/fetch'

const source = new InterceptorSource({
  interceptors: [new FetchInterceptor()],
})
```

## Custom network sources

To implement a custom network source, you need two things: a _network frame_ that describes how to respond to, pass through, or error a single network scenario, and a _network source_ that produces such frames.

Let's create a minimal network source that resolves any given `Request` against the handlers manually. First, extend the default `HttpNetworkFrame` class to describe what happens to the request once the network decides how to handle it:

::: code-group

```js [ManualHttpNetworkFrame.js]
import { HttpNetworkFrame } from 'msw/experimental'

export class ManualHttpNetworkFrame extends HttpNetworkFrame {
  constructor(request) {
    super({ request })
    this.response = Promise.withResolvers()
  }

  // Called when a handler returned a mocked response.
  respondWith(response) {
    this.response.resolve(response)
  }

  // Called when the request should be performed as-is.
  passthrough() {
    this.response.resolve(fetch(this.data.request))
  }

  // Called when the request should be errored.
  errorWith(reason) {
    this.response.reject(reason)
  }
}
```

:::

Next, create a network source that queues a new frame for every request you give it:

::: code-group

```js [ManualSource.js] {7-10}
import { NetworkSource } from 'msw/experimental'
import { ManualHttpNetworkFrame } from './ManualHttpNetworkFrame'

export class ManualSource extends NetworkSource {
  enable() {}

  async handle(request) {
    const frame = new ManualHttpNetworkFrame(request)
    await this.queue(frame)
    return frame.response.promise
  }
}
```

:::

Finally, provide the custom source to `defineNetwork()` and resolve requests against your handlers:

```js
import { http, HttpResponse } from 'msw/http'
import { defineNetwork } from 'msw/experimental'
import { ManualSource } from './ManualSource'

const source = new ManualSource()
const network = defineNetwork({
  sources: [source],
  handlers: [
    http.get('https://api.example.com/user', () => {
      return HttpResponse.json({ id: 'abc-123' })
    }),
  ],
})

await network.enable()

const response = await source.handle(
  new Request('https://api.example.com/user'),
)
await response.json() // { id: 'abc-123' }
```

> Both `HttpNetworkFrame` and `WebSocketNetworkFrame` are exported from `msw/experimental`. Extend them to produce HTTP and WebSocket frames respectively.
