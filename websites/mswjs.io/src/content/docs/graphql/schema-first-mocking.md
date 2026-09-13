---
title: Schema-first mocking
keywords:
  - schema
  - graphql
  - resolver
  - dynamic
  - custom
---

When [describing GraphQL APIs](/docs/graphql/), your mock responses are always sent to the client as-is, even if they include extra properties not present in the original query or the underlying schema. While this lets you get started with a GraphQL API without defining schemas and resolvers, such behavior isn't the one exhibited by a real GraphQL server.

You can resolve intercepted GraphQL operations against a mocked GraphQL schema using the [`graphql`](https://npmjs.com/package/graphql) package. In the example below, we will also use the [`graphql.operation()`](/api/graphql#graphqloperationresolver) request handler to resolve them against the schema.

```js {2,4-13,24-33}
import { graphql, HttpResponse } from 'msw'
import { graphql as executeGraphql, buildSchema } from 'graphql'

const schema = buildSchema(`
  type User {
    id: ID!
    firstName: String!
  }

  type Query {
    user(id: ID!): User
  }
`)

const data = {
  users: [
    { id: 1, firstName: 'John' },
    { id: 2, firstName: 'Kate' },
  ]
}

export const handlers = [
  graphql.operation(async ({ query, variables }) => {
    const result = await executeGraphql({
      schema,
      source: query,
      variableValues: variables,
      rootValue: {
        user(args) {
          return data.users.find((user) => user.id === args.id)
        }
      }
    })

    return HttpResponse.json(result)
  })
]
```
