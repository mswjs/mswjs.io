---
order: 1
title: Data-driven servers
description: Compose Data, Source, and Serve into a working HTTP server.
---

The libraries in the MSW ecosystem are designed to compose and complement each other. In this recipe, you will learn how to spawn an HTTP server out of your data collections using the following libraries:

| Library                      | Role                                    |
| ---------------------------- | --------------------------------------- |
| [Data](/ecosystem/data/)     | Describe and store the data.            |
| [Source](/ecosystem/source/) | Generate handlers from the data.        |
| [Serve](/ecosystem/serve/)   | Serve those handlers as an HTTP server. |

## Install

<div class="copyable-code">

::: code-group

```sh [npm]
npm install msw @msw/data @msw/source @msw/serve zod --save-dev
```

```sh [pnpm]
pnpm add msw @msw/data @msw/source @msw/serve zod --save-dev
```

:::

</div>

> This recipe uses [Zod](https://zod.dev/) to describe the data. You can use any [Standard Schema](https://standardschema.dev/) compliant library instead.

## Step 1: Describe the data

Start by describing the data using a _collection_ from `@msw/data`. A collection holds records of the same shape, validates them against your schema, and lets you query them.

```ts
// src/mocks/users.ts
import { Collection } from '@msw/data'
import { z } from 'zod'

export const users = new Collection({
  schema: z.object({
    id: z.string(),
    name: z.string(),
  }),
})

await users.create({ id: 'abc-123', name: 'John' })
await users.create({ id: 'def-456', name: 'Kate' })
```

> Learn more about collections in [Getting started with Data](/ecosystem/data/getting-started).

## Step 2: Generate the handlers

Next, provide the collection to the `fromCollection()` function from `@msw/source/data`. It generates the handlers that describe a RESTful API for the collection.

```ts /fromCollection/
// src/mocks/handlers.ts
import { fromCollection } from '@msw/source/data'
import { users } from './users'

export const handlers = fromCollection(users, {
  baseUrl: '/users',
})
```

The generated handlers read from and write to the collection:

| Handler             | Description                               |
| ------------------- | ----------------------------------------- |
| `GET /users`        | Returns all users.                        |
| `GET /users/:id`    | Returns a user by ID.                     |
| `POST /users`       | Creates a new user from the request body. |
| `PUT /users/:id`    | Replaces a user with the request body.    |
| `PATCH /users/:id`  | Merges the request body into a user.      |
| `DELETE /users/:id` | Deletes a user by ID.                     |

> These are regular handlers. You can use them anywhere you use MSW, like `setupWorker()` in the browser or `setupServer()` in your tests.

## Step 3: Serve the handlers

Finally, provide the generated handlers to the `createServer()` function from `@msw/serve` to spawn a standalone HTTP server.

```ts /createServer/
// src/mocks/server.ts
import { createServer } from '@msw/serve'
import { handlers } from './handlers'

const server = createServer(...handlers)

server.listen(9090, () => {
  console.log('Ready at http://localhost:9090')
})
```

Run this module in Node.js to start the server:

```sh
node src/mocks/server.ts
```

## Try it out

The server responds with the records from the collection:

```sh
curl http://localhost:9090/users
```

```json
[
  { "id": "abc-123", "name": "John" },
  { "id": "def-456", "name": "Kate" }
]
```

And since the handlers write to the collection, too, the server is stateful. Create a new user:

```sh
curl http://localhost:9090/users \
  -H 'Content-Type: application/json' \
  -d '{ "id": "ghi-789", "name": "Alice" }'
```

Then request it by its ID:

```sh
curl http://localhost:9090/users/ghi-789
```

```json
{ "id": "ghi-789", "name": "Alice" }
```

The records are validated against your schema. Sending a user without the `name`, for example, results in a `400 Bad Request` response.

## Going further

Each library remains replaceable, and that's the point of the composition. You can change any of the three steps without affecting the others:

- **Change the data.** Seed the collection with random values, or define [relations](/ecosystem/data/relations/) between multiple collections.
- **Change the source.** Add the handlers generated from an [OpenAPI document](/ecosystem/source/integrations/open-api) or a [HAR file](/ecosystem/source/integrations/har), or the ones you've written by hand. It's all handlers in the end.
- **Change the server.** Apply the same handlers as a middleware to your existing [Express](/ecosystem/serve/integrations/express), [Hono](/ecosystem/serve/integrations/hono), or [Fastify](/ecosystem/serve/integrations/fastify) server.

```ts {8-10}
import { createServer } from '@msw/serve'
import { fromCollection } from '@msw/source/data'
import { fromOpenApi } from '@msw/source/open-api'
import { users, posts } from './collections'
import api from './api.spec.json'

const server = createServer(
  ...fromCollection(users, { baseUrl: '/users' }),
  ...fromCollection(posts, { baseUrl: '/posts' }),
  ...(await fromOpenApi(api)),
)

server.listen(9090)
```

## Related materials

<PageCard
  icon="CubeTransparentIcon"
  url="/ecosystem/serve/api/create-server"
  title="createServer"
  description="API reference for the `createServer` function."
/>
