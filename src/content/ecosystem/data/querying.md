---
order: 3
title: Querying
description: Target records with queries and logical operators.
---

Whenever you have to target a record (or records), you construct a _query_. A query acts as a predicate that a record must match in order to be targeted.

## Query syntax

The most basic query describes the expected values of the record's properties:

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
users.findFirst((q) => q.where({ name: 'John' }))
```

> Above, we are defining a query using the `q` builder that targets the first user whose `name` property equals `'John'`.

Any property in a query can be expanded into a function that accepts the value and returns a boolean, indicating whether the record matches:

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
users.findFirst((q) =>
  q.where({
    name: (name) => name.startsWith('John'),
  }),
)
```

> This query matches the first user whose `name` starts with `'John'`. Use functions as predicates to express more advanced logic in your queries.

Query functions are supported at any level of nesting, including the top-level record itself:

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
users.findFirst((q) => q.where((user) => user.posts.length > 0))

users.findFirst((q) =>
  q.where({
    address: {
      street: (street) => street !== 'Baker st.',
    },
  }),
)
```

## Logical operators

You can build complex queries via the `.or()` and `.and()` logical operators exposed through the query builder. For example, here's a query that matches all users who have posts _or_ are editors:

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
users.findMany((q) =>
  q.where({ posts: (posts) => posts.length > 0 }).or({ role: 'editor' }),
)
```

If you prefer functional composition over method chaining, wrap the predicates in `q.or()` and `q.and()` instead. Both syntaxes result in the same query:

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
users.findMany((q) =>
  q.or(
    q.where({ posts: (posts) => posts.length > 0 }),
    q.where({ role: 'editor' }),
  ),
)
```

## Reusable queries

You can construct a type-safe `Query` instance to abstract common queries or query builders. See the [`Query`](/ecosystem/data/api/query) API reference.
