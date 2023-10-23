---
order: 2
title: Structuring handlers
description: Best practices for structuring your request handlers.
keywords:
  - structure
  - file
  - folder
  - handlers
  - grouping
  - splitting
---

## Handlers structure

We recommend utilizing a single `handlers.js` module to describe the successful states (happy paths) of your network. Going success behavior-first, you always have a base request handling in addition to any runtime overrides you may add.

```js
// mocks/handlers.js
import { http, HttpResponse } from 'msw'

export const handlers = [
  http.get('/user', () => {
    return HttpResponse.json({ name: 'John Maverick' })
  }),
]
```

```js {5,21-25}
import { http } from 'msw'
import { server } from '../mocks/node'

afterEach(() => {
  server.resetHandlers()
})

// This test takes advantage of the happy path behavior
// listed in the "handlers.js", which means that requests
// to the "GET /user" endpoint always return a mocked response.
it('displays the user info', () => {
  render(<UserComponent />)
  expect(screen.getByText('John Maverick')).toBeVisible()
})

it('handles errors when fetching the user', () => {
  // This test, however, needs a reliable way to reproduce
  // a server error to test the UI. Instead of adding this
  // behavior in the "handlers.js", add a runtime override
  // so that requests to "GET /user" always return an error.
  server.use(
    http.get('/user', () => {
      return new HttpResponse(null, { status: 500 })
    })
  )

  render(<UserComponent />)
  expect(screen.getByRole('alert')).toHaveText('Error!')
})
```

> Learn more about `.use()` and [network behavior overrides](/docs/best-practices/network-behavior-overrides).

Utilize network behavior overrides to split the behavior of the same resource between its happy state (in `handlers.js`) and its on-demand states (like error responses) whenever you need them.

## Dealing with large handlers

Complex systems may have complex APIs. When mocking them, that complexity may result in a large number of request handlers present at the same time. Here's a couple of ways how you can to handle large network descriptions.

### Group request handlers

Similar to how all server-side behaviors for the same resource don't have to live in a single request handler, all network descriptions for different areas of your product don't have to be written in a single `handlers` array.

Instead, consider splitting them on the file system level, grouping them by domain, and composing the list of handlers later.

```txt
mocks/
  handlers/
    user.js
    checkout.js
    index.js
```

```js
// mocks/handlers/user.js
import { http } from 'msw'

// These request handlers focus on the endpoints
// that concern the user.
export const handlers = [
  http.get('/user', getUserResolver),
  http.post('/login', loginResolver),
  http.delete('/user/:userId', deleteUserResolver),
]
```

```js {2-3,8}
// mocks/handlers/index.js
import { handlers as userHandlers } from './user'
import { handlers as checkoutHandlers } from './checkout'

// The root-level request handlers combine
// all the domain-based handlers into a single
// network description array.
export const handlers = [...userHandlers, ...checkoutHandlers]
```

Grouping the request handlers can also be beneficial in large test suites as you can apply only a subset of handlers during a particular test.

```js
// test/user/login.test.js
import { server } from '../../mocks/node'
import { handlers as userHandlers } from '../../mocks/handlers/user'

server.use(...userHandlers)
```

> To take the full advantage of domain-based request handlers, you may consider calling `setupServer()` without any base request handlers.

### Abstract repeated logic

As the first step, we recommend abstracting the repetitive logic into utility functions that you can then reuse across different request handlers.

```js /utilOne/ /utilTwo/ {6,9}
import { http } from 'msw'
import { utilOne, utilTwo } from './utils'

export const handlers = [
  http.get('/user', async ({ request }) => {
    const result = await utilOne(request)
  }),
  http.post('/login', () => {
    utilTwo()
  }),
]
```

For more complex scenarios, you can introduce [higher-order response resolvers](/docs/recipes/higher-order-resolver) that encapsulate multiple parts of request handling logic at once.

```js /withAuth/1,3,4 {5-6}
import { http, HttpResponse } from 'msw'
import { withAuth } from './withAuth'

export const handlers = [
  http.get('/cart', withAuth(getCartResolver)),
  http.post('/checkout/:cartId', withAuth(addToCartResolver)),
]
```
