---
order: 8
title: Polymorphic relations
description: A relation to records of multiple collections.
---

Provide an array of foreign collections to a relation to define it as _polymorphic_:

```ts
import { Collection } from '@msw/data'
import { z } from 'zod'

const imageSchema = z.object({
  url: z.string(),
  get post() {
    return postSchema
  },
})
const videoSchema = z.object({
  url: z.string(),
  get post() {
    return postSchema
  },
})
const postSchema = z.object({
  title: z.string(),
  get attachments() {
    return z.array(z.union([imageSchema, videoSchema]))
  },
})
// ---cut---
const posts = new Collection({ schema: postSchema })
const images = new Collection({ schema: imageSchema })
const videos = new Collection({ schema: videoSchema })

posts.defineRelations(({ many }) => ({
  // Providing a list of foreign collections allows
  // all of their records to be set as the value.
  attachments: many([images, videos]),
}))
images.defineRelations(({ one }) => ({
  post: one(posts),
}))
videos.defineRelations(({ one }) => ({
  post: one(posts),
}))
```

> In this example, `post.attachments` is an array of either `images` or `videos`, where records from both collections are allowed.
