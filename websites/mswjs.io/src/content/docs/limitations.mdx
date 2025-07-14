---
order: 4
title: Limitations
---

## Browser limitations

This library uses the Service Worker API to intercept requests in the browser. Any limitations that browsers may have when implementing or executing the said API automatically become the limitations of the Mock Service Worker library. We cannot address this behaviors as they are present in the browser and cannot be circumvented by JavaScript.

### XMLHttpRequest: progress events

The Service Worker API translates all outgoing requests on the page to Fetch API requests. Those, sadly, do not have a concept of request progress and so the related progress and upload progress events _will not be dispatched_ on the intercepted XMLHttpRequest.

There is, however, a workaround you can employ by using the `XMLHttpRequestInterceptor` directly, which taps into `XMLHttpRequest` mocking before the Service Worker and supports the progress event. Find a recipe on how to do that below:

import { PageCard } from '../../components/react/pageCard'
import { BeakerIcon } from '@heroicons/react/24/solid'

<PageCard
  icon={BeakerIcon}
  url="/docs/recipes/xmlhttprequest-progress-events"
  title="XMLHttpRequest progress events"
  description="Support progress events on XMLHttpRequest."
/>

### Firefox: `fetch` event for `XMLHttpRequest`

Firefox does not notify the worker when an `XMLHttpRequest` happens on the page. This means that the worker and, as the result, this library, do not know when such requests occur. Even if you have a matching request handler for the request, it won't be matched and the mocked response won't be sent if it's an `XMLHttpRequest`.

Mock Service Worker positions itself as a development tool, which means we cannot guarantee 100% compatibility with all modern browsers. In the end, each browser may have its discrepancies in how the Service Worker API is implemented, for which we also cannot account for.

## Node.js limitations

### Direct network connections

Due to technical limitations, MSW cannot intercept requests performed via direct `net.connect()`/`net.createConnection()` calls. Most request libraries in Node.js rely on `http.ClientRequest` to perform requests, which is what MSW intercepts. However, certain libraries, like [Undici](https://github.com/nodejs/undici), tap directly into the `node:net` module to perform requests, and those will not be visible to MSW.
