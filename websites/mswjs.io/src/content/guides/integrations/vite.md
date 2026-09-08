---
order: 6
title: Vite
description: Integrate Mock Service Worker with Vite using the msw/vite plugin.
keywords:
  - vite
  - plugin
  - browser
  - development
---

The `msw/vite` plugin serves the Service Worker script directly from your installed MSW package. You don't need to copy `mockServiceWorker.js` into your public directory or keep that copy up to date.

## Add the plugin

Install MSW in your Vite application:

```sh
npm install msw --save-dev
```

Add the `msw()` plugin to your existing Vite configuration alongside any framework plugins:

::: code-group

```ts [vite.config.ts]
import { defineConfig } from 'vite'
import { msw } from 'msw/vite'

export default defineConfig({
  plugins: [msw()],
})
```

:::

The plugin serves the worker at `/mockServiceWorker.js`. It handles serving the script; you still define your request handlers and start mocking in your application.

## Define request handlers

Describe the requests you want to mock:

::: code-group

```ts [src/mocks/handlers.ts]
import { http, HttpResponse } from 'msw'

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

Create the browser worker using those handlers:

::: code-group

```ts [src/mocks/browser.ts]
import { setupWorker } from 'msw/browser'
import { handlers } from './handlers'

export const worker = setupWorker(...handlers)
```

:::

## Start mocking

Start the worker before importing the module that renders your application or makes its initial requests. Use Vite's `import.meta.env.DEV` flag to enable mocking only in development:

::: code-group

```ts [src/main.ts]
async function bootstrap() {
  if (import.meta.env.DEV) {
    const { worker } = await import('./mocks/browser')
    await worker.start()
  }

  // Your application's rendering and initialization code lives here.
  await import('./app')
}

bootstrap()
```

:::

Here, `src/app.ts` is your application's existing entry module, moved out of `src/main.ts`. Point your `index.html` script at `src/main.ts` so the worker starts first.

Run your Vite development server and open the browser console. You should see:

```sh
[MSW] Mocking enabled.
```

Requests to `/api/user` now receive the response defined in your handlers.

::: tip
Already using MSW in your Vite application? Add the plugin, then remove the generated `public/mockServiceWorker.js` file. Keep your existing handlers, `setupWorker()`, and `worker.start()` calls.
:::

## Custom worker URL

Use `workerUrl` to change where the plugin serves the worker. Pass the same URL to `worker.start()`:

::: code-group

```ts [vite.config.ts]
import { defineConfig } from 'vite'
import { msw } from 'msw/vite'

export default defineConfig({
  plugins: [msw({ workerUrl: '/mocks/worker.js' })],
})
```

:::

::: code-group

```ts [src/main.ts]
await worker.start({
  serviceWorker: {
    url: '/mocks/worker.js',
    options: {
      scope: '/',
    },
  },
})
```

:::

Place this `worker.start()` call inside the development branch of `bootstrap()` above. The plugin permits the worker to use the root scope, so it can control your application even when the script is served from a nested path.

## Production

The plugin is disabled when `NODE_ENV` is `production` and does not copy a worker script into your build output. The development check above also keeps your application's mocking setup out of the production path.

If you need to serve mocks in a deployed demo, generate and deploy the worker script using the [Browser integration](/guides/integrations/browser), and enable mocking explicitly for that environment.
