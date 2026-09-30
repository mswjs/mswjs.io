---
order: 11
title: GraphQLHandler
description: The class for GraphQL handler implementation.
---

::: warning
  This class is used internally by the [`graphql`](/api/graphql) namespace.
  Please prefer creating GraphQL handlers via `graphql.link()` before
  extending this class to create a custom GraphQL handler.
:::

## Call signature

```js
import { GraphQLHandler } from 'msw/graphql'

export class CustomGraphQLHandler extends GraphQLHandler {
  constructor() {
    super(operationType, predicate, endpoint, resolver, options)
  }
}
```

The `GraphQLHandler` class constructor expects the following arguments:

| Argument name   | Type                                                     | Description                                                                                                                                                                       |
| --------------- | -------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `operationType` | `"query" \| "mutation" \| "all"`                         | The kind of GraphQL operations this handler matches. Use `"all"` to match any operation type.                                                                                     |
| `predicate`     | `string \| RegExp \| DocumentNode \| Function`           | Operation name to match. Can be a string, a regular expression, a `DocumentNode` (or a typed document string), or a [custom predicate](/guides/best-practices/custom-request-predicate) function. |
| `endpoint`      | `string \| RegExp`                                       | The URL of the GraphQL endpoint to match. Supports the same [path syntax](/docs/http/intercepting-requests/) as `http` handlers.                                                    |
| `resolver`      | `Function`                                               | [Response resolver](/docs/graphql/mocking-responses/) function to handle matching operations.                                                                                     |
| `options`       | `object`                                                 | _Optional_. GraphQL handler [options](#graphql-handler-options).                                                                                                                  |

## GraphQL handler options

### `once`

- _Optional_. `Boolean`.

When set to `true`, marks this handler as inactive after the first matching operation it handles. Inherited from [`RequestHandler`](/api/request-handler#once).

## Properties

### `info`

- `object`.

Information object about this GraphQL handler.

| Property name   | Type                                       | Description                                                                                                      |
| --------------- | ------------------------------------------ | ---------------------------------------------------------------------------------------------------------------- |
| `header`        | `string`                                   | Public string representation of this handler (e.g. `query GetUser (origin: https://api.example.com/graphql)`).     |
| `operationType` | `"query" \| "mutation" \| "all"`           | The operation type this handler matches.                                                                         |
| `operationName` | `string \| RegExp \| Function`             | The operation name predicate. `DocumentNode` predicates are normalized to the operation name they declare.       |
| `callFrame`     | `string`                                   | The top-most frame of this handler's call. Useful for debugging.                                                 |

```js
const handler = new GraphQLHandler(
  'query',
  'GetUser',
  'https://api.example.com/graphql',
  resolver,
)

console.log(handler.info.header) // "query GetUser (origin: https://api.example.com/graphql)"
console.log(handler.info.operationType) // "query"
console.log(handler.info.operationName) // "GetUser"
```

::: warning
  Providing a `DocumentNode` with a mismatched operation type (e.g. a
  `mutation` document to a `"query"` handler) or without an operation name
  throws an error.
:::

## Methods

### `parse(args)`

Matches the intercepted request URL against the `endpoint` and, if it matches, parses the GraphQL operation from the request. The request body is parsed once per request and cached across all GraphQL handlers.

| Argument name | Type      | Description                   |
| ------------- | --------- | ----------------------------- |
| `request`     | `Request` | Intercepted request instance. |

Returns an object with the following properties:

| Property name   | Type                                       | Description                                                                              |
| --------------- | ------------------------------------------ | ---------------------------------------------------------------------------------------- |
| `match`         | `object`                                   | The result of matching the request URL against the `endpoint`.                           |
| `cookies`       | `object`                                   | Request cookies.                                                                         |
| `query`         | `string`                                   | The GraphQL query string. `undefined` if the request is not a GraphQL request.            |
| `operationType` | `"query" \| "mutation" \| "subscription"`  | The parsed operation type. `undefined` if the request is not a GraphQL request.          |
| `operationName` | `string`                                   | The parsed operation name. `undefined` for anonymous operations.                         |
| `variables`     | `object`                                   | The parsed operation variables.                                                          |

### `predicate(args)`

Decides whether the intercepted operation should be handled by this handler. Returns `true` when the request URL matches the `endpoint`, the parsed operation type matches `info.operationType` (or it is `"all"`), and the operation name matches `info.operationName`.

| Argument name  | Type      | Description                                    |
| -------------- | --------- | ---------------------------------------------- |
| `request`      | `Request` | Intercepted request instance.                  |
| `parsedResult` | `object`  | The object returned from the `parse()` method. |

> Anonymous operations are never matched unless the handler's operation type is `"all"`. A warning is printed for such operations.

### `extendResolverArgs(args)`

Extends the response resolver argument object with the GraphQL-specific information.

| Argument name  | Type      | Description                                    |
| -------------- | --------- | ---------------------------------------------- |
| `request`      | `Request` | Intercepted request instance.                  |
| `parsedResult` | `object`  | The object returned from the `parse()` method. |

Returns an object with the following properties, which are exposed on the [resolver argument](/api/graphql#resolver-argument):

| Property name   | Type                                       | Description                        |
| --------------- | ------------------------------------------ | ---------------------------------- |
| `query`         | `string`                                   | The GraphQL query string.          |
| `operationType` | `"query" \| "mutation" \| "subscription"`  | The operation type.                |
| `operationName` | `string`                                   | The operation name.                |
| `variables`     | `object`                                   | The operation variables.           |
| `cookies`       | `object`                                   | Request cookies.                   |

Here's an example of extending the default GraphQL resolver arguments with additional data:

```js {6-10}
import { GraphQLHandler } from 'msw/graphql'

export class ClientGraphQLHandler extends GraphQLHandler {
  /* parse() and predicate() here */

  extendResolverArgs({ request, parsedResult }) {
    return {
      ...super.extendResolverArgs({ request, parsedResult }),
      clientName: parsedResult.clientName,
    }
  }
}
```

### `log(args)`

Prints a browser console message whenever this handler has handled the intercepted operation (e.g. `query GetUser (200 OK)`).

| Argument name  | Type       | Description                                              |
| -------------- | ---------- | -------------------------------------------------------- |
| `request`      | `Request`  | Intercepted request instance.                            |
| `response`     | `Response` | Response instance returned from the `resolver` function. |
| `parsedResult` | `object`   | The object returned from the `parse()` method.           |

### `run(args)`

Executes this handler against the intercepted request. In addition to the base [`RequestHandler`](/api/request-handler) behavior, sets the `Content-Type` response header to `application/graphql-response+json` if the request's `Accept` header prefers it over `application/json`.

| Argument name       | Type      | Description                         |
| ------------------- | --------- | ----------------------------------- |
| `request`           | `Request` | Intercepted request instance.       |
| `requestId`         | `string`  | Unique ID of the intercepted request. |
| `resolutionContext` | `object`  | _Optional_. Request resolution context. |

## Request phases

Whenever MSW intercepts a request, it will pass it to the GraphQL handler. The handler will then process the request in phases listed in the following order:

### Phase 1: Parsing

First, the intercepted request instance will be parsed using the `parse()` method of the handler. The parsing phase matches the request URL against the `endpoint` and extracts the GraphQL operation from the request body.

Let's create a custom `ClientGraphQLHandler` that will only handle operations sent by a specific GraphQL client, as indicated by the `x-client-name` request header.

::: code-group

```js [ClientGraphQLHandler.js] {10-19}
import { GraphQLHandler } from 'msw/graphql'

export class ClientGraphQLHandler extends GraphQLHandler {
  constructor(clientName, operationType, predicate, endpoint, resolver) {
    super(operationType, predicate, endpoint, resolver)
    this.clientName = clientName
  }

  async parse({ request }) {
    // Parse the GraphQL operation as usual.
    const parsedResult = await super.parse({ request })

    // Expose the client name for the other handler's methods.
    return {
      ...parsedResult,
      clientName: request.headers.get('x-client-name'),
    }
  }
}
```

:::

### Phase 2: Predicate

The next phase determines if the intercepted operation should be handled by this handler. The intercepted request instance and the parsing result returned from the `parse()` method are passed to the `predicate()` method of the handler. The predicate method must return a boolean indicating whether this handler is meant to handle the intercepted operation.

For example, let's iterate on the custom `ClientGraphQLHandler` to only match the intercepted operations sent by the expected client.

::: code-group

```js [ClientGraphQLHandler.js] {18-27}
import { GraphQLHandler } from 'msw/graphql'

export class ClientGraphQLHandler extends GraphQLHandler {
  constructor(clientName, operationType, predicate, endpoint, resolver) {
    super(operationType, predicate, endpoint, resolver)
    this.clientName = clientName
  }

  async parse({ request }) {
    const parsedResult = await super.parse({ request })

    return {
      ...parsedResult,
      clientName: request.headers.get('x-client-name'),
    }
  }

  async predicate({ request, parsedResult }) {
    // Match the endpoint, operation type, and operation name as usual.
    const matchesOperation = await super.predicate({ request, parsedResult })

    if (!matchesOperation) {
      return false
    }

    // Additionally, make sure the operation was sent by the expected client.
    return parsedResult.clientName === this.clientName
  }
}
```

:::

### Phase 3: Resolution

If the handler returned `true` in the predicate phase, the resolution phase begins. The resolution is implemented in the `run()` method. `GraphQLHandler` extends the default [`RequestHandler.run()`](/api/request-handler#runargs) resolution, which executes the `resolver` function with the parsed operation details (`query`, `operationName`, `variables`, etc), and additionally sets the `Content-Type` response header to `application/graphql-response+json` when the client prefers it.

You can customize the resolution by overriding the `run()` method in your custom handler. Make sure to call `super.run()` to reuse the default resolution logic. For example, let's iterate on the custom `ClientGraphQLHandler` to echo the client name back in a response header.

::: code-group

```js [ClientGraphQLHandler.js] {18-29}
import { GraphQLHandler } from 'msw/graphql'

export class ClientGraphQLHandler extends GraphQLHandler {
  constructor(clientName, operationType, predicate, endpoint, resolver) {
    super(operationType, predicate, endpoint, resolver)
    this.clientName = clientName
  }

  async parse({ request }) {
    /* Client name parsing here */
  }

  async predicate({ request, parsedResult }) {
    /* Client name predicate here */
  }

  async run(args) {
    // Resolve the operation as usual. This returns "null"
    // if the handler doesn't match the operation.
    const result = await super.run(args)

    if (result?.response) {
      // Echo the client name in the mocked response.
      result.response.headers.set('x-client-name', this.clientName)
    }

    return result
  }
}
```

:::

::: code-group

```js [handlers.js]
import { HttpResponse } from 'msw/http'
import { ClientGraphQLHandler } from './ClientGraphQLHandler'

export const handlers = [
  new ClientGraphQLHandler(
    'web',
    'query',
    'GetUser',
    'https://api.example.com/graphql',
    ({ variables }) => {
      return HttpResponse.json({
        data: {
          user: { id: variables.id },
        },
      })
    },
  ),
]
```

:::
