---
order: 1
title: Collection
description: A collection of records described by a schema.
---

## Call signature

```ts
import { z } from 'zod'

const schema = z.object({ id: z.number(), name: z.string() })
// ---cut---
import { Collection } from '@msw/data'

const users = new Collection({ schema })
```

### `new Collection(options)`

- `options` `<Object>`
  - `schema` [Standard Schema](https://standardschema.dev/), a schema describing each record in this collection.
  - `extensions` (optional) an array of [extensions](/ecosystem/data/extensions/) to use on this collection.

Creates a new collection of data.

## Methods

### `.create(initialValues)`

- `initialValues` initial values for the new record.

Creates a single record with the provided initial values.

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
const user = await users.create({ id: 1, name: 'John' })
```

> The `.create()` method returns a promise to support potential asynchronous transformations in your schema.

### `.createMany(count, initialValuesFactory)`

- `count` `<number>` a number of records to create.
- `initialValuesFactory` `<Function>` a function that returns initial values for each record.

Creates multiple records with the initial value factory.

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
const johns = await users.createMany(5, (index) => ({
  id: index + 1,
  name: 'John',
}))
```

The initial value factory function accepts the `index` argument indicating the index of the record being created. Use it, as well as the function's closure, to generate unique or random values.

### `.findFirst(query)`

- `query` [`Query`](/ecosystem/data/api/query) a query matching the record.

Returns the first record matching the query.

```ts
import { Collection } from '@msw/data'
import { z } from 'zod'
// ---cut---
const users = new Collection({
  schema: z.object({
    id: z.number(),
    name: z.string(),
  }),
})

await users.create({ id: 1, name: 'John' })
await users.create({ id: 2, name: 'John' })

users.findFirst((q) => q.where({ name: 'John' }))
// { id: 1, name: 'John' }
```

### `.findMany(query)`

- `query` [`Query`](/ecosystem/data/api/query) a query matching the records.

Returns all records matching the query.

```ts
import { Collection } from '@msw/data'
import { z } from 'zod'
// ---cut---
const users = new Collection({
  schema: z.object({
    id: z.number(),
    name: z.string(),
  }),
})

await users.create({ id: 1, name: 'John' })
await users.create({ id: 2, name: 'John' })

users.findMany((q) => q.where({ name: 'John' }))
// [{ id: 1, name: 'John' }, { id: 2, name: 'John' }]
```

> Bulk operations accept [pagination](/ecosystem/data/pagination) and [sorting](/ecosystem/data/sorting) options as the second argument.

### `.update(query, options)`

- `query` [`Query`](/ecosystem/data/api/query) a query matching the record.
- `options` `<Object>`
  - `data` a function that produces changes by modifying the previous record.

Updates the first record matching the query. Returns a promise that resolves with the updated record.

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
// Change the name for the user with a specific `id`.
const updatedUser = await users.update((q) => q.where({ id: 123 }), {
  data(user) {
    user.name = 'Johnatan'
  },
})
```

> Update methods return a promise in order to support potential asynchronous transformations defined in your schema.

The `data` function allows you to perform multiple updates on a record by mutating that record directly. Think of it as a draft function from libraries like `immer` or `mutative`, because that's precisely what it is.

You can also provide a record reference as the predicate to the `.update()` method to update that particular record:

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
const user = users.findFirst((q) => q.where({ id: 123 }))
await users.update(user, {
  data(user) {
    user.id = 456
  },
})
```

### `.updateMany(query, options)`

- `query` [`Query`](/ecosystem/data/api/query) a query matching the records.
- `options` `<Object>`
  - `data` changes to apply to each record.

Updates all records matching the query. Returns a promise that resolves with an array containing the updated records.

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
// Find all the users with the name "John"
// and make their name truly stand out!
const updatedUsers = await users.updateMany((q) => q.where({ name: 'John' }), {
  data(user) {
    user.name = user.name.toUpperCase()
  },
})
```

### `.delete(query)`

- `query` [`Query`](/ecosystem/data/api/query) a query matching the record.

Deletes the first record matching the query. Returns the deleted record.

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
// Delete a user with a particular `id`.
const deletedUser = users.delete((q) => q.where({ id: 123 }))
```

You can also provide a record reference as the predicate to the `.delete()` method to delete that particular record:

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
const user = users.findFirst((q) => q.where({ id: 123 }))
users.delete(user)
```

### `.deleteMany(query)`

- `query` [`Query`](/ecosystem/data/api/query) a query matching the records.

Deletes all records matching the query. Returns an array containing the deleted records.

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
// Delete all users whose trial period has expired.
const deletedUsers = users.deleteMany((q) =>
  q.where({ trial: { expiresAt: (expiresAt) => expiresAt <= Date.now() } }),
)
```

### `.defineRelations(definition)`

- `definition` `<Function>` a function that accepts relation utilities and returns an object with relational properties.

Defines [relations](/ecosystem/data/relations/) on the current collection.

```ts
import { Collection } from '@msw/data'
import { z } from 'zod'

const userSchema = z.object({
  name: z.string(),
  get posts() {
    return z.array(postSchema)
  },
})
const postSchema = z.object({
  title: z.string(),
})
// ---cut---
const users = new Collection({ schema: userSchema })
const posts = new Collection({ schema: postSchema })

users.defineRelations(({ many }) => ({
  // `user.posts` is a many-of relation to `posts`.
  posts: many(posts),
}))
```

> You can define nested relational properties by nesting them in the object returned from `.defineRelations()`.

#### Relational utilities

The following relational utilities are exposed in the argument to this method:

- `one(collection[, options])`, defines a one-of relation to the given collection;
- `many(collection[, options])`, defines a many-of relation to the given collection.

#### Relation options

- `unique` `<boolean>`, marks this relation as [unique](/ecosystem/data/relations/unique). Foreign records referenced by this relation cannot be referenced by other models.

```ts
import { Collection } from '@msw/data'
import { z } from 'zod'

const userSchema = z.object({
  name: z.string(),
  get posts() {
    return z.array(postSchema)
  },
  get underReview() {
    return z.array(postSchema)
  },
})
const postSchema = z.object({
  title: z.string(),
  get author() {
    return userSchema
  },
  get reviewers() {
    return z.array(userSchema)
  },
})

const users = new Collection({ schema: userSchema })
const posts = new Collection({ schema: postSchema })
// ---cut---
users.defineRelations(({ many }) => ({
  posts: many(posts),
}))
posts.defineRelations(({ one }) => ({
  author: one(users, { unique: true }),
}))

const john = await users.create({
  name: 'John',
  // `john` is associated as the `author` of this post now.
  posts: [await posts.create({ title: 'First post' })],
})

await users.create({
  name: 'Katy',
  // Creating this user will error because it tries to list
  // a post whose `author` already references another user.
  posts: [john.posts[0]],
})
```

- `role` `<string>`, an identifier to differentiate [ambiguous relations](/ecosystem/data/relations/ambiguous) to the same foreign collection.

```ts
import { Collection } from '@msw/data'
import { z } from 'zod'

const userSchema = z.object({
  name: z.string(),
  get posts() {
    return z.array(postSchema)
  },
  get underReview() {
    return z.array(postSchema)
  },
})
const postSchema = z.object({
  title: z.string(),
  get author() {
    return userSchema
  },
  get reviewers() {
    return z.array(userSchema)
  },
})

const users = new Collection({ schema: userSchema })
const posts = new Collection({ schema: postSchema })
// ---cut---
users.defineRelations(({ many }) => ({
  // Both `users` and `posts` reference each other in multiple keys.
  // Using `role` helps the library understand which keys are connected.
  posts: many(posts, { role: 'author' }),
  underReview: many(posts, { role: 'reviewer' }),
}))

posts.defineRelations(({ one, many }) => ({
  author: one(users, { role: 'author' }),
  reviewers: many(users, { role: 'reviewer' }),
}))
```

- `onDelete` `"cascade" | undefined`, decides how to handle referenced foreign records when the owner is deleted.

```ts
import { Collection } from '@msw/data'
import { z } from 'zod'

const userSchema = z.object({
  name: z.string(),
  get posts() {
    return z.array(postSchema)
  },
  get underReview() {
    return z.array(postSchema)
  },
})
const postSchema = z.object({
  title: z.string(),
  get author() {
    return userSchema
  },
  get reviewers() {
    return z.array(userSchema)
  },
})

const users = new Collection({ schema: userSchema })
const posts = new Collection({ schema: postSchema })
// ---cut---
users.defineRelations(({ many }) => ({
  // If a user gets deleted, delete all of the `posts` associated with them.
  posts: many(posts, { onDelete: 'cascade' }),
}))
posts.defineRelations(({ one }) => ({
  author: one(users),
}))
```
