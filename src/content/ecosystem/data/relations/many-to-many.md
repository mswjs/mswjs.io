---
order: 4
title: Many-to-many
description: Records reference lists of each other.
---

In the next example, every `user` may have multiple `posts` while each `post` may have multiple `authors`:

```ts
import { Collection } from '@msw/data'
import { z } from 'zod'
// ---cut---
const userSchema = z.object({
  get posts() {
    return z.array(postSchema)
  },
})
const postSchema = z.object({
  get authors() {
    return z.array(userSchema)
  },
})

const users = new Collection({ schema: userSchema })
const posts = new Collection({ schema: postSchema })

users.defineRelations(({ many }) => ({
  posts: many(posts),
}))
posts.defineRelations(({ many }) => ({
  authors: many(users),
}))
```
