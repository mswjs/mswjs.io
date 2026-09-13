---
title: Query batching
description: Intercept and mock batched GraphQL queries.
keywords:
  - batch
  - batched
  - batching
  - query
  - graphql
  - apollo
  - batched-execute
---

Query batching is a performance mechanism provided by some GraphQL clients to optimize the number of operations made by grouping them together in a single query. While this feature has its practical benefits, query batching is not a part of the [GraphQL specification](https://spec.graphql.org/) (nor the [GraphQL-over-HTTP specification](https://graphql.github.io/graphql-over-http/)), lacking any standard consensus on the syntax and behavior of batched queries. Because of this, MSW does not provide a built-in way of handling such queries.

We highly recommend implementing the support for batched GraphQL queries as a part of your MSW setup. Below, you can find a couple of examples of how to achieve that.

## General knowledge

At its core, mocking a batched GraphQL query comes down to the following steps:

1. Intercept the batched GraphQL query;
1. Unwrap the batched query into individual GraphQL queries;
1. Resolve the individual queries against the existing request handlers;
1. Compose the batched response.

## Apollo

Apollo provides [Query batching](https://www.apollographql.com/docs/router/executing-operations/query-batching/) by sending multiple operations in a single `POST` request whose body is an array of regular GraphQL request envelopes (`operationName`, `query`, and `variables`):

```json
[
  {
    "operationName": "GetUser",
    "query": "query GetUser($id: ID!) { user(id: $id) { id name } }",
    "variables": { "id": "abc-123" }
  },
  {
    "operationName": "GetProduct",
    "query": "query GetProduct($id: ID!) { product(id: $id) { name } }",
    "variables": { "id": "hoover-2000" }
  },
  {
    "operationName": "GetCart",
    "query": "query GetCart { cart { total } }"
  }
]
```

The response to a batched query is an array of regular GraphQL responses in the same order. Each entry can carry its own `data` and `errors`:

```json
[
  { "data": { "user": { "id": "abc-123", "name": "John" } } },
  { "errors": [{ "message": "Product \"hoover-2000\" not found" }] },
  { "data": { "cart": { "total": 42 } } }
]
```

You can mock batched GraphQL queries in Apollo by introducing a custom `batchedGraphQLQuery` higher-order request handler that intercepts such batched queries, unwraps them into individual requests, and resolves those against any given list of request handlers using the [`getResponse`](/api/get-response) function from `msw`. Operations that no request handler mocks are performed against the original server as-is.

```js
import { http, HttpResponse, getResponse, bypass } from 'msw'

export function batchedGraphQLQuery(url, handlers) {
  return http.post(url, async ({ request }) => {
    // Read the body from a clone so the original request
    // can still be used to construct the individual requests.
    const payload = await request.clone().json()

    // Ignore non-batched GraphQL queries.
    if (!Array.isArray(payload)) {
      return
    }

    const results = await Promise.all(
      payload.map(async (operation) => {
        // Construct an individual request to the same URL
        // with a single operation (query, variables) as its body.
        const operationRequest = new Request(request, {
          body: JSON.stringify(operation),
        })

        // Resolve the individual request against
        // the list of request handlers you provide.
        const mockedResponse = await getResponse(handlers, operationRequest)

        // Use the mocked response, if found. Otherwise, perform
        // the individual operation against the original server as-is.
        const response =
          mockedResponse || (await fetch(bypass(operationRequest)))

        // Each entry keeps its own "data" and "errors".
        return response.json()
      }),
    )

    return HttpResponse.json(results)
  })
}
```

Then, use the `batchedGraphQLQuery` function in your request handlers:

```ts {2,27} /batchedGraphQLQuery/1,3
import { graphql, HttpResponse } from 'msw'
import { batchedGraphQLQuery } from './batchedGraphQLQuery'

const graphqlHandlers = [
  // The variables of each batched operation are
  // available to its request handler as usual.
  graphql.query('GetUser', ({ variables }) => {
    return HttpResponse.json({
      data: {
        user: { id: variables.id, name: 'John' },
      },
    })
  }),
  // Mocked errors end up in the respective entry
  // of the batched response.
  graphql.query('GetProduct', ({ variables }) => {
    return HttpResponse.json({
      errors: [{ message: `Product "${variables.id}" not found` }],
    })
  }),
  // The "GetCart" operation has no request handler,
  // so it is performed against the original server.
]

export const handlers = [
  batchedGraphQLQuery('/graphql', graphqlHandlers),
  ...graphqlHandlers,
]
```

## `batched-execute`

The `batched-execute` package provides [Query batching](https://the-guild.dev/graphql/stitching/handbook/appendices/batching-arrays-and-queries) by hoisting multiple operations on a single query and achieving grouping by using field aliases.

```graphql
query {
  user_0: user {
    id
  }
  product_0: product {
    name
  }
}
```

The client then remaps the field aliases to the original operations, producing a flat response object.

You can mock batched GraphQL queries in `batched-execute` by introducing a custom `batchedGraphQLQuery` higher-order request handler that intercepts such batched queries and resolves them against a _mocked schema_. We recommend schema-first API mocking in this case to support anonymous queries.

```js
import {
  buildSchema,
  print,
  graphql as executeGraphQL,
  defaultFieldResolver,
} from 'graphql'
import { http, HttpResponse, bypass } from 'msw'

// Describe the GraphQL schema.
// You can also use an existing schema!
const schema = buildSchema(`
type User {
  id: ID!
}

type Query {
  user: User
}
`)

function batchedGraphQLQuery(url) {
  return http.post(url, async ({ request }) => {
    // Read the body from a clone so the original request
    // can still be used to proxy the unknown fields.
    const payload = await request.clone().json()

    // Resolve the intercepted GraphQL batched query
    // against the mocked GraphQL schema.
    const result = await executeGraphQL({
      source: payload.query,
      variableValues: payload.variables,
      operationName: payload.operationName,
      schema,
      rootValue: {
        // Mock individual queries, fields, and types.
        user: () => ({ id: 'abc-123' }),
      },
      async fieldResolver(source, args, context, info) {
        // Resolve the known fields from the "rootValue".
        if (source[info.fieldName]) {
          return defaultFieldResolver(source, args, context, info)
        }

        // Proxy the unknown fields to the actual GraphQL server.
        // Printing the field nodes preserves their aliases.
        const compiledQuery = info.fieldNodes
          .map((node) => print(node))
          .join('\n')

        const query = `${info.operation.operation} { ${compiledQuery} }`
        const queryRequest = new Request(request, {
          body: JSON.stringify({ query }),
        })
        const response = await fetch(bypass(queryRequest))
        const { errors, data } = await response.json()

        // Surface the original server errors for this field.
        // GraphQL reports them in the "errors" of the result.
        if (errors?.length) {
          throw new Error(errors[0].message)
        }

        // The server responds by the field alias (e.g. "product_0"),
        // which is the key of this field in the response path.
        return data[info.path.key]
      },
    })

    return HttpResponse.json(result)
  })
}
```
