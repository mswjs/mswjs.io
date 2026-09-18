---
order: 7
title: Ambiguous relations
description: Multiple properties referencing the same collection.
---

Use the `role` option of a relation to disambiguate between multiple properties referencing the same foreign collection.

For example, a single `post` may have both `author` and `reviewer` referencing the same `user` model. To make those properties point to _different_ user records, use the `role` that acts as a relation identifier. This way, the library updates the corresponding relational properties for both `users` and `posts` when the referenced relation is updated:

```ts
import { Collection } from '@msw/data'
import { z } from 'zod'

const userSchema = z.object({
  name: z.string(),
  get posts() {
    return z.array(postSchema)
  },
  get reviews() {
    return z.array(postSchema)
  },
})
const postSchema = z.object({
  title: z.string(),
  get author() {
    return userSchema
  },
  get reviewer() {
    return userSchema
  },
})
// ---cut---
const users = new Collection({ schema: userSchema })
const posts = new Collection({ schema: postSchema })

users.defineRelations(({ many }) => ({
  posts: many(posts, { role: 'author' }),
  reviews: many(posts, { role: 'reviewer' }),
}))

posts.defineRelations(({ one }) => ({
  author: one(users, { role: 'author' }),
  reviewer: one(users, { role: 'reviewer' }),
}))
```

> The `role` property acts as a de-facto ID of a relation when synchronizing related models.
