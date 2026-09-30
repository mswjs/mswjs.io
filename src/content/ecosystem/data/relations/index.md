---
order: 1
standalone: true
title: Defining relations
description: Connect records across collections.
---

You can define relations between collections by calling the [`.defineRelations()`](/ecosystem/data/api/collection#definerelationsdefinition) method on a collection. A few things apply to all relation types:

- Describe relations on the schema level using your schema library. The `.defineRelations()` API has no effect on the model's schema and types, and only operates on known properties;
- Relations are described _after_ a collection is defined (to prevent circular references);
- Relations do not require explicit foreign key associations and are instead bound to the internal IDs of the related records.

```ts
import { Collection } from '@msw/data'
import { z } from 'zod'

const userSchema = z.object({
  name: z.string(),
  // In Zod, relational properties are best described as getters
  // so they can produce self-referencing schemas.
  get posts() {
    return z.array(postSchema)
  },
})
const postSchema = z.object({
  title: z.string(),
})

const users = new Collection({ schema: userSchema })
const posts = new Collection({ schema: postSchema })

// Declare the relations on the `users` collection.
users.defineRelations(({ many }) => ({
  // `user.posts` is a many-of relation to the `posts` collection.
  posts: many(posts),
}))
```

## Relation types

<div class="page-card-grid grid gap-5 md:grid-cols-2">
  <PageCard
    icon="ShareIcon"
    url="/ecosystem/data/relations/one-to-one"
    title="One-to-one"
    description="A record references a single foreign record."
  />
  <PageCard
    icon="ShareIcon"
    url="/ecosystem/data/relations/one-to-many"
    title="One-to-many"
    description="A record references a list of foreign records."
  />
  <PageCard
    icon="ShareIcon"
    url="/ecosystem/data/relations/many-to-many"
    title="Many-to-many"
    description="Records reference lists of each other."
  />
  <PageCard
    icon="ShareIcon"
    url="/ecosystem/data/relations/through"
    title="Through relations"
    description="Reach one collection through a relation of another."
  />
  <PageCard
    icon="ShareIcon"
    url="/ecosystem/data/relations/unique"
    title="Unique relations"
    description="Foreign records associated with a single owner."
  />
  <PageCard
    icon="ShareIcon"
    url="/ecosystem/data/relations/ambiguous"
    title="Ambiguous relations"
    description="Multiple properties referencing the same collection."
  />
  <PageCard
    icon="ShareIcon"
    url="/ecosystem/data/relations/polymorphic"
    title="Polymorphic relations"
    description="A relation to records of multiple collections."
  />
</div>
