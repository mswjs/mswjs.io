---
order: 4
title: graphql
description: Intercept GraphQL API requests.
keywords:
  - graphql
  - handler
  - namespace
  - link
---

The `graphql` namespace helps you create request handlers to intercept requests to a GraphQL API.

## Call signature

GraphQL mocking is _link-first_: you start by creating a link to the GraphQL endpoint you wish to mock with `graphql.link()`, and then define handlers for the operations against that endpoint on the returned link.

```ts /graphql.link/ {4}
import { HttpResponse } from 'msw/http'
import { graphql } from 'msw/graphql'

const api = graphql.link('https://api.example.com/graphql')

api.query('GetUser', ({ query, variables }) => {
  return HttpResponse.json({
    data: {
      user: { name: 'John' },
    },
  })
})
```

## `graphql.link(url)`

The `.link()` method creates a _GraphQL link_ that intercepts GraphQL operations scoped to the provided endpoint. The `url` argument accepts the same [request predicates](/docs/http/intercepting-requests/) as the `http` handlers, including absolute and relative URLs, path parameters, wildcards, and regular expressions.

```js {4,5,8,18}
import { HttpResponse } from 'msw/http'
import { graphql } from 'msw/graphql'

const github = graphql.link('https://api.github.com/graphql')
const stripe = graphql.link('https://api.stripe.com/graphql')

export const handlers = [
  github.query('GetPayment', () => {
    return HttpResponse.json({
      data: {
        payment: {
          id: 'e16fded7-64eb-4b69-b4bd-5345507a5a92',
          issuer: { login: 'octocat' },
        },
      },
    })
  }),
  stripe.query('GetPayment', () => {
    return HttpResponse.json({
      errors: [{ message: 'Cannot process payment' }],
    })
  }),
]
```

> Although the name of the `GetPayment` query is the same, it will be handled differently depending on the requested endpoint.

The link contains keys that represent GraphQL operation types (e.g. "query", "mutation", "subscription") as well as a special `.operation()` method to intercept any GraphQL operation.

### `.query(queryName, resolver)`

```js /GetUser/ {4}
import { HttpResponse } from 'msw/http'
import { graphql } from 'msw/graphql'

const api = graphql.link('https://api.example.com/graphql')

export const handlers = [
  api.query('GetUser', ({ query, variables }) => {
    const { userId } = variables

    return HttpResponse.json({
      data: {
        user: {
          name: 'John',
        },
      },
    })
  }),
]
```

The handler above will intercept and mock the response to the following GraphQL query:

```graphql /GetUser/1
query GetUser($userId: String!) {
  user(id: $userId) {
    name
  }
}
```

The `queryName` argument can also be a [`TypedDocumentNode`](https://the-guild.dev/blog/typed-document-node) instance. This means you can pass the generated document types based on your GraphQL operations directly to MSW when using tools like [GraphQL Code Generator](https://the-guild.dev/graphql/codegen).

```js /GetUserDocument/
import { HttpResponse } from 'msw/http'
import { graphql } from 'msw/graphql'
import { GetUserDocument } from './generated/types'

const api = graphql.link('https://api.example.com/graphql')

api.query(GetUserDocument, ({ query, variables }) => {
  return HttpResponse.json({
    data: {
      user: {
        id: '75a22f38-c27c-4684-9bdf-d4b16435af1a',
        name: 'John',
      },
    },
  })
})
```

> MSW will infer the query and variable types from the given document node.

### `.mutation(mutationName, resolver)`

```js /CreateUser/ {4}
import { HttpResponse } from 'msw/http'
import { graphql } from 'msw/graphql'

const api = graphql.link('https://api.example.com/graphql')

export const handlers = [
  api.mutation('CreateUser', ({ query, variables }) => {
    const { input } = variables

    return HttpResponse.json({
      data: {
        user: {
          name: input.name,
        },
      },
    })
  }),
]
```

The handler above will intercept and mock the response to the following GraphQL mutation:

```graphql /CreateUser/1
mutation CreateUser($userInput: CreateUserInput!) {
  createUser(input: $userInput) {
    name
  }
}
```

The `mutationName` argument can also be a [`TypedDocumentNode`](https://the-guild.dev/blog/typed-document-node) instance. This means you can pass the generated document types based on your GraphQL operations directly to MSW when using tools like [GraphQL Code Generator](https://the-guild.dev/graphql/codegen).

```js /CreateUserDocument/
import { HttpResponse } from 'msw/http'
import { graphql } from 'msw/graphql'
import { CreateUserDocument } from './generated/types'

const api = graphql.link('https://api.example.com/graphql')

api.mutation(CreateUserDocument, ({ variables }) => {
  return HttpResponse.json({
    data: {
      user: {
        name: variables.input.name,
      },
    },
  })
})
```

### `.subscription(subscriptionName, resolver)`

```js /OnCommentAdded/ {3}
import { graphql } from 'msw/graphql'

const api = graphql.link('https://api.example.com/graphql')

export const handlers = [
  api.subscription('OnCommentAdded', ({ subscription }) => {
    const { postId } = subscription.variables

    subscription.publish({
      data: {
        commentAdded: {
          text: 'Hello world!',
        },
      },
    })
  }),
]
```

The handler above will intercept and publish the data to the following GraphQL subscription:

```graphql /OnCommentAdded/1
subscription OnCommentAdded($postId: ID!) {
  commentAdded(postId: $postId) {
    text
  }
}
```

> Only GraphQL subscriptions using the WebSocket protocol are supported.

The `subscriptionName` argument can also be a [`TypedDocumentNode`](https://the-guild.dev/blog/typed-document-node) instance. This means you can pass the generated document types based on your GraphQL operations directly to MSW when using tools like [GraphQL Code Generator](https://the-guild.dev/graphql/codegen).

```js /OnCommentAddedDocument/
import { graphql } from 'msw/graphql'
import { OnCommentAddedDocument } from './generated/types'

const api = graphql.link('https://api.example.com/graphql')

api.subscription(OnCommentAddedDocument, ({ subscription }) => {
  subscription.publish({
    data: {
      commentAdded: {
        text: 'Hello world!',
      },
    },
  })
})
```

Unlike the other link methods, the subscription resolver does not return a response. Instead, you handle the intercepted subscription imperatively through the `subscription` object. The subscription resolver has the following keys in its argument object:

| Name            | Type                                                                  | Description                                                              |
| --------------- | --------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| `subscription`  | [`GraphQLSubscription`](#graphqlsubscription)                         | Intercepted GraphQL subscription.                                        |
| `operationName` | `string`                                                              | Operation name (e.g. `OnCommentAdded`).                                  |
| `request`       | [`Request`](https://developer.mozilla.org/en-US/docs/Web/API/Request) | Request that established the WebSocket connection for this subscription. |
| `params`        | `object`                                                              | Path parameters parsed from the WebSocket connection URL.                |
| `finalize`      | `Function`                                                            | Schedules a cleanup to run once this subscription ends.                  |

#### `GraphQLSubscription`

The `GraphQLSubscription` object represents a single intercepted GraphQL subscription. A client can run multiple subscriptions over the same WebSocket connection, and each of them gets its own `GraphQLSubscription` instance. You use this object to read the details of the subscription sent by the client and to control it from the server's perspective: publish data, error, complete, or pass it through to the original server.

It has the following properties:

| Name         | Type                      | Description                               |
| ------------ | ------------------------- | ----------------------------------------- |
| `id`         | `string`                  | A unique ID of the subscription.          |
| `query`      | `string`                  | Raw subscription query string.            |
| `variables`  | `object`                  | Variables sent with this subscription.    |
| `extensions` | `Record<string, unknown>` | Any extensions used by this subscription. |

##### `.publish(payload)`

Publishes the given execution result to the subscribed client. The `payload` argument is an object with the optional `data`, `errors`, and `extensions` keys.

```js {2-8}
api.subscription('OnCommentAdded', ({ subscription }) => {
  subscription.publish({
    data: {
      commentAdded: {
        text: 'Hello world!',
      },
    },
  })
})
```

##### `.from(source)`

Uses the given `Iterable` or `AsyncIterable` as the source of data for this subscription. Every value yielded by the source is published to the subscription as the `data` of the payload.

```js {2-5}
api.subscription('OnCommentAdded', ({ subscription }) => {
  subscription.from(async function* () {
    yield { commentAdded: { text: 'First' } }
    yield { commentAdded: { text: 'Second' } }
  })
})
```

##### `.error(errors)`

Terminates this subscription with the given list of GraphQL errors.

```js {2}
api.subscription('OnCommentAdded', ({ subscription }) => {
  subscription.error([{ message: 'Unprocessable entry' }])
})
```

##### `.complete()`

Marks this subscription as complete.

```js {2}
api.subscription('OnCommentAdded', ({ subscription }) => {
  subscription.complete()
})
```

##### `.passthrough()`

Performs this subscription as-is against the original server and forwards the server payloads to the client. Returns a passthrough subscription object that you can use to listen to the original server events (`connection_ack`, `next`, `error`, `complete`) via `.addEventListener()`, and to stop the original subscription via `.unsubscribe()`.

```js {2,4-8}
api.subscription('OnCommentAdded', ({ subscription }) => {
  const onCommentAddedSubscription = subscription.passthrough()

  onCommentAddedSubscription.addEventListener('next', (event) => {
    // Prevent the default server-to-client forwarding.
    event.preventDefault()
    subscription.publish(event.data.payload)
  })
})
```

### `.operation(resolver)`

The `.operation()` method intercepts all GraphQL operations against the linked endpoint regardless of their type and name. It's designed to cover the following scenarios:

- Handling of anonymous GraphQL operations;
- Resolving any outgoing GraphQL operations against a [mock GraphQL schema](/docs/graphql/schema-first-mocking).

```js {4}
import { HttpResponse } from 'msw/http'
import { graphql } from 'msw/graphql'

const api = graphql.link('https://api.example.com/graphql')

export const handlers = [
  api.operation(({ query, variables }) => {
    // Intercept all GraphQL operations and respond
    // to them with the error response.
    return HttpResponse.json({
      errors: [{ message: 'Request failed' }],
    })
  }),
]
```

## Resolver argument

The response resolver function for the `.query()`, `.mutation()`, and `.operation()` link methods has the following keys in its argument object:

| Name            | Type                                                                  | Description                                                    |
| --------------- | --------------------------------------------------------------------- | -------------------------------------------------------------- |
| `query`         | `object`                                                              | GraphQL query sent from the client.                            |
| `variables`     | `object`                                                              | Variables of this GraphQL query.                               |
| `operationName` | `string`                                                              | Operation name (e.g. `GetUser`).                               |
| `request`       | [`Request`](https://developer.mozilla.org/en-US/docs/Web/API/Request) | Entire request reference.                                      |
| `cookies`       | `object`                                                              | Request's [cookies](/docs/http/intercepting-requests/cookies). |

You access these arguments on the response resolver argument object.

```js
api.query('GetUser', ({ query, variables, operationName, request }) => {})
```

## Handler options

All link methods accept an optional third argument representing request handler options. See below for the list of supported properties on that options object.

### `once`

- `boolean`

If set to `true`, marks this request handler as used after the first successful match. Used request handlers have no effect on the outgoing traffic and will be ignored during request interception.

```js {11}
api.query(
  'GetUser',
  () => {
    return HttpResponse.json({
      data: {
        user: { name: 'John' },
      },
    })
  },
  {
    once: true,
  },
)
```

> Use the `.restoreHandlers()` method on the `worker`/`server` instance to mark all used request handlers as unused.

## Related materials

<PageCard
  icon="GraphQLIcon"
  url="/docs/graphql/"
  title="Describing GraphQL API"
  description="Learn about describing GraphQL APIs."
/>
