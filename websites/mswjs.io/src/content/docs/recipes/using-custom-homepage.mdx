---
title: Using custom "homepage" property
---

When using a custom `homepage` property in your `package.json`, you may encounter Service Worker registration issues. Consider the following `package.json`:

```json
// package.json
{
  "homepage": "/my-app"
}
```

This will treat the `/my-app` path as the home directory for your application. However, MSW will still expect you to serve the worker script _at the root_.

To account for that, you have to provide an explicit Service Worker URL as the `serviceWorker.url` option when starting the worker:

```js {12}
// src/index.js
// Read the package.json file to grab the "homepage" value.
import packageJson from '../package.json'

if (process.env.NODE_ENV === 'development') {
  const { worker } = await import('./mocks/browser')

  await worker.start({
    serviceWorker: {
      // Provide a custom worker script URL, taking
      // the "homepage" into account.
      url: `${packageJson.homepage}/mockServiceWorker.js`,
    },
  })
}
```
