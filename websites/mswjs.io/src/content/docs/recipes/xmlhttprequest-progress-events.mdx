---
title: XMLHttpRequest progress events
description: Support progress events on XMLHttpRequest.
keywords:
  - xmlhttprequest
  - progress
  - upload
---

As stated in the [Limitations](/docs/limitations), the _browser_ integration of MSW does not support the progress and upload progress events on XMLHttpRequest due to the Service Worker API design. You can circumvent that limitation by intercepting XMLHttpRequest earlier than the worker does, using the `XMLHttpRequestInterceptor` from the [`@mswjs/interceptors`](https://github.com/mswjs/interceptors).

```ts
// mocks/xhr.ts
import { getResponse } from 'msw'
import { XMLHttpRequestInterceptor } from '@mswjs/interceptors'
import { handlers } from './handlers' // Import your request handlers

const interceptor = new XMLHttpRequestInterceptor()

interceptor.on('request', ({ request, controller }) => {
  const response = await getResponse(handlers, request)

  if (response) {
    controller.respondWith(response)
  }
})

interceptor.apply()
```

```ts
// mocks/browser.ts
import './xhr'

// The rest of your browser setup for MSW here.
// (e.g. `setupWorker`, `handlers`, etc.)
```

In the example above, you can resolve your existing `handlers` against the `XMLHttpRequestInterceptor` via the `getResponse` function. This way, your setup stays the same, you still write your request handlers as you are used to, but pass them through this manual interceptor. The `XMLHttpRequestInterceptor` _patches the `XMLHttpRequest`_ class, which means that XMLHttpRequest _will not be visible to the Service Worker anymore_.
The rest of your handlers are not affected by this.

## Related resources

- [`XMLHttpRequest` upload progress discussion on GitHub](https://github.com/mswjs/msw/discussions/1937)
