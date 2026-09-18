---
order: 2
title: Mutations
description: Intercepting GraphQL mutations.
---

You can intercept a GraphQL mutation by calling `.mutation()` on a [GraphQL link](/api/graphql#graphql-link-url) and matching the mutation by its _operation name_:

```ts /api.mutation/ /'CreateUser'/#g
const api = graphql.link('https://api.example.com/graphql')

api.mutation('CreateUser', ({ variables }) => {
  return HttpResponse.json({
    data: {
      createUser: {
        id: 'abc-123',
        name: variables.name,
      },
    },
  })
})
```

The request handler above will match the following GraphQL mutation made in your application:

```graphql /mutation/ /CreateUser/#g
mutation CreateUser($name: String!) {
  createUser(name: $name) {
    id
    name
  }
}
```
