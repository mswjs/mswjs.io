---
order: 6
title: Unique relations
description: Foreign records associated with a single owner.
---

Mark a relation as unique by setting the `unique` property of the relation options to `true`. Unique relations cannot reference foreign records that are already associated with other owner records:

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
posts.defineRelations(({ one }) => ({
  author: one(users, { unique: true }),
}))
```

> In this example, the `author` of each post points to a single _unique_ user. If a post attempts to set its author to a user that's already associated with another post, a [`RelationError`](/ecosystem/data/error-handling#relationerror) is thrown.
