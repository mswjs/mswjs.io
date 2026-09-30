---
order: 1
title: Introduction
description: Spawn an HTTP server from your request handlers.
---

Serve is a library for turning your [Mock Service Worker](/docs/) handlers into an actual HTTP server. You can spawn a standalone server or apply the handlers as a middleware to an existing [Express](/ecosystem/serve/integrations/express), [Hono](/ecosystem/serve/integrations/hono), or [Fastify](/ecosystem/serve/integrations/fastify) server.

## When to use mock servers?

::: warning
For mocking purposes, prefer using [Mock Service Worker](/docs/quick-start) directly over standlone mock servers as those have a number of downsides that degrade the overall experience and quality of the test setup:

- Require changing your request URLs to be against the mock server;
- Require additional development and test setup;
- Significantly slower compared to in-process network interception.
- Effectively mean writing and maintaining a real server for mock purposes.
:::

There are, however, genuine use cases when a designated mock server is beneficial:

- When you wish to `curl` your mock definitions locally;
- When mocking API in applications written in a language other than JavaScript;
- When integrating API mocking in a complex application architecture (e.g. for dockerized applications).

## Features

The primary feature of Serve is that it allows you to reuse your existing MSW handlers as yet another source of truth, this time expanding beyond JavaScript and supporting more advanced architectural scenarios. Serve automatically translates your HTTP, GraphQL, and WebSocket mocks to appropriate server-side handlers for a standalone server or one of the supported server frameworks.

## Start here

Follow this tutorial to spawn a local HTTP server from your MSW handlers:

<PageCard
  icon="WindowIcon"
  url="/ecosystem/serve/getting-started"
  title="Getting started"
  description="Three steps to get started with Serve."
/>
