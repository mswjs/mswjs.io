---
order: 1
title: Message events
description: Mocking server message events.
keywords:
  - sse
  - message
  - default
  - payload
---

You can send a mock message event to the client by calling `client.send()` and providing it with the message data:

```ts {5}
import { sse } from 'msw'

export const handlers = [
  sse('/stream', ({ client }) => {
    client.send({ data: 'hello world' })
  }),
]
```

> Providing an explicit `event: 'message'` has no effect and is equivalent to not providing the `event` property at all.

This will result in the following message received by the client:

```
data:hello world

```

## Payload

You can send any serializable payload as the message data. For example, you can send a JSON:

```ts {2-7}
client.send({
  data: {
    user: {
      id: 'abc-123',
      name: 'John',
    },
  },
})
```

## Custom event ID

You can attach a [custom ID field](https://html.spec.whatwg.org/multipage/server-sent-events.html#event-stream-interpretation) to the sent message event by providing the `id` property alongside the sent event:

```ts {2}
client.send({
  id: '1',
  data: 'hello world',
})
```

```
id:1
data:hello world

```

> Note: event ID must be a string.

## TypeScript

You can annotate the data type of the message event by providing a type argument object to the `sse` function and including the `message` key in it:

```ts /{ message: 'hello world' }/
sse<{ message: 'hello world' }>('/stream', ({ client }) => {
  client.send({ data: 'hello world' }) // ✅
  client.send({ data: 'goodbye cosmos' }) // ❌
})
```
