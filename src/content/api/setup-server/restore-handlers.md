---
order: 6
title: restoreHandlers()
description: Mark used one-time handlers as unused.
---

## Call signature

```js {18}
const server = setupServer(
  http.get('/user', () => HttpResponse.json({ firstName: 'John' }), {
    once: true,
  })
)

// The first request to "GET /user" will be intercepted by
// the handler above, and the mocked JSON response will be returned.
await fetch('/user')

// Since the matching handler above was marked as "{ once: true }"
// and has already handled a matching request, the subsequent requests to
// this resource will by bypassed and the original response will be returned.
await fetch('/user')

// By calling the "server.restoreHandlers()" method, you are marking all
// used one-time handlers as unused so they can affect the network again.
server.restoreHandlers()

// The matching one-time handler was restored, so the mocked response
// will be returned again. Past this point, the handler is marked as used again.
await fetch('/user')
```
