---
order: 5
title: Storybook
description: Mock API requests in Storybook with Mock Service Worker.
keywords:
  - storybook
  - components
  - addon
  - browser
---

Use the official `msw-storybook-addon` package to define network behavior
globally or for individual stories.

## Install

```sh
npm install --save-dev msw msw-storybook-addon
npx msw init ./public --save
```

Replace `./public` with your Storybook static directory when it differs.

## Configure Storybook

Add the addon in `.storybook/main.ts`.

```ts [.storybook/main.ts]
export default {
  addons: ['msw-storybook-addon'],
}
```

Configure its loader in `.storybook/preview.ts`.

```ts [.storybook/preview.ts]
import { mswLoader } from 'msw-storybook-addon/csf3'

export default {
  loaders: [mswLoader()],
}
```

## Provide handlers

Use the `msw` story parameter to declare request handlers.

```ts [user-profile.stories.ts]
import { http, HttpResponse } from 'msw'

export const UserProfile = {
  parameters: {
    msw: [
      http.get('/user', () => {
        return HttpResponse.json({ name: 'John Maverick' })
      }),
    ],
  },
}
```

See the
[`msw-storybook-addon` repository](https://github.com/mswjs/msw-storybook-addon)
for CSF Next setup and advanced configuration.
