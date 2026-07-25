---
order: 8
title: Response timing
description: Control server response time.
keywords:
  - delay
  - latency
  - timing
  - timeout
  - pause
---

You can control the server response time when handling intercepted requests using the [`delay()`](/api/delay) function from MSW. Under the hood, the `delay()` function returns a promise that resolves after a certain amount of time.

```ts {4} /delay/
import { http, HttpResponse, delay } from 'msw'

http.get('/resource', async () => {
  await delay(500)
  return HttpResponse.json({ id: 'abc-123' })
})
```

> Here, the `GET /resource` request will take at least 500ms to respond with the given mocked response. Remember that the response resolver evaluation time isn't the only factor that affects the response timing.

Learn more about using the `delay()` API, its default behavior, and the delay modes it supports:

<PageCard
  icon="CubeTransparentIcon"
  url="/api/delay"
  title="delay()"
  description="API reference for the `delay` function."
/>

## Stream latency

You can use `delay()` anywhere during the response resolution, including in-between the streamed chunks if [responding with a stream](/docs/http/mocking-responses/streaming):

```ts {5,7}
http.get('/stream', () => {
  const stream = new ReadableStream({
    async start(controller) {
      controller.enqueue(new TextEncoder().encode('hello'))
      await delay(200)
      controller.enqueue(new TextEncoder().encode('world'))
      await delay(300)
      controller.close()
    },
  })

  return new HttpResponse(stream, { ... })
})
```

## Global delay

Sometimes you might want to introduce a delay that affects _all requests_. There are a few ways you can achieve that.

### Option 1: Delay fallthrough handler

Take advantage of the request handler execution order and introduce a request handler that does nothing but awaits a delay _before_ any other handlers:

```ts {2-4}
export const handlers = [
  http.all('*', async () => {
    await delay(500)
  }),

  // ...other request handlers.
]
```

### Option 2: Higher-order resolver

Another option would be to define a _higher-order response resolver_ that encapsulates the delay logic and applies it selectively to some response resolvers.

::: code-group

```ts [with-delay.ts] {5-7}
import { delay, type HttpResponseResolver } from 'msw'

export async function withDelay(resolver: HttpResponseResolver) {
  return async (...args) => {
    // Provide no arguments to the `delay` function
    // to apply a random realistic response time.
    await delay()
    return resolver(...args)
  }
}
```

:::

::: code-group

```ts [handlers.ts] {6,12} /withDelay/2,3
import { withDelay } from './with-delay'

export const handlers = [
  http.get(
    '/user',
    withDelay(({ request }) => {
      return HttpResponse.json({ id: 'abc-123' })
    }),
  ),
  http.post(
    '/cart/:cartId',
    withDelay(() => {
      return new HttpResponse(null, { status: 201 })
    }),
  ),
  http.get('/products', () => {
    return HttpResponse.json([1, 2, 3])
  }),
]
```

:::
