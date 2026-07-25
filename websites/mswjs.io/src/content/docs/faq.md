---
order: 9999
title: FAQ
description: Common questions about Mock Service Worker.
keywords:
  - faq
  - questions
  - common
  - stale
  - cache
---

::: info
Have a question not present in the list? Open a [Discussion](https://github.com/mswjs/msw/discussions/new) on GitHub and get help from our community.
:::

## How is it different than library XYZ?

Please see the [Comparison page](/docs/comparison) for detailed technical and conceptual comparison between Mock Service Worker and other popular API mocking libraries.

In a nutshell, most solutions provide requests interception on the application level, while Mock Service Worker intercepts requests on the network level. It also allows you to use the same mock definition not only for testing, but for development and debugging as well, integrating across different tools without configurations, adapters, or plugins.

## Does it support request library XYZ?

Yes. Mock Service Worker supports **all request libraries**, both existing and those about to be released in the future. This is one of the benefits you get by mocking your API at the network level.

## Can I use it in Node.js?

Yes. Although there's no Service Worker in Node.js, MSW provides you with a designated API to reuse the same request handlers in Node.js. Follow the integration below to learn how to use MSW in Node.js:

<PageCard
  icon="CommandLineIcon"
  url="/guides/integrations/node"
  title="Node.js integration"
  description="Learn how to integrate Mock Service Worker in any Node.js process."
/>

## Can I use it in React Native?

Yes, you can use MSW while developing and testing your React Native application. The setup would be similar to that in Node.js, and you can learn more about it following this guide:

<PageCard
  icon="DevicePhoneMobileIcon"
  url="/guides/integrations/node"
  title="Node.js integration"
  description="Learn how to integrate Mock Service Worker in a Node.js process."
/>

## ReferenceError: `fetch` is not defined in Node.js

This error means that the version of Node.js you're using doesn't support the global Fetch API.

Resolve this by upgrading to Node.js version 18 or higher. MSW does not support Node.js versions below version 18.

## `Request`/`Response`/`TextEncoder` is not defined (Jest)

<!--@include: ./shared/jest-missing-globals.md-->

## Why should I drop query parameters from the request handler URL?

Query parameters do not describe RESTful resources. Instead, they provide additional _data_ to the server. Query parameters will be automatically stripped by MSW during the request matching and will have no effect.

It's easier to understand this by thinking of request handlers as server-side route handlers: you do not include query parameters when routing on the server, so neither should you when routing with MSW.

Note that you can access query parameters in the request handler by using the `URL` API:

```js
// Describe the resource path: "/post".
http.get('/post', ({ request }) => {
  // Convert the request URL string to a URL instance
  // so the browser would parse query parameters for you.
  const url = new URL(request.url)

  // Access the query parameters from the URL instance.
  // For example: GET /post/id=abc-123 → id: "abc-123"
  const id = url.searchParams.get('id')

  return HttpResponse.json({
    id,
    title: 'The Empowering Limitation',
  })
})
```

## Why do I get stale responses with react-query/SWR/Apollo/etc.?

Caching mechanism of some request clients may produce stale responses in your tests. Make sure you clear the cache before/after each test suite for your tests to remain predictable.

### react-query

```js
import { QueryCache } from 'react-query'

const queryCache = new QueryCache()

afterEach(() => {
  queryCache.clear()
})
```

### SWR

```js
import { cache } from 'swr'

beforeEach(() => {
  cache.clear()
})
```

### Apollo Client

The Apollo Client team recommends creating a new client instance for each test.

::: code-group

```js [src/apollo-client.js] {7-12}
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'

const httpLink = new HttpLink({
  uri: 'https://example.com/graphql',
})

export function makeClient() {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: httpLink,
  })
}
```

:::

::: code-group

```js [test/Component.test.jsx] /makeClient/
import { makeClient } from '../src/apollo-client'

it('renders the component', async () => {
  const client = makeClient()
  // ...use your client in test.
})
```

:::

> Learn more in the [Apollo Client documentation](https://www.apollographql.com/docs/react/development-testing/schema-driven-testing/#should-i-share-a-single-apolloclient-instance-between-tests).

## Light theme when?

Whenever you have time to [open a pull request](https://github.com/mswjs/mswjs.io).

## MSW doesn't work in concurrent tests

If your test suite features multiple concurrent test that modify the network behavior (i.e. have `.use()` calls), you must scope the network to each test by using the `server.boundary()` API.

<PageCard
  icon="CubeTransparentIcon"
  url="/api/setup-server/boundary"
  title="server.boundary()"
  description="Scope the network interception to the given boundary."
/>

::: warning
  You can only use `server.boundary()` with `setupServer()`. Browser tests do
  not suffer from concurrency issues because the client runtime provides the
  network isolation automatically.
:::
