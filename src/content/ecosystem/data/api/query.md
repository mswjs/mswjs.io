---
order: 2
title: Query
description: A type-safe, reusable query for records.
---

## Call signature

```ts
import { z } from 'zod'

const userSchema = z.object({ id: z.number() })
// ---cut---
import { Query } from '@msw/data'

const query = new Query<typeof userSchema>()
```

### `new Query([predicate])`

- `predicate` (optional) an object or a function that acts as a predicate for records.

Creates a new query to match records in a collection. Normally, you query records through the [querying methods](/ecosystem/data/api/collection#methods) of the collection (see [Querying](/ecosystem/data/querying)). You can, however, construct a type-safe `Query` instance to abstract common queries or query builders.

```ts
import { Query } from '@msw/data'
import { z } from 'zod'
// ---cut---
const userSchema = z.object({
  id: z.number(),
  subscribed: z.boolean().default(false),
  role: z.enum(['user', 'editor', 'admin']).default('user'),
})

// Creates a query builder for the users schema.
const query = new Query<typeof userSchema>()
```

## Methods

### `.where(predicate)`

- `predicate` a predicate for the records.
- Returns: `Query`.

```ts
import { Query } from '@msw/data'
import { z } from 'zod'

const userSchema = z.object({
  id: z.number(),
  subscribed: z.boolean().default(false),
  role: z.enum(['user', 'editor', 'admin']).default('user'),
})
const query = new Query<typeof userSchema>()
// ---cut---
query.where({ id: 2 })
```

### `.or(predicate)`

- `predicate` a predicate or another `Query`.
- Returns: `Query`.

Creates a new query, merging the previous predicates with the new one under an `OR` relation. A record may match _any predicate_ to be considered matching.

```ts
import { Query } from '@msw/data'
import { z } from 'zod'

const userSchema = z.object({
  id: z.number(),
  subscribed: z.boolean().default(false),
  role: z.enum(['user', 'editor', 'admin']).default('user'),
})
const query = new Query<typeof userSchema>()
// ---cut---
const unsubscribedOrEditorsQuery = query.or(
  query.where({ subscribed: false }),
  query.where({ role: 'editor' }),
)
```

### `.and(predicate)`

- `predicate` a predicate or another `Query`.
- Returns: `Query`.

Creates a new query, merging the previous predicates with the new one under an `AND` relation. A record must match _all predicates_ to be considered matching.

```ts
import { Query } from '@msw/data'
import { z } from 'zod'

const userSchema = z.object({
  id: z.number(),
  subscribed: z.boolean().default(false),
  role: z.enum(['user', 'editor', 'admin']).default('user'),
})
const query = new Query<typeof userSchema>()
// ---cut---
const exactAdminQuery = query.and(
  query.where({ id: 1 }),
  query.where({ role: 'admin' }),
)
```

### `.test(record)`

- `record` `<Record>` a reference to a record to test.
- Returns: `<boolean>`, whether the given record matches the query.

```ts
import { Query } from '@msw/data'
import { z } from 'zod'

const userSchema = z.object({
  id: z.number(),
  subscribed: z.boolean().default(false),
  role: z.enum(['user', 'editor', 'admin']).default('user'),
})
const query = new Query<typeof userSchema>()
// ---cut---
query.test({ id: 1 })
```
