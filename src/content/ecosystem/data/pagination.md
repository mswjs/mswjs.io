---
order: 4
title: Pagination
description: Limit and offset the results of bulk operations.
---

The library supports offset-based and cursor-based pagination for bulk operations, like `.findMany()`, `.updateMany()`, or `.deleteMany()`.

## Offset-based pagination

Provide the `take` property on the options object of any bulk operation to limit the number of results returned by the query:

```ts
import { Collection } from '@msw/data'
import { z } from 'zod'

const schema = z.object({
  name: z.string(),
  email: z.string(),
  subscribed: z.boolean(),
})
// ---cut---
const users = new Collection({ schema })

users.findMany(
  (q) => q.where({ email: (email) => email.includes('@google.com') }),
  {
    // Return the first 5 matching records.
    take: 5,
  },
)
```

You can also skip a number of the first matching results by providing the `skip` property:

```ts
import { Collection } from '@msw/data'
import { z } from 'zod'

const users = new Collection({
  schema: z.object({
    id: z.number(),
    name: z.string(),
    email: z.string(),
    role: z.enum(['user', 'editor', 'admin']),
    subscribed: z.boolean(),
    age: z.number(),
    address: z.object({ street: z.string() }),
    posts: z.array(z.object({ title: z.string() })),
    trial: z.object({ expiresAt: z.number() }),
  }),
})
// ---cut---
users.findMany(
  (q) => q.where({ email: (email) => email.includes('@google.com') }),
  {
    // Skip the first 10 matching records.
    skip: 10,
    // And return the next 5.
    take: 5,
  },
)
```

A negative value for `take` is also supported for backward pagination:

```ts
import { Collection } from '@msw/data'
import { z } from 'zod'

const users = new Collection({
  schema: z.object({
    id: z.number(),
    name: z.string(),
    email: z.string(),
    role: z.enum(['user', 'editor', 'admin']),
    subscribed: z.boolean(),
    age: z.number(),
    address: z.object({ street: z.string() }),
    posts: z.array(z.object({ title: z.string() })),
    trial: z.object({ expiresAt: z.number() }),
  }),
})
// ---cut---
users.findMany(
  (q) => q.where({ email: (email) => email.includes('@google.com') }),
  {
    take: -5,
  },
)
```

## Cursor-based pagination

Provide a reference to a record of the same collection as the `cursor` property for cursor-based pagination:

```ts
import { Collection } from '@msw/data'
import { z } from 'zod'

const users = new Collection({
  schema: z.object({
    id: z.number(),
    name: z.string(),
    email: z.string(),
    role: z.enum(['user', 'editor', 'admin']),
    subscribed: z.boolean(),
    age: z.number(),
    address: z.object({ street: z.string() }),
    posts: z.array(z.object({ title: z.string() })),
    trial: z.object({ expiresAt: z.number() }),
  }),
})
// ---cut---
const john = users.findFirst((q) => q.where({ name: 'John' }))

users.findMany((q) => q.where({ subscribed: true }), {
  cursor: john,
  take: 5,
})
```
