---
title: Request cookies
description: Read request cookies.
keywords:
  - cookie
  - cookies
  - auth
  - authentication
---

You can read the request's cookies via the `cookies` object provided to you in the response resolver argument. While you can always read the `request.headers.get('cookie')` manually, the `cookie` object parses request cookies for you for convenience.

```ts /cookies/ {2}
http.get('/api/user', ({ cookies }) => {
  if (!cookies.authToken) {
    return new HttpResponse(null, { status: 403 })
  }

  return HttpResponse.json({ name: 'John' })
})
```

> MSW uses a third-party cookie parsing package that parses cookies per the HTTP Cookie specification.
