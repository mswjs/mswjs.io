---
order: 2
title: Getting started
description: Create a collection, seed it with records, and query them.
---

## Install

Add `@msw/data` as a dependency to your project:

<div class="copyable-code">

::: code-group

```sh [npm]
npm install @msw/data --save-dev
```

```sh [pnpm]
pnpm add @msw/data --save-dev
```

:::

</div>

## Create a collection

You start by defining a data _collection_. A collection holds records of the same shape, described by a schema.

```ts
import { Collection } from '@msw/data'
import { z } from 'zod'

const users = new Collection({
  schema: z.object({
    id: z.number(),
    name: z.string(),
  }),
})
```

> Above, we are using [Zod](https://zod.dev/) to describe the `schema` for the users collection. You can use whichever [Standard Schema](https://standardschema.dev/) compliant library of your choice instead.

## Seed the collection

Next, let's put some values into the collection. Those values are called _records_. Create individual records via the `.create()` method or a bunch of them with `.createMany()`:

```ts
import { Collection } from '@msw/data'
import { z } from 'zod'
import { faker } from '@faker-js/faker'

const users = new Collection({
  schema: z.object({
    id: z.number(),
    name: z.string(),
  }),
})
// ---cut---
await users.create({ id: 1, name: 'John' })

await users.createMany(5, (index) => ({
  id: index + 1,
  name: faker.person.firstName(),
}))
```

> Combine `.createMany()` with tools like [Faker](https://fakerjs.dev/) for random values in your records.

## Use the collection

From this point on, you can use the `users` collection for anything data-related: create more records, query them, define relations to other collections, update and delete records.

```ts
import { Collection } from '@msw/data'
import { z } from 'zod'
import { faker } from '@faker-js/faker'

const users = new Collection({
  schema: z.object({
    id: z.number(),
    name: z.string(),
  }),
})
// ---cut---
const john = users.findFirst((q) => q.where({ name: 'John' }))
```

Learn more about what you can do with the library in the following sections:

<div class="page-card-grid grid gap-5 md:grid-cols-2">
  <PageCard
    icon="MagnifyingGlassIcon"
    url="/ecosystem/data/querying"
    title="Querying"
    description="Target records with queries and logical operators."
  />
  <PageCard
    icon="ShareIcon"
    url="/ecosystem/data/relations/"
    title="Relations"
    description="Connect records across collections."
  />
</div>
