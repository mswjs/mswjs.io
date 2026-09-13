---
order: 8
title: passthrough
description: Handle the intercepted request by performing it as-is.
keywords:
  - as-is
  - request
  - perform
  - passthrough
---

## Call signature

```ts
import { http, passthrough } from 'msw'

http.get('/resource', () => {
  return passthrough()
})
```

## Usage

```js /passthrough/ {6}
import { http, passthrough, HttpResponse } from 'msw'

export const handlers = [
  http.get('/resource', ({ request }) => {
    if (request.headers.has('x-my-header')) {
      return passthrough()
    }

    return HttpResponse.text('Mocked response')
  }),
]
```

Unlike [`bypass()`](/api/bypass), the `passthrough()` function _does not result in an additional request_, and is designed to explicitly pass through an intercepted request within the response resolver. Because of this, the `passthrough()` function cannot be used to perform an additional request, only to handle an already intercepted one.

## Related materials

<PageCard
  icon="CubeTransparentIcon"
  url="/api/bypass"
  title="bypass"
  description="Perform an additional request outside of the interception algorithm."
/>
