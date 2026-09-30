---
order: 5
title: Through relations
description: Reach one collection through a relation of another.
---

Since relational properties resolve via getters, there's no need to define special "through" relations to reference one model through a relation from another:

```ts
import { Collection } from '@msw/data'
import { z } from 'zod'

const ownerSchema = z.object({
  name: z.string(),
  get cars() {
    return z.array(carSchema)
  },
})
const carSchema = z.object({
  brand: z.string(),
  get owner() {
    return ownerSchema
  },
})
const mechanicSchema = z.object({
  name: z.string(),
  get car() {
    return carSchema
  },
})
// ---cut---
const owners = new Collection({ schema: ownerSchema })
const cars = new Collection({ schema: carSchema })
const mechanics = new Collection({ schema: mechanicSchema })

owners.defineRelations(({ many }) => ({
  cars: many(cars),
}))
cars.defineRelations(({ one }) => ({
  owner: one(owners),
}))
mechanics.defineRelations(({ one }) => ({
  car: one(cars),
}))

const owner = await owners.create({ name: 'John' })
const car = await cars.create({ brand: 'bmw', owner })
const mechanic = await mechanics.create({ name: 'Kyle', car })

mechanic.car.owner.name // "John"
```

> Although `mechanics` does not define an explicit relation to `owners`, you can get the owner of the car associated with a mechanic through the `car` relation.
