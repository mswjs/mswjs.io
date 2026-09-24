---
order: 3
title: use()
description: Prepend handlers to the current worker instance.
---

## Call signature

```js {6}
import { http } from 'msw/http'
import { worker } from './mocks/browser'

// Prepend a list of new handlers to this worker instance.
// Past this point, they extend the network behavior.
worker.use(http.get('/resource'), http.post('/resource'))
```

::: info
  Similar to `worker.start()`, you can spread a list of handlers as
  arguments to the `worker.use()` method. No need to call it multiple times!
:::

The prepended handlers persist on the worker as long as the current runtime exists (thus, they are often referred to as "runtime handlers").

## Related materials

- Runtime handlers (part of a new `docs/basics/request-handler#runtime-request-handlers` section)
- [Network behavior overrides](/guides/best-practices/network-behavior-overrides)
