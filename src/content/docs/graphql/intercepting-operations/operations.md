---
order: 3
title: Operations
description: Intercepting any GraphQL operation.
---

You can intercept any GraphQL operation regardless of its kind by calling `.operation()` on a [GraphQL link](/api/graphql#graphql-link-url). Unlike query and mutation handlers, the operation handler does not require you to specify the operation kind or name, only the response resolver.

```ts /api.operation/ /() => {}/#g
const api = graphql.link('https://api.example.com/graphql')

api.operation(() => {})
```

> You can still access all the [Response resolver arguments](/docs/graphql/intercepting-operations/#response-resolver) of the intercepted GraphQL operation, like `operationName`, `variables`, etc.

This type of interception is handy when you want to delegate the request handling to an external source, like a mocked GraphQL schema. For that, see [Schema-first mocking](/docs/graphql/schema-first-mocking).
