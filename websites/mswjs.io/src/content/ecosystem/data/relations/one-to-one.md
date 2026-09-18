---
order: 2
title: One-to-one
description: A record references a single foreign record.
---

Use the `one()` relational utility to describe a property that references a single record of another collection:

```ts
import { Collection } from '@msw/data'
import { z } from 'zod'
// ---cut---
const userSchema = z.object({
  // In Zod, relational properties are best described as getters
  // so they can produce self-referencing schemas.
  get country() {
    return countrySchema
  },
})
const countrySchema = z.object({ code: z.string() })

const users = new Collection({ schema: userSchema })
const countries = new Collection({ schema: countrySchema })

// Declare the relations on the `users` collection.
users.defineRelations(({ one }) => ({
  // `user.country` is a one-of relation to the `countries` collection.
  country: one(countries),
}))

const user = await users.create({
  country: await countries.create({ code: 'usa' }),
})
user.country // { code: 'usa' }
```
