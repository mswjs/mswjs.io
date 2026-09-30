---
order: 3
title: use()
description: Prepend handlers to the current server instance.
---

## Call signature

```js
import { http } from 'msw/http'
import { setupServer } from 'msw/node'

const server = setupServer()

server.use(http.get('/resource', resolver), http.post('/resource', resolver))
```

The prepended handlers persist on the server instance as long as the current Node.js runtime exists.

## Related materials

- [Network behavior overrides](/guides/best-practices/network-behavior-overrides)
- [Network behavior overrides](/guides/best-practices/network-behavior-overrides)
