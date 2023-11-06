---
title: Dynamic mock scenarios
---

When developing or presenting your work, you may need to switch between different mock scenarios on runtime. Going to the source code in the middle of a demo isn't a good experience for your audience.

One of the ways to achieve this is to declare a set of scenarios (handler overrides) and conditionally apply them based on some runtime criteria, like query parameters.

```js
// mocks/scenarios.js
import { http, HttpResponse } from 'msw'

export const scenarios = {
  success: [
    http.get('/user', () => {
      return HttpResponse.json({ name: 'John Maverick' })
    }),
  ],
  error: [
    http.get('/user', () => {
      return new HttpResponse(null, { status: 500 })
    }),
  ],
}
```

```js
// mocks/browser.js
import { handlers } from './handlers'
import { scenarios } from './scenarios'

// Since the worker is registered on the client, you can read
// the page's query parameters before assigning request handlers.
const scenarioName = new URLSearchParams(window.location.search).get('scenario')
const runtimeScenarios = scenarios[scenarioName] || []

const worker = setupWorker(...runtimeScenarios, ...handlers)
```

> Note that the order of handlers is important: the left-most handlers take precedence during request resolution.

Now, if you wish to see how your application behaves if the `GET /user` endpoint returns a `500 Internal Server Error` response, simply navigate to the page you need with the proper `scenario` query parameter:

```txt /?scenario=error/
http://localhost:3000/dashboard?scenario=error
```
