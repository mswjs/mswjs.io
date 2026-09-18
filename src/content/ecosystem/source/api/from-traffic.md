---
order: 1
title: fromTraffic
description: Generate request handlers from a HAR file.
---

The `fromTraffic` function generates request handles from the given HAR document.

## Call signature

```ts
import { fromTraffic } from '@msw/source/traffic'

fromTraffic(archive)
fromTraffic(archive, mapFn)
```

> The optional `mapFn` argument lets you modify or skip individual HAR entries before they become request handlers.

## Usage

The `fromTraffic` function accepts a _parsed_ HAR file, which is a plain JavaScript object. Depending on your project, you can either import the `*.har` file directly, or read it from the file system and parse it via `JSON.parse()`.

```js /fromTraffic/
import { fromTraffic } from '@msw/source/traffic'
import har from './api.har'

const handlers = fromTraffic(har)
```

## Related materials

<PageCard
  icon="GlobeAltIcon"
  url="/ecosystem/source/integrations/har"
  title="Network archive (HAR)"
  description="Generate request handlers from HAR files."
/>
