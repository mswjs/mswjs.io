---
order: 1
standalone: true
title: Extensions
description: Extend the behavior of collections.
---

You can extend the behavior of collections via _extensions_. Provide them in the `extensions` option of a collection:

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

## Default extensions

The library comes with the following extensions:

<div class="page-card-grid grid gap-5 md:grid-cols-2">
  <PageCard
    icon="ArrowPathIcon"
    url="/ecosystem/data/extensions/sync"
    title="sync()"
    description="Synchronize collection changes across browser tabs."
  />
  <PageCard
    icon="CircleStackIcon"
    url="/ecosystem/data/extensions/persist"
    title="persist()"
    description="Persist records between page reloads."
  />
</div>

## Custom extensions

Create your own extension with the `defineExtension()` function from `@msw/data/extensions`. The `extend()` function receives the collection to extend:

::: code-group

```ts [my-extension.ts]
import { defineExtension } from '@msw/data/extensions'

export function myExtension() {
  return defineExtension({
    name: 'my-extension',
    extend(collection) {
      // Your logic here.
    },
  })
}
```

```ts [collections.ts]
import { z } from 'zod'

const schema = z.object({ id: z.number(), name: z.string() })
// ---cut---
import { Collection } from '@msw/data'
import { myExtension } from './my-extension.js'

new Collection({ schema, extensions: [myExtension()] })
```

:::
