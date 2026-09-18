---
order: 5
title: Redirects
description: Mocking redirect responses.
keywords:
  - location
  - redirect
  - proxy
  - '301'
  - '302'
---

You can mock a redirect response by constructing a valid redirect `Response` instance and returning it from the response resolver. This implies setting a redirect status code (`3xx`) and the `location` header that points to the destination URL.

```ts {3-6} /301/
http.get('/target', () => {
  return new HttpResponse(null, {
    status: 301,
    headers: {
      location: '/destination',
    },
  })
})
```

> In this example, the `GET /target` request will be redirected to `/destination`, which in this scenario is unhandled. You can define a request handler for it, too, and it will be matched as usual!
