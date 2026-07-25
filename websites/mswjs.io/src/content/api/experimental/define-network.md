---
title: defineNetwork
---

## Call signature

```ts
interface NetworkOptions {
  sources: Array<NetworkSource>
  handlers?: Array<AnyHandler> | HandlersController
  context?: NetworkFrameResolutionContext
  onUnhandledFrame?: UnhandledFramHandle
}

function defineNetwork(options: NetworkOptions): NetworkApi {}
```

## Basic usage

Use this API to create a `network` instance that intercepts the traffic based on the provided [network sources](/api/experimental/network-source) and gives you the means to manage the interception.

```ts
import { defineNetwork, InterceptorSource } from 'msw/experimental'

const network = defineNetwork({
  sources: [new InterceptorSource({})]
})

// Start the network interception.
await network.enable()

// Control request handlers.
network.use(...handlers)
network.resetHandlers()

// Stop the interception.
await network.disable()
```
