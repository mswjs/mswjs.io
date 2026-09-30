---
order: 2
title: sync()
description: Synchronize collection changes across browser tabs.
---

Synchronizes collection changes, like creating, updating, and deleting records, with the same collection in another browser tab via a `BroadcastChannel`.

::: warning
The `sync()` extension is browser-only. It is ignored in Node.js.
:::

```ts
import { z } from 'zod'

const schema = z.object({ id: z.number(), name: z.string() })
// ---cut---
import { Collection } from '@msw/data'
import { sync } from '@msw/data/extensions/sync'

const users = new Collection({
  schema,
  extensions: [sync()],
})
```
