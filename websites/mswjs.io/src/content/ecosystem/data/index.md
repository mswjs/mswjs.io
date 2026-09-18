---
order: 1
title: Introduction
description: Data querying library for testing JavaScript applications.
---

Data is a library for modeling and querying data when testing and developing JavaScript applications. It acts as a convenient way of creating schema-based fixtures and querying them with a familiar ORM-inspired syntax. You can use it standalone or together with [Mock Service Worker](/docs/) for a seamless mocking experience on both the network and the data layers.

```ts
import { Collection } from '@msw/data'
```

## Features

- **Standard Schema.** Relies on [Standard Schema](https://standardschema.dev/) instead of inventing a proprietary modeling syntax you have to learn. Describe your data with any compliant library, like Zod, ArkType, Valibot, yup, and many others.
- **Runtime and type safety.** Records are validated against your schema and typed from it.
- **Powerful [querying](/ecosystem/data/querying)** inspired by Prisma.
- **[Relations](/ecosystem/data/relations/)** for database-like behaviors, inspired by Drizzle.
- **[Extensions](/ecosystem/data/extensions/)**, including custom ones, for things like cross-tab collection synchronization or record persistence.

## Start here

If you've never used Data before, here's the best place to start:

<PageCard
  icon="WindowIcon"
  url="/ecosystem/data/getting-started"
  title="Getting started"
  description="Create a collection, seed it with records, and query them."
/>
