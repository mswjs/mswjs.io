---
order: 2
title: Custom events
description: Mocking custom server events.
keywords:
  - sse
  - custom
  - event
  - mock
---

You can specify the custom event type by providing the `event` key on the client message:

```ts {6}
import { sse } from 'msw'

export const handlers = [
  sse('/stream', ({ client }) => {
    client.send({
      event: 'greeting',
      data: 'hello world',
    })
  }),
]
```

This will result in the following message received by the client:

```
event:greeting
data:hello world

```

## Custom event ID

You can attach a [custom ID field](https://html.spec.whatwg.org/multipage/server-sent-events.html#event-stream-interpretation) to the sent custom event by providing the `id` property alongside the sent event:

```ts {2}
client.send({
  id: '1',
  event: 'greeting',
  data: 'hello world',
})
```

```
id:1
event:greeting
data:hello world

```

## TypeScript

You can annotate the data type of your custom events by providing a type argument object to the `sse` function and including the event names as keys on that object:

```ts /{ greeting: 'hello world' }/1
sse<{ greeting: 'hello world' }>('/stream', ({ client }) => {
  client.send({ greeting: 'hello world' }) // ✅
  client.send({ greeting: 'goodbye cosmos' }) // ❌
})
```

> Note that the `message` key is reserved for the default message data type. You can combine both the default `message` data type and custom events within the same type.
