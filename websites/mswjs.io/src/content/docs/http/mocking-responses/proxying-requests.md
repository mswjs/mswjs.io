---
title: Proxying requests
keywords:
  - proxy
  - modify
  - redirect
  - bypass
---

You can proxy the intercepted request by constructing a proxy Fetch API `Request` instance and performing it using the [`bypass()`](/api/bypass) function to prevent it from matching the same request handler again. This can turn your MSW setup into a proxy server that affects both local and external traffic.

```ts /bypass/ {7-8,10-16,18-19}
import { http, bypass } from 'msw'

export const handlers = [
  http.get('/resource', async ({ request }) => {
    const proxyUrl = new URL(request.url)

    // Modify the original URL to point to a different server.
    proxyUrl.hostname = 'api.example.com'

    // Construct a proxy request.
    const proxyRequest = new Request(proxyUrl, {
      headers: {
        'content-type': request.headers.get('content-type'),
        'x-proxy-header': 'abc-123',
      },
    })

    // Perform the proxy request.
    const originalResponse = await fetch(bypass(proxyRequest))

    // Continue handling the request...
  }),
]
```

<PageCard
  icon="CubeTransparentIcon"
  url="/api/bypass"
  title="bypass"
  description="API reference for the `bypass` function."
/>
