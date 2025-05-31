---
order: 1
title: Errors
description: Mock GraphQL error responses.
---

You can mock a GraphQL error response by including the `error` key in the response object. Make sure your mocked error responses abide by the [GraphQL specification](https://spec.graphql.org/October2021/#sec-Errors) so your client can process them as expected.

## Request errors

A response that only contains the `errors` key and no `data` usually indicates a [request error](https://spec.graphql.org/October2021/#sec-Errors.Request-errors).

```ts {4-6}
api.query<User>('GetUser', () => {
  return HttpResponse.json({
    errors: [
      {
        message: 'Simulated client error',
      },
    ],
  })
})
```

## Field errors

When mocking [field errors](https://spec.graphql.org/October2021/#sec-Errors.Field-errors), make sure to include the `locations` and `path` property alongside the error `message` to form a correct field error response. You can combine field errors with partial responses, too.

```ts {4-8}
api.query<User, { id: string }>('GetUser', ({ variables }) => {
  return HttpResponse.json({
    errors: [
      {
        message: `Name for user with ID ${variables.id} could not be fetched.`,
        locations: [{ line: 4, column: 5 }],
        path: ['user', 'name'],
      },
    ],
    data: {
      user: {
        id: variables.id,
      },
    },
  })
})
```

> You can also include the `extensions` property in your mocked errors.

The request handler above responds to the `GetUser` query with partial data (`user.id`) and returns an error for the missing field `user.name`. It derives its `locations` and `path` from the query itself:

```graphql {4} /name/
query GetUser {
  user {
    id
    name
  }
}
```
