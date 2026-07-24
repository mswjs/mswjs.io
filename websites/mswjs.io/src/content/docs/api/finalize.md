---
title: finalize
description: Schedule cleanup after the request handler completion.
---

## Call signature

```ts
function finalize(callback: () => Promise<void> | void): void
```

> Note that `finalize()` has no effect on the surrounding response resolver's closure. You cannot await it and you must not make it a dependency of any of your request handler logic.

## Examples

The `finalize()` function is designed exclusively to help you orchestrate cleanup for your request handlers. For example, you might establish side effects like intervals and timeouts when handling [Server-Sent Events](/docs/sse/). Use the `finalize()` function to clear those side effects.

```ts /finalize/
sse('/ping', ({ client, finalize }) => {
  const interval = setInterval(() => client.send({ data: 'pong' }), 250)
  const timeout = setTimeout(() => client.close(), 1000)

  finalize(() => {
    clearInterval(interval)
    clearTimeout(timeout)
  })
})
```

There are no restrictions as to how you want to arrange your cleanup. You can have a single or multiple `finalize()` calls. If you have multiple `finalize()` calls, they will be called per the LIFO (last-in, first-out) principle when the handler is finished.

```ts
sse('/', ({ finalize }) => {
  finalize(a) // "a" is called last.
  finalize(b) // "b" is called first.
})
```

### Usage with iterators

If your response resolver is an iterator, the callbacks provided to `finalize()` are executed _only when the iterator is done_.

```ts
http.get('/resource', function* ({ finalize }) {
  finalize(cleanup)

  yield new Response('first')
  yield new Response('second')
  return new Response('third')
})
```

> Above, the `cleanup` function will be called after the third response is sent from the resolver.

### Unhandled exceptions

The callbacks you provide to `finalize()` run even if the response resolver throws, including both throwing mocked responses and throwing errors. Any unhandled exceptions occurring in the callbacks to `finalize()` are grouped into a single `AggregateError` and printed after all the callbacks have run.
