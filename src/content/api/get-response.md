---
order: 10
title: getResponse
description: Resolve a request against request handlers programmatically.
---

The `getResponse` function is designed for programmatic resolution of requests. You don't need this function to use MSW for development and testing. You may need this function when building custom packages and functionality on top of MSW. You may also need this function for more complex request flows, such as mocking [batched GraphQL queries](/docs/graphql/mocking-responses/query-batching).

## Call signature

```ts
import { getResponse } from 'msw'

const response = await getResponse(handlers, request)
```

## Usage

```js /getResponse/ {11}
import { http, HttpResponse } from 'msw/http'
import { getResponse } from 'msw'

const handlers = [
  http.get('http://localhost/user', () => {
    return HttpResponse.json({ name: 'John' })
  }),
]
const request = new Request('http://localhost/user')

const response = await getResponse(handlers, request)
const user = await response?.json()
// {"name":"John"}
```
