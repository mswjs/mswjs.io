---
title: Why Use Mock Service Worker?
slug: why-mock-service-worker
description: When there are so many API mocking tools, why would you ever choose Mock Service Worker?
publishedAt: 2024-01-10
thumbnailUrl: /thumbnails/why-use-msw.png
author:
  name: Artem Zakharchenko
  twitterHandle: kettanaito
keywords:
  - msw
  - why
  - advantage
  - benefits
  - api
  - mocking
  - mock service worker
  - javascript
---

I doubt you can build a meaningful application without communicating with some APIs one way or the other. Whenever you do, you reach out to API mocking to establish proper boundaries in testing and even help you prototype and debug more efficiently. As it often happens in JavaScript, there are a lot of options to choose from to add API mocking to your project. I happened to build one of those options, and so today I'd like to talk about why to even consider using Mock Service Worker in your project.

> This isn't a comparison post. We have quite an extensive [Comparison](https://mswjs.io/docs/comparison) between MSW and its alternatives in the documentation already. I see no reason to repeat that. Instead, let's focus on what makes MSW stand out in a general.

## Integrity

You might have heard me refer to MSW as "seamless" sometimes. That is not a fancy marketing term. The library rightfully deserves it by promoting, encouraging, and implementing mocking strategies that do not compromise the integrity of your application. Here's what I mean by that.

In my Egghead series on API mocking, I go into depth on how [Request interception algorithms work](https://egghead.io/blog/understanding-api-mocking-request-interception-algorithms). In a nutshell, it's been universally accepted that stubbing the request client is the way to go. It looks something like this in practice:

```jsx
// Store the original fetch for future use.
const originalFetch = window.fetch

// Rewrite the fetch for the whole client.
window.fetch = async (input, init) => {
  // Get the mocked response from somewhere.
  const mockedResponse = await resolveFromMocks(new Request(input, init))

  // If found, use the mocked response.
  if (mockedResponse) {
    return mockedResponse
  }

  // If not found, perform the original request.
  return originalFetch(input, init)
}
```

While this, indeed, achieves request interception and API mocking, request client stubbing introduces a significant change to your application. Think about it this way: in a mocked response scenario, _no actual logic of `window.fetch` is being run_. Ever.

You would be mistaken to assume you can throw that logic away without any repercussions. Say, you are accidentally making a `Request` that doesn't make sense:

```js
// Here I'm constructing a GET request with a body.
fetch('/resource', { body: 'Hello world' })
```

**If this was a real request**, it would throw an exception:

```
Request with GET/HEAD method cannot have body.
```

This is the Fetch API trying to warn you about a mistake you're making. Warning by crashing your app, that is. You shouldn't be making requests like that but if you stub `window.fetch`, suddenly, you can. To make things worse, you will never know about this mistake until you disable the mocks. Until your app crashes in production and makes your users angry.

Let's take a look at another example. Imagine you made a typo in the request URL:

```js
// That protocol doesn't quite look right...
fetch('htps:/example.com/resource')
```

That's certainly not the right protocol scheme and, as a consequence, an invalid URL.

**If this was a real request**, the `window.fetch` would get your back once again by throwing an exception:

```
URL scheme "htps" is not supported.
```

But since you are in the self-inflicted alternative universe of a stubbed `window.fetch`, it will never error because the browser logic that does the URL parsing is never called, and the only place this will crash is—you guessed it—in production.

Notice a repeating pattern here: **If this was a real request**. Because when stubbing request clients, you are no longer making real requests. Those same requests your application will make for the users. Gone. In fact, _you are not making any requests at all_. You can see that by opening the Network tab in your DevTools and witness how empty and lonely it is while your application "communicates" with the mocked API.

### How MSW solves integrity

Since its inception, MSW heavily relies on JavaScript standards. The premise of the library, which is also 66% of its name, is the usage of the Service Worker API to intercept requests in the browser.

Unlike the conventional request client stubbing, the Service Worker allows us to intercept requests _after_ they are being dispatched by your application. This means _after_ `window.fetch` is finished its business. Such requests actually happen, are observable in the network traffic, and are responded to with mocks on the browser level. **Your application doesn't even know there's a mocked API involved**.

As a free win, because the interception happens "higher" in the request chain, MSW is oblivious to the request clients you are using. Whether it's the native `window.fetch`, or `axios`, or Apollo—everything results in a network entry, and everything gets intercepted by the Service Worker without stubs and patches.

There is simply no better, cleaner way to intercept and manage your HTTP communication in the browser.

## Reusability

It pains me to see that in 2024 API mocking is still considered a feature of particular testing frameworks. I assure you, it is not. Not only API mocking deserves its standalone layer, but it truly shines only once you give it one.

I respect and admire the work so many teams have done to give us API mocking capabilities in JavaScript. I learned a lot from those APIs. But we must acknowledge that repeating oneself over and over to achieve the same thing in different frameworks is a primary symptom of inefficiency.

If you're testing an average JavaScript application, you are writing integration tests with tools like Vitest, and also end-to-end tests with something like Playwright. You may be developing your components in Storybook. You may have a server-side route or two to handle with Fastify. All of those are exceptional tools. They may give you their own recommended way to become in control of the network.

The problem is, those tools are looking at different directions because, well, they are different tools! If you keep mocking APIs everywhere individually, you inevitably end up with a bunch of repeating, incompatible network descriptions. There is no reusability, no common ground. Static JSON fixtures for mocked responses is your best bet.

### How MSW solves reusability

At the moment of writing this, MSW is the only tool in JavaScript that allows you to reuse API mocks across the entire stack. It has been such a tool for the half a decade and I have a strong feeling that won't change much in another decade to follow.

The point of MSW is a single network layer. You describe the API behavior you want using [Request handlers](https://mswjs.io/docs/basics/intercepting-requests), and then integrate them into whichever environment you want. "Environment", not "tooling".

Going environment-first might have been the most defining decision in MSW. By doing so, it automatically supports any tools that exist and any tools that ever will exist. MSW works in the browser and in Node.js. That is quite literally 100% of any JavaScript tooling out there.

You can use MSW with Jest and Vitest, Cypress and Playwright, Storybook and Electron, Express and Fastify… The best part about this is there's no need for any plugins or configurations. No `msw-vitest-adapter`. A single environment—a single point of entry. I truly believe this is what API mocking experience should have been all along.

## Standardization

For a long while, the client-side and the server-side JavaScript used to live in different worlds. The way you made requests in the browser was as different as it could get compared to requests in Node.js. That resulted in API mocking libraries coming up with APIs to help you control the network in both environments. They required you to learn and memorize all those contrived APIs to achieve your goal.

Presently, the Fetch API is a great common ground to merry the client and the server. There is no longer need to design custom request and response representations for the purposes of mocking. If anything, that is rather harmful for developers. I certainly want MSW users to learn how requests and responses work in JavaScript, not in MSW.

### How MSW solves standardization

[Since the 2.0 release](https://mswjs.io/blog/introducing-msw-2.0), MSW fully embraces the Fetch API standard and allows you to handle requests and responses according to the Fetch API specification. This works for both browser and Node.js, and finally makes you learn JavaScript, and not some third-party library.

This means less need to consult the docs, fewer things to learn, and more things to reuse and carry out from MSW and into other aspects of development. I believe it's the purpose of any tool to help developers become better at their craft while achieving their particular goals. And that is the key philosophy behind design decisions in MSW.

## Transparency

This may be the weakest point practically-speaking, but I find tremendous value in MSW being truly open source. There's no company behind it, the library isn't a gateway to lure you to a paid product or service. We certainly suffer a lot from that financially but hey, at least you get a transparent development, community support, and assurance the library always puts **your** interests first.

If you appreciate this, please consider [supporting MSW on GitHub](https://github.com/sponsors/mswjs). Send this article to your CTO. Give MSW a try by going through the [Getting started tutorial](https://mswjs.io/docs/quick-start) and browsing our [Examples](https://github.com/mswjs/examples/tree/main). If you are using it already, give an internal talk at work about how MSW helps you ship with more confidence. We would appreciate that very much!
