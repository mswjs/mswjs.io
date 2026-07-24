---
order: 3
title: use()
description: Prepend request handlers to the current server instance.
---

## Call signature

```js
import { http } from 'msw'
import { setupServer } from 'msw/node'

const server = setupServer()

server.use(http.get('/resource', resolver), http.post('/resource', resolver))
```

The prepended request handlers persist on the server instance as long as the current Node.js runtime exists.

## Related materials

- [Runtime request handlers](/docs/basics/request-handler#runtime-request-handlers)
- [Network behavior overrides](/docs/best-practices/network-behavior-overrides)
