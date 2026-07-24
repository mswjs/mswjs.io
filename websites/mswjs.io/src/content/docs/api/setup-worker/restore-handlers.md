---
order: 5
title: restoreHandlers()
description: Mark used one-time request handlers as unused.
---

## Call signature

```js {18}
const worker = setupWorker(
  http.get('/resource', () => HttpResponse.json({ id: 'abc-123' }), {
    once: true,
  })
)

// The first request to "GET /resource" will be intercepted by
// the request handler above, and the mocked JSON response will be returned.
await fetch('/resource')

// Since the matching request handler above was marked as "{ once: true }"
// and has already handled a matching request, the subsequent requests to
// this resource will by bypassed and the original response will be returned.
await fetch('/resource')

// By calling the "worker.restoreHandlers()" method, you are marking all
// used one-time request handlers as unused so they can affect the network again.
worker.restoreHandlers()

// The matching one-time request handler was restored, so the mocked response
// will be returned again. Past this point, the handler is marked as used again.
await fetch('/resource')
```

## Related materials

- [Network behavior overrides](/docs/best-practices/network-behavior-overrides)
