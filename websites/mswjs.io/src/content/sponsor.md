---
layout: page
title: Sponsor
description: Support API mocking on the web by becoming a sponsor.
---

<script setup>
import SponsorPage from '../../.vitepress/theme/pages/SponsorPage.vue'
</script>

<SponsorPage>
<template #before>

```js
// Mocking GET /api/user in a test.
jest.spyOn(window, 'fetch').mockResolvedValue({
  ok: true,
  status: 200,
  json: async () => {
    return { name: 'Ada' }
  },
})

// Tied to Fetch. Tied to this test setup.
// A different client needs a different mock.
```

</template>
<template #after>

```js
// Your mocks describe what the API returns.
import { http, HttpResponse } from 'msw'

export const handlers = [
  http.get('/api/user', () => {
    return HttpResponse.json({
      name: 'Ada',
    })
  }),
]
// Reuse in tests, development, and Storybook.
```

</template>
<template #dependencies>

```json:no-line-numbers {7}
{
  "name": "your-app",
  "private": true,
  "dependencies": {
    "axios": "1.20.0",
    "lit": "3.3.3",
    "msw": "latest",
    "vue": "3.5.42",
    "zod": "4.5.4"
  }
}
```

</template>
</SponsorPage>
