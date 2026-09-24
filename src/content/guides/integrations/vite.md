---
order: 6
title: Vite
description: Integrate Mock Service Worker with Vite using the msw/vite plugin.
keywords:
  - vite
  - plugin
  - browser
  - development
  - ssr
  - virtual module
---

The `msw/vite` plugin integrates Mock Service Worker into your Vite application. The plugin:

- **Serves the worker script** directly from the installed `msw` package during development. You don't need to copy `mockServiceWorker.js` into your public directory or keep that copy up to date;
- **Provides a preconfigured network** via the `virtual:msw` module that works both in the browser and in your server-side (SSR) code;
- **Excludes mocking from production** builds and never serves or writes the worker script in production.

## Add the plugin

Install MSW in your Vite application:

```sh
npm install msw --save-dev
```

Add the `msw()` plugin to your existing Vite configuration alongside any framework plugins:

::: code-group

```ts [vite.config.ts] {2,5}
import { defineConfig } from 'vite'
import { msw } from 'msw/vite'

export default defineConfig({
  plugins: [msw()],
})
```

:::

During development, the plugin serves the worker script at `/mockServiceWorker.js` (respecting your [`base`](https://vitejs.dev/config/shared-options.html#base) option). You still define the handlers and enable mocking in your application.

## Define handlers

Describe the requests you want to mock:

::: code-group

```ts [src/mocks/handlers.ts]
import { http, HttpResponse } from 'msw/http'

export const handlers = [
  http.get('/api/user', () => {
    return HttpResponse.json({
      id: 'abc-123',
      firstName: 'John',
      lastName: 'Maverick',
    })
  }),
]
```

:::

## Enable mocking

Import the `network` from the `virtual:msw` module, configure it with your handlers, and enable it. Do this before importing the module that renders your application or makes its initial requests, and guard the mocking setup with Vite's `import.meta.env.DEV` flag to keep it out of production builds:

::: code-group

```ts [src/main.ts] {1-7}
if (import.meta.env.DEV) {
  const { network } = await import('virtual:msw')
  const { handlers } = await import('./mocks/handlers')

  network.configure({ handlers })
  await network.enable()
}

// Your application's rendering and initialization code lives here.
await import('./app')
```

:::

Here, `src/app.ts` is your application's existing entry module, moved out of `src/main.ts`. Point your `index.html` script at `src/main.ts` so the network is enabled first.

The `network` exposed by `virtual:msw` is a preconfigured [network instance](#network). In the browser, `network.enable()` registers the worker script served by the plugin and starts the request interception. In your server-side code, the same call enables the request interception in the current Node.js process. You don't need to import `setupWorker` or `setupServer` yourself.

Run your Vite development server and open the browser console. You should see:

```sh
[MSW] Mocking enabled.
```

Requests to `/api/user` now receive the response defined in your handlers.

::: tip
Already using MSW in your Vite application? Add the plugin, remove the generated `public/mockServiceWorker.js` file, and replace your `setupWorker()`/`worker.start()` calls with the `virtual:msw` network above. You can also keep your existing setup as-is by using the [`worker-only`](#mode) mode of the plugin.
:::

## TypeScript

The `msw/vite/client` declaration file provides the types for the `virtual:msw` module. If your TypeScript project does not include the Vite configuration file (i.e. the module importing `msw/vite`), add a reference to those types to any included declaration file, like `src/vite-env.d.ts`:

::: code-group

```ts [src/vite-env.d.ts] {2}
/// <reference types="vite/client" />
/// <reference types="msw/vite/client" />
```

:::

## Server-side rendering

The `virtual:msw` module is _environment-neutral_. Import it in your server entry module (e.g. the one run by Vite's module runner or your SSR server) to intercept the requests your server makes while rendering, using the same handlers as in the browser:

::: code-group

```ts [src/entry-server.ts] {1-7}
if (import.meta.env.DEV) {
  const { network } = await import('virtual:msw')
  const { handlers } = await import('./mocks/handlers')

  network.configure({ handlers })
  await network.enable()
}

export async function render(url: string) {
  // Any requests made while rendering are intercepted.
}
```

:::

On the server, the plugin resolves the network to the Node.js defaults (the same as `setupServer()`), so the request interception happens in the Node.js process running your server code.

## Production

The plugin does nothing in production: the `virtual:msw` module resolves to an `undefined` network and the worker script is neither served nor written to your build output. If you still want mocking in production (e.g. for a deployed demo), generate and serve the worker script yourself using the [Browser integration](/guides/integrations/browser) and enable mocking explicitly for that environment.

## Options

### `mode`

- `"auto" | "worker-only"`, default: `"auto"`

Controls the level of integration the plugin provides:

- `"auto"` (default) serves the worker script and provides the `virtual:msw` module with a preconfigured network;
- `"worker-only"` only serves the worker script. The `virtual:msw` module is disabled and you set up the worker yourself using [`setupWorker`](/api/setup-worker/) from `msw/browser`.

Use the `"worker-only"` mode to keep the plugin's worker serving while retaining full control over the worker instance (e.g. to reuse an existing `setupWorker()` setup or to customize the `worker.start()` options):

::: code-group

```ts [vite.config.ts] {5}
import { defineConfig } from 'vite'
import { msw } from 'msw/vite'

export default defineConfig({
  plugins: [msw({ mode: 'worker-only' })],
})
```

```ts [src/mocks/browser.ts]
import { setupWorker } from 'msw/browser'
import { handlers } from './handlers'

export const worker = setupWorker(...handlers)
```

```ts [src/main.ts] {1-4}
if (import.meta.env.DEV) {
  const { worker } = await import('./mocks/browser')
  await worker.start()
}

await import('./app')
```

:::

::: info
If your application uses a custom `base`, pass the worker script location to `worker.start()` via the [`serviceWorker.url`](/api/setup-worker/start#url) option (e.g. `${import.meta.env.BASE_URL}mockServiceWorker.js`). In the `"auto"` mode, the plugin configures the worker script location for you.
:::

## Related materials

<PageCard
  icon="CubeTransparentIcon"
  url="/api/vite"
  title="vite"
  description="API reference for the msw/vite plugin."
/>
