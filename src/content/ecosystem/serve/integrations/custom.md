---
order: 9999
title: Custom
description: Integrate MSW handlers into any server framework.
---

If you are using a server framework that Serve doesn't support, you can integrate your handlers into it yourself. All you need is the [`getResponse()`](/api/get-response) function from `msw`. It resolves a Fetch API request against your handlers and returns the mocked response, if any.

Below is an example of a custom middleware for an imaginary server framework that uses the Fetch API to represent requests and responses:

```ts notwoslash /getResponse/
import { createApp } from 'server-framework'
import { getResponse } from 'msw'
import { handlers } from './handlers'

function createMiddleware(...handlers) {
  return async (request, next) => {
    const response = await getResponse(handlers, request)

    if (response) {
      return response
    }

    return next()
  }
}

const app = createApp()

app.use(createMiddleware(...handlers))
app.listen(9090)
```

> If your framework doesn't use the Fetch API, translate its request to a `Request` instance before calling `getResponse()`, and translate the returned `Response` back to whatever the framework expects.

## Related materials

<PageCard
  icon="CubeTransparentIcon"
  url="/api/get-response"
  title="getResponse"
  description="Resolve a request against request handlers programmatically."
/>
