---
order: 2
title: Mutations
description: Intercepting GraphQL mutations.
---

You can intercept a GraphQL mutation by defining a `graphql.mutation()` handler for it and matching it by the _operation name_:

```ts /graphql.mutation/ /'CreateUser'/#g
graphql.mutation('CreateUser', ({ variables }) => {
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
