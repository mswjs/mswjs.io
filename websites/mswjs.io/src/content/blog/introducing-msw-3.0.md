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

> In this post, I will showcase only a subset of changes. Please see the [Release notes](https://github.com/mswjs/msw/releases/tag/v3.0.0) for the full list or the migration guidelines if you prefer the A/B format more:

<PageCard
  icon="CommandLineIcon"
  url="/docs/migrations/2.x-to-3.x"
  title="2.x - 3.x"
  description="Migration guidelines for version 3.0"
/>

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

const api = graphql.link('https://myapp.us-east-1.amazonaws.com/graphql')

export const handlers = [
  api.subscription('OnCreateMessage', ({ subscription }) => {
    subscription.publish({
      data: {
        messageCreated: {
          content: 'Welcome, subscriptions!',
          createdAt: Date.now(),
        },
      },
    })
  }),
]
```

## Network API

This major release has given us the perfect opportunity to rethink what the network interception actually is. What you want to do with any API mocking tool is, effectively, this:

- You have a bunch of network requests coming from somewhere (e.g. your app).
- You want to handle some of them using your handlers.

This outlines two fundamental layers of the network interception: network _sources_ and network _handlers_. MSW now facilitates both in a new `defineNetwork` API:

```ts
import { http } from 'msw/http'
import { defineNetwork, InterceptorSource } from 'msw/experimental'
import { HttpRequestInterceptor } from '@mswjs/interceptors/http'

const network = defineNetwork({
  // Sources describe where the network is coming from.
  // It can be this process, or a remote process, or an HAR file.
  sources: [
    new InterceptorSource({ interceptors: [new HttpRequestInterceptor()] }),
  ],
  handlers: [http.get('https://api.example.com/user/:userId', resolver)],
})

await network.enable()
```

The new API brings new primitives to the table, such as `NetworkSource`, `HandlersController`, and many more to help customize the network interception to your needs. Want the default `setupServer` behavior but using a different set of interceptors? Want to replay a session from an `*.har` file against your handlers? Want to ditch the Service Worker and let a third-party test runner decide when requests happen? All of those and many more is now possible with MSW.

The `defineNetwork` API is a direct replacement for the historical `setupServer`/`setupWorker` dichotomy and is going to replace the two in the future releases entirely. In fact, some of our newest ecosystem packages, like `@msw/cloudflare`, are already exposing you the `network` as the public API:

```ts
import { setupNetwork } from '@msw/cloudflare'

const network = setupNetwork()
await network.enable()
```

> Here, `setupNetwork` is a pre-configured `defineNetwork` function tailored to the workerd environment.

As you no doubt noticed, this API is currently experimental and will remain so until we thoroughly test it for ergonomics and make sure it handles any scenario you can throw at it. Both `setupServer` and `setupWorker` are implemented using `defineNetwork` already so you're helping us improve it without ever importing it directly. If you're authoring tools that use MSW, please consider switching to the new API and let us know if you encounter any issues.

## Socket-based network interception

Before we close up, there's one more thing I wanted to share with you. While we spend our engineering days fixing problems, it's quite rare that we get to _solve_ them. One of the hardest problems to solve for MSW has been the network interception in Node.js. There's no Service Workers in Node.js. There's no built-in API that would tell you that a request has happened or a response has arrived. We've built a custom algorithm since day one and poured an absurd amount of time into the research behind it, pushing it beyond what anyone thought was possible with every release.

I am, of course, talking about the [Interceptors](https://github.com/mswjs/interceptors) library. Its goal has always been a transparent network interception that runs as much of your code _and_ Node.js code even when mocking APIs. Its goal has always been to be available for anyone building their own API mocking solutions to benefit from MSW's philosophy without necessarily committing to its public APIs. Libraries like Nock already rely on it to have first-class interception for their users.

But building Interceptors wasn't exactly easy. Intercepting requests by still performing them is still on oxymoron for many developers, despite the library doing precisely that.

The history of our approach to this problem is the history of moving the interception layer down the network code. Here's a brief:

```ts
// 1. We began with patching "node:http".
// This is what your average API mocking library does in Node.js.
http.get = function mockGet() {}

// 2. Then, we augmented node.ClientRequest.
class CLientRequestOverride extends ClientRequest {}

// 3. After, we moved the interception to agents and sockets.
class MockHttpAgent extends http.Agent {}
class MockHttpSocket extends net.Socket {}
```

Every advancement in this algorithm was to fix a certain set of problems. Today, I'm stocked to announce that we've _solved_ the network interception in Node.js by adopting the socket-based interception.

The new architecture of Interceptors doesn't patch request clients, or internal classes, or agents. It doesn't even patch the sockets themselves, not in the way you'd think. What it does is bring the interception to the TCP and TLS wraps, which are JavaScript bindings for the Node.js network code in C.

**Moving the interception any lower would require recompiling Node.js**.

It is immensely gratifying to have near a decade of research and seven attempts at this algorithm to finally ship it with MSW. This is a thankless, invisible work. It's successful if you don't notice it. That being said, the new architecture enables things that you will notice, such as support for other network protocols, like SMTP!

You won't believe me, but this is my trying to make it short. This technological advancement deserves a long post on its own, but to summarize, this is how the new architecture works:

- We intercept any socket connections, regardless of the protocol;
- Each interceptor pipes the data packets sent via the socket through a respective parser, like `llhttp`;
- If the parser confirms an expected network message (e.g. an HTTP request), the interceptor kicks in.

```ts
class HttpRequestInterceptor {
  setup() {
    const socketInterceptor = new SocketInterceptor()

    socketInterceptor.on('connection', ({ socket, controller }) => {
      socket.once('data', (chunk) => {
        if (!isHttpMessage(chunk)) {
          return
        }

        parser.pipe(chunk)
      })
    })
  }
}
```

> Here's a pseudo-code example of what this architecture looks like in practice. You are free to [browser the actual source](https://github.com/mswjs/interceptors) on GitHub.

This means we can listen to raw connections as well as protocol-bound messages. This also means you can implement your own interceptors and route the raw bytes through whatever parser or machinery you want to expand on what gets intercepted and how.

MSW has reduced the need to patch `global.fetch` in the browser to zero. Now it did the same for the entirety of Node.js. A pretty big deal, if I may say so myself!

## Updating

```
npm i msw@latest
```

While this post can make it seem like not much has changed for you in practice, we are making a major release for a reason. Things have been deprecated and removed. APIs have changed. We highly recommend you read through the migration guidelines for mode detail on how to migrate to MSW 3.0:

<PageCard
  icon="CommandLineIcon"
  url="/docs/migrations/2.x-to-3.x"
  title="2.x - 3.x"
  description="Migration guidelines for version 3.0"
/>

## Special thanks

This release would have not been possible without the support of our incredible sponsors:

- [Cathal Mac Donnacha](https://github.com/cmacdonnacha)
- [Chromatic](https://github.com/Chromatic)
- [Eric Casthart](https://github.com/pushred)
- [Erik Rasmussen](https://github.com/erikras)
- [Jonathan Ortega](https://github.com/Jhony0311)
- [Khaled Mohamed](https://github.com/KhaledMohamedP)
- [Kraken Tech](https://github.com/kraken-tech)
- [Laststance.io](https://github.com/laststance)
- [Materialize, Inc.](https://github.com/MaterializeInc)
- [Matija Marohnić](https://github.com/silvenon)
- [Nicholas Decker](https://github.com/niccholaspage)
- [Replay](https://github.com/replayio)
- [Ryan Magoon](https://github.com/ryanmagoon)
- [Santosh Yadav](https://github.com/santoshyadavdev)
- [Sent](https://github.com/sentdm)
- [StackBlitz](https://github.com/stackblitz)
- [Todoist Inc](https://github.com/Doist)
- [Workleap IT](https://github.com/Infra-Workleap)

as well as our partners:

- [CodeRabbit](https://coderabbit.link/mswjs)
- [Chromatic](https://www.chromatic.com/?ref=mswjs)
- [Workleap](https://workleap.com/?ref=mswjs)
