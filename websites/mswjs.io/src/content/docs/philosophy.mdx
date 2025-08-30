---
order: 2
title: Philosophy
description: Mental models behind Mock Service Worker.
---

This page elaborates on the mental models that MSW and, by the extension, _you_ adopt when approaching API mocking. This is a great page to share with people wondering what makes MSW unique on a conceptual level, and for those craving a more practical perspective, we have the [Comparison](/docs/comparison) page prepared.

## Mocking as a standalone layer

Mock Service Worker is simultaneously similar and nothing alike other API mocking solutions. While it provides you with the ability to intercept outgoing requests and mock their responses, it's not coupled with any particular testing or development tooling. This small distinction enables most of the benefits that MSW provides.

**We are convinced that API mocking deserves a layer of its own in your application**. Being able to control the network any time and anywhere may come in handy in various situations, such as testing network-related code or reproducing and debugging a particular network scenario. Such level of control is simply impossible when using API mocking as a feature of any other tooling because you will always be limited by that tooling. There are no limits with MSW.

## Mock vs Network behavior

You may find us seldom using the term "mocks" in this documentation. Historically, there's been a strong negative association with this term as developers come to see mocking as something dirty, unreliable, and hacky. Well, because it was until MSW came along.

MSW utilizes minimal intrusion framework when it comes to intercepting outgoing network traffic. This means having zero changes to your code altogether by using a designated Service Worker in the browser, or implementing custom request interception algorithms in Node.js that focus on the integrity of your code. We've put a ton of effort into respecting your application and, as a favor in return, we're coining a new term—_network behavior_.

**Network behavior is a contract-like description of the network's expected state**. "When request X happens, respond with Y." This is precisely the level of abstraction you will be working with when using MSW, and it is a level that reads, scales, and maintains well.

## Using the platform

If you've used any API mocking solutions in the past, you know how much they can vary in terms of their syntax and implementation. From method chaining to controller definitions, from listing network scenarios in a JSON file to adopting a framework-like routing. There's always a lot of specific knowledge to keep in mind, knowledge that doesn't stretch outside particular tools and, oftentimes, doesn't teach you about what is it you're doing when mocking APIs.

**We see developer education as an inseparable part of the developer experience**. We dedicate constant effort to minimize the amount of library-specific knowledge you need to have to use MSW. Instead, we rely on standard APIs and platform features so you would actually learn how to work with requests and responses (and we would ship less code, which is yay!).

We embrace the [WHATWG Fetch API specification](https://fetch.spec.whatwg.org/), meaning that each intercepted request is an _actual_ `Request` instance, and each mocked response is an _actual_ `Response` instance. We embrace the [Service Worker API](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers) to intercept requests on the browser's network level so that your application and tests would know _nothing_ about mocking in place. We depend on semantics and standards instead of contriving custom APIs to satisfy particular use cases. And this is one of the reasons why so many developers trust us with their CI/CD pipelines.

> For example, this is how you respond with a mocked redirect in MSW:

```js {3-6}
http.get('/old', () => {
  return new Response(null, {
    status: 302,
    headers: {
      Location: '/new',
    },
  })
})
```

## Server's perspective

When working with MSW, you will be writing [request handlers](/docs/http/intercepting-requests/) to intercept and respond to requests. It's important to approach those handlers from the _server's_ perspective since, effectively, you are describing how the server should behave in a particular scenario.
