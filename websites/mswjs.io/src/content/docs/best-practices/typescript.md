---
title: Using with TypeScript
keywords:
  - typescript
  - types
  - type-safe
  - generic
  - params
  - request
  - response
  - mocking
---

Mock Service Worker facilitates type-safe API mocking through _generic arguments_ in TypeScript. Using generic arguments, you can annotate things like path parameters, request and response body types, GraphQL variables, and more. Please see the examples of usage below.

> We highly recommend exploring all the types ([core](https://github.com/mswjs/msw/blob/main/src/core/index.ts), [browser](https://github.com/mswjs/msw/blob/main/src/browser/index.ts), and [node](https://github.com/mswjs/msw/blob/main/src/node/index.ts)) exported from the `msw` package.

## Request handlers

### HTTP handlers

All request handlers in the [`http`](/docs/api/http) namespace support three generic arguments:

```ts
http.get<Params, RequestBodyType, ResponseBodyType, Path>(path, resolver)
```

| Argument name      | Type     | Description                                                                                              |
| ------------------ | -------- | -------------------------------------------------------------------------------------------------------- |
| `Params`           | `object` | Request path parameters. Narrows the `params` response resolver argument type.                           |
| `RequestBodyType`  | `object` | Request body type. Narrows the `request.json()` return type.                                             |
| `ResponseBodyType` | `object` | Response body type. Narrows the `HttpResponse.text()` and `HttpResponse.json()` response body type.      |
| `Path`             | `string` | Request path. Narrows the `path` argument on the request handler.                                        |

```ts
import { http, HttpResponse } from 'msw'

type AddCommentParams = {
  postId: string
}

type AddCommentRequestBody = {
  author: User
  comment: string
}

type AddCommentResponseBody = {
  commentUrl: string
}

http.post<
  AddCommentParams,
  AddCommentRequestBody,
  AddCommentResponseBody,
  '/post/:postId'
>('/post/:postId', async ({ params, request }) => {
  // Request path parameters are narrowed to the
  // provided "AddCommentParams" type.
  const { postId } = params

  // The request body JSON is narrowed to the
  // provided "AddCommentRequestBody" type.
  const commentData = await request.json()
  commentData.comment

  // The JSON response body type must satisfy
  // the "AddCommentResponseBody" type.
  return HttpResponse.json({
    commentUrl: `/post/${postId}?commentId=${crypto.randomUUID()}`,
  })
})
```

### GraphQL handlers

All request handlers in the [`graphql`](/docs/api/graphql) namespace support three generic arguments:

```ts
graphql.query<Query, Variables>(query, resolver)
```

| Argument name | Type     | Description                                                                             |
| ------------- | -------- | --------------------------------------------------------------------------------------- |
| `Query`       | `object` | GraphQL operation response query. Narrows the `HttpResponse.json()` response body type. |
| `Variables`   | `object` | GraphQL operation variables. Narrows the `variables` response resolver argument type.   |

```ts
import { graphql, HttpResponse } from 'msw'

type AddCommentQuery = {
  commentUrl: string
}

type AddCommentVariables = {
  postId: string
}

graphql.mutation<AddCommentQuery, AddCommentVariables>(
  'AddComment',
  ({ variables }) => {
    // GraphQL variables are narrowed to the provided
    // "AddCommentVariables" type.
    const { postId } = variables

    // Response structure to this GraphQL mutation must
    // satisfy the provided "AddCommentQuery" type.
    // Note that the "data" key is implied.
    return HttpResponse.json({
      data: {
        commentUrl: `/post/${postId}?commentId=${crypto.randomUUID()}`,
      },
    })
  }
)
```

> You can take advantage of tools like [GraphQL Code Generator](https://the-guild.dev/graphql/codegen) to have type-safe mocks based on your GraphQL types!

## Higher-order request handlers

Annotating custom request handlers will depend on the call signature of your higher-order functions. Here are a few examples.

First, let's see how you can abstract away a `resolver` function while locking its types within the higher-order handler, using the `HttpResponseResolver` type:

```ts
import { http, HttpResponseResolver, HttpResponse } from 'msw'

type SdkRequest = {
  transactionId: string
}

type SdkResponse = {
  transactionId: string
  data: { ok: boolean }
}

function handleSdkRequest(
  resolver: HttpResponseResolver<never, SdkRequest, SdkResponse>
) {
  return http.post('https://some-sdk.com/internal/request', resolver)
}

export const handlers = [
  handleSdkRequest(async ({ request }) => {
    const data = await request.json()

    // The response JSON body must satisfy the "SdkResponse"
    // imposed by the "handleSdkRequest".
    return HttpResponse.json({
      // The request body is narrowed to the "SdkRequest"
      // imposed by the "handleSdkRequest".
      transactionId: data.transactionId,
      data: { ok: true },
    })
  }),
]
```

> Learn more about the [Higher-order response resolvers](#higher-order-response-resolvers) below.

The library also exposes the `HttpRequestHandler` and `GraphQLRequestHandler` types to annotate custom functions that are meant to have the call signature identical to that of `http.*` and `graphql.*` request handlers:

```ts
import { http, graphql, HttpRequestHandler, GraphQLRequestHandler } from 'msw'

const myHttpHandler: HttpRequestHandler<Params, RequestBody, ResponseBody> = (
  path,
  resolver,
  options
) => {
  return http.get(path, resolver, options)
}

const myGraphQLHandler: GraphQLRequestHandler<Query, Variables> = (
  operationName,
  resolver,
  options
) => {
  return graphql.query(operationName, resolver, options)
}
```

## Higher-order response resolvers

Use the `HttpResponseResolver` and `GraphQLResponseResolver` types to annotate custom response resolvers.

```ts
import {
  PathParams,
  DefaultBodyType,
  HttpResponseResolver,
  delay,
  http,
  HttpResponse,
} from 'msw'

function withDelay<
  // Recreate the generic signature of the HTTP resolver
  // so the arguments passed to "http.get" propagate here.
  Params extends PathParams,
  RequestBodyType extends DefaultBodyType,
  ResponseBodyType extends DefaultBodyType
>(durationMs: number, resolver: HttpResponseResolver<Params, RequestBodyType, ResponseBodyType>): HttpResponseResolver<Params, RequestBodyType, ResponseBodyType> {
  return async (...args) => {
    await delay(durationMs)
    return resolver(...args)
  }
}

export const handlers = [
  http.get<never, never, 'hello world'>(
    '/resource',
    withDelay(250, ({ request }) => {
      // The "ResponseBodyType" generic type provided
      // to the "http.get()" request handler propagates
      // through the custom "withDelay" response resolver.
      return HttpResponse.text('hello world')
    })
  ),
]
```
