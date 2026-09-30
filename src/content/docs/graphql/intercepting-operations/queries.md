---
order: 1
title: Queries
description: Intercepting GraphQL queries.
---

You can intercept a GraphQL query by calling `.query()` on a [GraphQL link](/api/graphql#graphql-link-url) and matching the query by its _operation name_:

```ts /api.query/ /'ListUsers'/#g
const api = graphql.link('https://api.example.com/graphql')

api.query('ListUsers', () => {
  return HttpResponse.json({
    data: {
      users: [
        { id: '1', name: 'John' },
        { id: '2', name: 'Kate' },
      ],
    },
  })
})
```

The request handler above will match the following GraphQL query made in your application:

```graphql /query/ /ListUsers/#g
query ListUsers {
  users {
    id
    name
  }
}
```

## Reading raw query

You can access the query definition sent by the client via the `query` property of the response resolver's argument:

```ts /query/2
const api = graphql.link('https://api.example.com/graphql')

api.query('ListUsers', ({ query }) => {
  console.log(query) // "query ListUsers { users { id name } }"
})
```

::: tip
  Reading the raw query is handy if you plan on resolving the mocked response
  from a different source, like a mocked GraphQL schema. You can learn more
  about that approach in the [Schema-first
  mocking](/docs/graphql/schema-first-mocking).
:::
