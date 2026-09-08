---
title: Introducing MSW 3.0
slug: introducing-msw-3.0
description: ESM, GraphQL subscriptions, and the best interception algorithm in the world.
publishedAt: 2026-10-01
thumbnailUrl: /thumbnails/introducing-msw-2.0.png
author:
  name: Artem Zakharchenko
  twitterHandle: kettanaito
keywords:
  - msw
  - '3.0'
  - v3
  - subscription
  - socket
aside: false
outline: false
editLink: false
lastUpdated: false
prev: false
next: false
---

It's hard to believe it's been almost three years since the announcement of [v2.0](http://localhost:5173/blog/introducing-msw-2.0). Adopting the Fetch API primitives for API mocking has helped us ship the unmatched developer experience, flatten the learning curve, and even uncover a few bugs in Node.js. All thanks to the fact that hundreds of thousands of developers simply started interfacing with the Fetch API more often.

Today marks a new chapter in the library's development, but in many aspects, it is really a continuation of the effort started years ago. While v3.0 minimizes the number of breaking changes, it is nonetheless a big step in how MSW works and what it can do, making it nothing short of remarkable.

Please join me as we unveil what's new in version 3.0.

## Ecosystem improvements

Next month, MSW is celebrating its 8th birthday. Any software that exists for an extended period of time garners a sizable amount of technical debt and internal TODOs that seldom find the time and attention they deserve. It is with a wide grin that I'm happy to say that v3.0 was the time for us to address that debt, fiddle with internal refactorings, and improve the library's position in the ecosystem as a whole.

### ESM-only

**Starting since v3.0, MSW is ESM-only**. It's been authored in ESM for years and now it ships as one natively to everyone. ESM is the future of JavaScript and we are glad to contribute to its adoption, even if a little.

### Granular entrypoints.

Adopting ESM meant we have to be more mindful of the way we ship things. A single `msw` import can pull _megabytes_ from the import graph, which is nothing short of disasterous in the environments that don't have tree shaking, like the browser.

With v3.0, we are providing a new, more bandwidth-efficient way to import MSW through designated _entrypoints_:

```ts
import { http } from 'msw/http'
import { graphql } from 'msw/graphql'
import { sse } from 'msw/sse'
import { ws } from 'msw/ws'
```

> TODO: What happens to the `msw` root import? Only utils?

### Node.js support

This major version is a good opportunity to deprecate support for Node.js v18 and v20 in a single sweep. In exchange, we extend our support matrix to Node.js v22, v24, and v26, all used as the target matrix for each subsequent release.

### Trimming dependencies

We've managed to drop a number of dependencies, making your `node_modules` a tad lighter. Primarily:

- `graphql` (yes, it's finally a proper optional peer dependency 🎉)
- `path-to-regexp`
- `picocolors`
- `statuses`
- and `strict-event-emitter`

> TODO: Mention how many MBs that shaves off.

## GraphQL subscriptions

Building on top of the [WebSocket interception](/blog/enter-websockets), we are finally completing the full GraphQL support by adding subscriptions. It feels nice to say that MSW offers not just the best, but also the fullest way to mock GraphQL APIs on the web.

```ts
import { graphql } from 'msw/graphql'

const api = graphql.link('...')

export const handlers = [
  api.subscription('', ({ pubsub }) => {
    // ...
  })
]
```

## Network API

- `defineNetwork` as the main primitive. Truly dynamic network interception.

## Socket-based network interception

## Special thanks

[Companies and people who made this release possible].
