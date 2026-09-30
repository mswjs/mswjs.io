---
order: 13
title: vite
description: Vite plugin for Mock Service Worker.
keywords:
  - vite
  - plugin
  - virtual module
  - network
---

The `msw/vite` module exports a Vite plugin that serves the worker script during development and provides a preconfigured network instance via the `virtual:msw` module.

> Learn how to set up the plugin in the [Vite integration](/guides/integrations/vite) guide.

## Call signature

Add the `msw()` plugin to the `plugins` list of your Vite configuration:

```js
import { defineConfig } from 'vite'
import { msw } from 'msw/vite'

export default defineConfig({
  plugins: [msw()],
})
```

## Options

### `mode`

- _String_, default: `"auto"`

Decide how the plugin integrates with your application.

| Mode                 | Description                                                                                         |
| -------------------- | --------------------------------------------------------------------------------------------------- |
| `"auto"` (Default)   | Serves the worker script and provides the preconfigured `network` instance via the `virtual:msw` module. |
| `"worker-only"`      | Only serves the worker script for a manual setup. The `virtual:msw` module is not available.        |

```js
export default defineConfig({
  plugins: [
    msw({
      mode: 'worker-only',
    }),
  ],
})
```

## `virtual:msw`

The virtual module exposing the preconfigured `network` instance. Available in the `"auto"` mode only.

```ts
import { network } from 'virtual:msw'
```

### `network`

The `network` object has the same API as the one returned from the experimental [`defineNetwork()`](/api/experimental/define-network) function:

| Property                      | Description                                                                                                                                              |
| ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `configure(options)`          | Configures the network. Accepts `handlers` (the list of request and event handlers) and [`onUnhandledFrame`](/api/setup-server/listen#onunhandledframe). |
| `enable()`                    | Enables the interception. Registers the worker in the browser or patches the request modules in Node.js. Returns a promise, make sure to await it.        |
| `disable()`                   | Disables the interception. Returns a promise, make sure to await it.                                                                                     |
| `use(...handlers)`            | Prepends the given handlers to the list of current handlers. Same as [`worker.use()`](/api/setup-worker/use).                                            |
| `resetHandlers(...handlers)`  | Resets the handlers to the initial list. Same as [`worker.resetHandlers()`](/api/setup-worker/reset-handlers).                                           |
| `restoreHandlers()`           | Marks all used one-time handlers as unused. Same as [`worker.restoreHandlers()`](/api/setup-worker/restore-handlers).                                    |
| `listHandlers()`              | Returns the list of current handlers. Same as [`worker.listHandlers()`](/api/setup-worker/list-handlers).                                                |
| `events`                      | The [life-cycle events](/api/life-cycle-events) emitter of this network.                                                                                 |
| `readyState`                  | The current state of the network: `0` (disabled) or `1` (enabled).                                                                                       |

```ts
import { network } from 'virtual:msw'
import { http, HttpResponse } from 'msw/http'

network.configure({
  handlers: [http.get('/resource', () => HttpResponse.text('mocked'))],
  onUnhandledFrame: 'error',
})
await network.enable()

network.use(http.get('/override', () => HttpResponse.text('override')))
network.events.on('request:start', ({ request }) => {
  console.log(request.method, request.url)
})

await network.disable()
```

## `msw/vite/client`

The type declarations for the `virtual:msw` module. Reference them in a declaration file included in your TypeScript project:

```ts
/// <reference types="msw/vite/client" />
```

## Related materials

<PageCard
  icon="CommandLineIcon"
  url="/guides/integrations/vite"
  title="Vite integration"
  description="Integrate Mock Service Worker with Vite using the msw/vite plugin."
/>
