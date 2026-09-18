---
order: 3
title: persist()
description: Persist records between page reloads.
---

Persists the records of the collection between page reloads.

::: warning
The `persist()` extension is browser-only. It is ignored in Node.js.
:::

```ts
import { z } from 'zod'

const schema = z.object({ id: z.number(), name: z.string() })
// ---cut---
import { Collection } from '@msw/data'
import { persist } from '@msw/data/extensions/persist'

const users = new Collection({
  schema,
  extensions: [persist()],
})
```
