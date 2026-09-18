---
order: 3
title: One-to-many
description: A record references a list of foreign records.
---

Use the `many()` relational utility to describe a property that references a list of records of another collection:

```ts
import { Collection } from '@msw/data'
import { z } from 'zod'
// ---cut---
const postSchema = z.object({
  get comments() {
    return z.array(commentSchema)
  },
})
const commentSchema = z.object({
  text: z.string(),
})

const posts = new Collection({ schema: postSchema })
const comments = new Collection({ schema: commentSchema })

posts.defineRelations(({ many }) => ({
  comments: many(comments),
}))

await posts.create({
  comments: [
    await comments.create({ text: 'First!' }),
    await comments.create({ text: 'Thanks for watching.' }),
  ],
})
```

## Inversed relations

Two collections may reference each other. For example, `post.comments` is a list of comments while each `comment.post` references the parent post:

```ts
import { Collection } from '@msw/data'
import { z } from 'zod'
// ---cut---
const postSchema = z.object({
  get comments() {
    return z.array(commentSchema)
  },
})
const commentSchema = z.object({
  text: z.string(),
  get post() {
    return postSchema
  },
})

const posts = new Collection({ schema: postSchema })
const comments = new Collection({ schema: commentSchema })

posts.defineRelations(({ many }) => ({
  comments: many(comments),
}))
comments.defineRelations(({ one }) => ({
  post: one(posts),
}))

await posts.create({
  comments: [await comments.create({ text: 'First!' })],
})

const comment = comments.findFirst((q) => q.where({ text: 'First!' }))
comment.post // { comments: [{ text: 'First', post: Circular }] }
```

> Inversed relations are updated automatically. Whenever you add a new comment to a post, both `post.comments` and `comment.post` are updated to reference each other. The same is true when setting a new parent `post` on the comment.
