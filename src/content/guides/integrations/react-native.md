---
order: 4
title: React Native
description: Set up Mock Service Worker in React Native.
keywords:
  - native
  - react
  - ios
  - android
  - mobile
---

In React Native, you integrate MSW through the official [`@msw/react-native`](https://github.com/mswjs/react-native) package. It exposes a `network` instance preconfigured for the React Native environment: it intercepts the `fetch` and `XMLHttpRequest` requests your application makes and installs the standard APIs that MSW needs but React Native lacks.

::: warning
  React Native is missing certain standard browser APIs and doesn't implement
  certain others per specification. **Use this integration at your own risk.**
:::

## Install

Add `@msw/react-native` as a dependency to your project:

<div class="copyable-code">

::: code-group

```sh [npm]
npm install msw @msw/react-native --save-dev
```

```sh [pnpm]
pnpm add msw @msw/react-native --save-dev
```

:::

</div>

> You don't have to install or import any polyfills. The package installs the missing APIs, like `URL` or `TextEncoder`, by itself and never replaces those your runtime already has.

## Setup

Import the `network` from `@msw/react-native` and configure it with your handlers.

::: code-group

```js [src/mocks/network.js] {1}
import { network } from '@msw/react-native'
import { handlers } from './handlers'

network.configure({ handlers })

export { network }
```

:::

> The `network` is the object returned by the [`defineNetwork`](/api/experimental/define-network) API. You can use it the same way you would use `setupServer` in Node.js.

::: warning
  Always import `@msw/react-native` _before_ importing anything from `msw`,
  including the modules that import from `msw` themselves (like your handlers).
  The package prepares the React Native environment for MSW when imported.
:::

## Enable mocking

### Development

Import the `network` in the entrypoint of your React Native application and call `network.enable()` _conditionally_.

::: code-group

```js [index.js] {5-12} /enableMocking/
import { AppRegistry } from 'react-native'
import App from './src/App'
import { name as appName } from './app.json'

async function enableMocking() {
  if (!__DEV__) {
    return
  }

  const { network } = await import('./src/mocks/network')
  await network.enable()
}

enableMocking().then(() => {
  AppRegistry.registerComponent(appName, () => App)
})
```

:::

### Testing

When testing your React Native application, the way you set up MSW will differ based on how you run your tests. For example, for unit/integration testing where you render your React components in isolation, you should follow the regular [Node.js integration](/guides/integrations/node) to configure MSW with tools like Vitest or Jest.

For end-to-end testing, make sure you have [Enabled MSW in development](#development) and spawn the instance of your React Native application accordingly (feel free to introduce new environment variables just for that). That way, you will be running your end-to-end tests against the application instance that has MSW up and running.

## Managing handlers

Use the `network` to change the handlers on runtime, the same way you would with `server` in Node.js:

```js
import { network } from '@msw/react-native'
import { http, HttpResponse } from 'msw/http'

// Prepend handler overrides.
network.use(
  http.get('https://example.com/user', () => {
    return HttpResponse.json({ name: 'John' })
  }),
)

// Remove the overrides added via `network.use()`.
network.resetHandlers()

// Stop the request interception.
network.disable()
```

## Common issues

### Unable to resolve module `msw/native`

**Reason:** The `msw/native` export has been removed from MSW. React Native is now supported through the `@msw/react-native` package.

**Solution:** Install `@msw/react-native` and replace `setupServer` from `msw/native` with the `network`.

```diff
-import { setupServer } from 'msw/native'
+import { network } from '@msw/react-native'
 import { handlers } from './handlers'

-export const server = setupServer(...handlers)
+network.configure({ handlers })
```

Then, replace the `server.listen()` and `server.close()` calls with `network.enable()` and `network.disable()`, respectively.

### Unable to resolve module `http`

**Reason:** Your React Native code ends up importing the `http` module that doesn't exist in React Native.

**Solution:** Find the incorrect `msw/node` import in your application and replace it with `@msw/react-native`.

```diff
-import { setupServer } from 'msw/node'
+import { network } from '@msw/react-native'
```
