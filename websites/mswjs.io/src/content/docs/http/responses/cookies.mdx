---
order: 4
title: Cookies
description: Mocking response cookies.
keywords:
  - cookie
  - set-cookie
  - response
  - auth
  - authentication
---

Mocking response cookies using the direct Fetch API `Response` instance proves problematic because the `Set-Cookie` header is one of the [forbidden headers](https://developer.mozilla.org/en-US/docs/Glossary/Forbidden_header_name) that cannot be set. MSW circumvents this limitation in its `HttpResponse` class to allow you to mock response cookies without compromising your response's integrity and security.

```ts {7}
http.post('/login', () => {
  return new HttpResponse(null, {
    headers: {
      // Setting the "Set-Cookie" header on the mocked response
      // will set the cookies on the `document` as if they were
      // received from the server.
      'set-cookie': 'authToken=abc-123',
    },
  })
})
```

> We recommend you use third-party cookie serialization libraries, like [`cookie`](https://www.npmjs.com/package/cookie), to work with your mocked cookies, set their path, expiration date, domain, etc.
