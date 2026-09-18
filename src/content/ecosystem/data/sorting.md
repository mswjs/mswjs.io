---
order: 5
title: Sorting
description: Order the results of bulk operations.
---

You can sort the results of bulk operations, like `.findMany()`, `.updateMany()`, and `.deleteMany()`, by providing the `orderBy` property in that operation's options:

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
// Find all users whose name starts with "J"
// and return them sorted by their `name`.
users.findMany((q) => q.where({ name: (name) => name.startsWith('J') }), {
  orderBy: { name: 'asc' },
})
```

## Multiple keys

Sort by multiple keys by listing them in the `orderBy` object:

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
users.updateMany((q) => q.where({ name: (name) => name.startsWith('J') }), {
  data(user) {
    user.name = user.name.toUpperCase()
  },
  orderBy: {
    name: 'asc',
    id: 'desc',
  },
})
```

## Ordered criteria

Sort by an ordered list of criteria by passing an array to `orderBy`. Each entry is applied in sequence: the first entry determines the primary sort, and each subsequent entry breaks ties among records that compare equal under the preceding criteria.

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
users.findMany(undefined, {
  orderBy: [{ age: 'asc' }, { name: 'desc' }],
})
```
