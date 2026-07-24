---
order: 3
title: Handling requests
description: What you can do with the intercepted requests.
---

Once you've [intercepted a request](/docs/http/intercepting-requests), there are several things you can do with it:

- Respond to it with a mocked response;
- Let it pass through (i.e. perform it as-is);
- Do nothing (i.e. observe it passively).

Let's take a look at each of these options in more detail below.

### Mock a response

If you return a `Response` instance from the response resolver, that response will be used as the mocked response for the request. Please learn more about mocking responses on this page:

<PageCard
  icon="ServerIcon"
  url="/docs/http/mocking-responses/"
  title="Mocking responses"
  description="Declaring and using mocked responses."
/>

### Passthrough

You can perform the intercepted request as-is and return its original response (i.e. passthrough a request) by returning the result of the `passthrough()` function call.

```ts /passthrough/1 {4}
import { passthrough } from 'msw'

http.get('/resource', () => {
  return passthrough()
})
```

::: warning
  Note that passthrough requests are still _considered handled_. This means that
  once you return `passthrough()`, no other request handlers will
  affect this request, even if they match it otherwise.
:::

This is especially useful when you only want to mock a response in certain situations and perform the request as-is otherwise.

```ts {5,8}
http.get('https://api.example.com/resource', async ({ request }) => {
  const data = await request.clone().json()

  if (data?.id === 'abc-123') {
    return HttpResponse.json({ id: 'abc-123' })
  }

  return passthrough()
})
```

> Above, you can intercept a request, parse its body as JSON, and then decide whether you want to respond with a mock or perform it as-is.

### Return nothing

You can also return nothing from the response resolver, either explicitly or implicitly. If that happens, MSW will continue to look for other request handlers that might match this request. You can utilize this for network introspection or any other side effects that do not involve responding to the request.

```ts {3}
export const handlers = [
  http.get('/resource', ({ request }) => {
    console.log('Request intercepted!', request.method, request.url)
  }),
  http.get('/resource', () => {
    return HttpResponse.text('hello world')
  }),
]
```

> In this example, the first request handler will match, log the message to the console, and, since it returns nothing, finish. The second request handler will then match the same request and handle it with a mocked response, as an example.
