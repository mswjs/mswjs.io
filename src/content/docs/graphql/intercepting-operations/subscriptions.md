---
order: 3
title: Subscriptions
description: Intercepting GraphQL subscriptions.
---

::: warning
Only GraphQL subscriptions using the WebSocket protocol are supported.
:::

You can intercept a GraphQL subscription by calling `.subscription()` on a [GraphQL link](/api/graphql#graphql-link-url) and matching the subscription by its _operation name_:

```ts /api.subscription/ /'OnCreateMessage'/#g
const api = graphql.link('https://api.example.com/graphql')

api.subscription('OnCreateMessage', ({ subscription }) => {
  subscription.publish({
    data: {
      messageCreated: {
        content: 'Welcome, subscriptions!',
        createdAt: Date.now(),
      },
    },
  })
})
```

The handler above will match the following GraphQL subscription in your app:

```graphql /subscription/ /OnCreateMessage/#g
subscription OnCreateMessage {
  messageCreated {
    content
    createdAt
  }
}
```

## API reference

<PageCard
  icon="CubeTransparentIcon"
  url="/api/graphql#subscriptionsubscriptionname-resolver"
  title="api.subscription(subscriptionName, resolver)"
  description="The `api.subscription()` API reference."
/>

## Reading subscription data

The `subscription` object exposes more details about the intercepted GraphQL subscription, such as its ID, query, and variables.

<PageCard
  icon="CubeTransparentIcon"
  url="/api/graphql#graphqlsubscription"
  title="GraphQLSubscription"
  description="The `GraphQLSubscription` API reference."
/>

```ts
import { graphql } from 'msw/graphql'

const api = graphql.link('https://api.example.com/graphql')

interface OnCommentAddedQuery {
  commentAdded: { text: string }
}

interface OnCommentAddedVariables {
  userId: string
}

api.subscription<OnCommentAddedQuery, OnCommentAddedVariables>(
  'OnCommentAdded',
  ({ subscription }) => {
    // 👇 Hover these, they are interactive!
    subscription.id
    subscription.query
    subscription.variables
  },
)
```

::: info
Note that the `OnCommentAddedQuery` type argument is used to annotate `subscription.publish()`, not `subscription.query`. Queries are always represented as plain strings so you can pass them to a mock GraphQL server if you prefer [schema-first mocking](/docs/graphql/schema-first-mocking).
:::

## Publishing data

You can publish data to the intercepted GraphQL subscription by calling `subscription.publish()` with a payload.

```ts {10}
import { graphql } from 'msw/graphql'

const api = graphql.link('https://api.example.com/graphql')

interface OnCommentAddedQuery {
  commentAdded: { text: string }
}

api.subscription<OnCommentAddedQuery>('OnCommentAdded', ({ subscription }) => {
  subscription.publish({ data: { commentAdded: { text: 'Hello world!' } } })
})
```

### Custom subscription source

You can provide any iterable, including `AsyncIterable`, as the source of data to automatically publish to the intercepted subscription using the `subscription.from()`. Any data yielded by an iterable is translated to `subscription.publish()` automatically.

```ts {8-11}
import { graphql } from 'msw/graphql'
import { delay } from 'msw/utils/delay'

const api = graphql.link('https://api.example.com/graphql')

export const handlers = [
  api.subscription('OnCommentAdded', ({ subscription }) => {
    subscription.from(async function* () {
      yield { commentAdded: { text: 'First' } }
      yield { commentAdded: { text: 'Second' } }
    })
  }),
]
```

### Cross-handler publish

Much like on a real server, you can trigger a publish to a subscription from a different handler. For example, here's how to publish a new `OnCommentAdded` data on the intercepted GraphQL subscription from a mutation:

```ts {15,21-23}
import { createPubSub } from 'graphql-yoga'
import { graphql } from 'msw/graphql'
import { HttpResponse } from 'msw/http'

// Use a third-party pubsub system or build your own.
const pubsub = createPubSub<{
  commentAdded: [{ commentAdded: { text: string } }]
}>()

const api = graphql.link('https://api.example.com/graphql')

const handlers = [
  api.subscription('OnCommentAdded', ({ subscription }) => {
    // Create a custom iterable source for this subscription.
    subscription.from(pubsub.subscribe('commentAdded'))
  }),
  api.mutation('AddComment', ({ variables }) => {
    const { comment } = variables

    // Publish to the pubsub from anywhere!
    pubsub.publish('commentAdded', {
      commentAdded: comment,
    })

    // Regular mutation response.
    return HttpResponse.json({
      data: { comment },
    })
  }),
]
```

## Erroring the subscription

You can error the intercepted subscription via `subscription.error()`, providing an array of GraphQL errors as the reason.

```ts {2}
api.subscription('OnCommentAdded', ({ subscription }) => {
  subscription.error([{ message: 'Unprocessable entry' }])
})
```

## Completing the subscription

You can mark the intercepted GraphQL subscription as complete, thus triggering the default unsubscribe behavior from the subscribed clients, by calling `subscription.complete()` at any point in your handler.

```ts {3}
api.subscription('OnCommentAdded', ({ subscription, finalize }) => {
  let timer = setTimeout(() => {
    subscription.complete()
  }, 2500)
  finalize(() => clearTimeout(timer))
})
```

## Pass through the subscription

You can perform the intercepted GraphQL subscription as-is by calling `subscription.passthrough()` in your handler. In return, you will get a passthrough subscription representation where you can observe the incoming events from the real server, prevent their forwarding, implement payload-patching, etc.

```ts
api.subscription('OnCommentAdded', async ({ subscription }) => {
  // Establish a subscription to the real server.
  const onCommentAddedSubscription = subscription.passthrough()

  // Listen to the payload sent from the server.
  onCommentAddedSubscription.addEventListener('next', (event) => {
    // Prevent the default server-to-client forwarding.
    event.preventDefault()

    // Modify the server payload and publish onto the subscription.
    const { payload } = event.data
    payload.data.commentAdded.text = 'Hello world!'
    subscription.publish(payload)

    // Unsubscribe from the passthrough subscription at any time.
    onCommentAddedSubscription.unsubscribe()
  })
})
```

::: tip
Event forwarding for GraphQL subscriptions follows the same rules as the [event forwarding for WebSocket connections](/docs/websocket/#important-defaults) since subscriptions use the WebSocket protocol under the hood.
:::
