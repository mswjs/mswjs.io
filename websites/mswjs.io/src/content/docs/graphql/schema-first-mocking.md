---
title: Schema-first mocking
keywords:
  - schema
  - graphql
  - resolver
  - dynamic
  - custom
---

When [describing GraphQL APIs](/docs/graphql), the responses returned from response resolvers will be sent to the client as-is, even if they include extra properties not present in the original query. While this allows to get started with a GraphQL API without having to define schemas and resolvers, such behavior is not what one would expect from an actual GraphQL server.

You can resolve intercepted GraphQL operations against a mocked GraphQL schema using the [`graphql`](https://npmjs.com/package/graphql) package. In the example below, we will also use the [`graphql.operation()`](/docs/api/graphql#graphqloperationresolver) request handler to resolve them against the schema.

```js {2,4-13,24-33}
import { graphql } from 'msw'
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
    { id: 1, name: 'John' },
    { id: 2, name: 'Kate' },
  ]
}

export const handlers = [
  graphql.operation(({ query, variables }) => {
    const { data, errors } = await executeGraphql({
      schema,
      source: query,
      variableValues: variables,
      rootValue: {
        user(args) {
          return data.users.find((user) => user.id === args.id)
        }
      }
    })

    return HttpResponse.json({ errors, data })
  })
]
```
