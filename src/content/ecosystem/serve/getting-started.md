---
order: 2
title: Getting started
description: Three steps to get started with Serve.
---

## Step 1: Install

Add `@msw/serve` as a dependency to your project:

<div class="copyable-code">

::: code-group

```sh [npm]
npm install msw @msw/serve --save-dev
```

```sh [pnpm]
pnpm add msw @msw/serve --save-dev
```

:::

</div>

> Serve is meant to be used with [`msw`](https://mswjs.io/) so we will install it too.

## Step 2: Describe the network

Next, describe the network you want using handlers. If you already use MSW, you can skip this step and reuse your existing handlers.

```ts
// src/mocks/handlers.ts
import { http, HttpResponse } from 'msw/http'

export const handlers = [
  http.get('/user', () => {
    return HttpResponse.json({ firstName: 'John' })
  }),
]
```

> Learn more about [Handling requests](/docs/http/handling-requests).

## Step 3: Create a server

Import the `createServer()` function from `@msw/serve` and provide it with your handlers:

```ts /createServer/
// src/mocks/server.ts
import { createServer } from '@msw/serve'
import { handlers } from './handlers'

const server = createServer(...handlers)

server.listen(9090)
```

Run this module in Node.js, and your handlers are now available over HTTP:

```sh
curl http://localhost:9090/user
```

```json
{ "firstName": "John" }
```

## Next steps

If you already have a server, you can apply the handlers to it as a middleware instead of spawning a standalone server:

<PageCard
  icon="ServerIcon"
  url="/ecosystem/serve/integrations/express"
  title="Express"
  description="Apply handlers as an Express middleware."
/>

<PageCard
  icon="ServerIcon"
  url="/ecosystem/serve/integrations/hono"
  title="Hono"
  description="Apply handlers as a Hono middleware."
/>

<PageCard
  icon="ServerIcon"
  url="/ecosystem/serve/integrations/fastify"
  title="Fastify"
  description="Apply handlers as a Fastify hook."
/>
