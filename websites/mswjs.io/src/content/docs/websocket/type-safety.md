---
order: 4
title: Type safety
---

Bringing type safety to the WebSocket communication is essential when using TypeScript, and that includes your handlers too! That being said, MSW intentionally doesn't support any type arguments to annotate the outgoing/incoming events:

```ts
import { ws } from 'msw'

ws.link<Arg1, Arg2>(url)
//     ^^^^^^^^^^^^ Type error!
```

The reasoning behind this decision is twofold:

1. Narrowing down the data type doesn't guarantee that a different data type wouldn't be sent over the network (the classic types vs runtime debate);
1. The `event.data` value you receive in the message event listener will always be of type `string | Blob | ArrayBuffer` because MSW provides no message parsing.

If you are using objects to communicate with a WebSocket server, those objects have to be stringified and parsed when sending and receiving them, respectively, which already implies a parsing layer being present in your application.

You can achieve a proper type and runtime safety in WebSockets by introducing parsing utilities. Libraries like [Zod](https://github.com/colinhacks/zod) can help you greatly in achieving type and runtime safety.

```js
import { z } from 'zod'

// Define a Zod schema for the incoming events.
// Here, our WebSocket communication supports two
// events: "chat/join" and "chat/message".
const incomingSchema = z.union([
  z.object({
    type: z.literal('chat/join'),
    user: userSchema,
  }),
  z.object({
    type: z.literal('chat/message'),
    message: z.object({
      text: z.string(),
      sentAt: z.string().datetime(),
    }),
  }),
])

chat.addEventListener('connection', ({ client, server }) => {
  client.addEventListener('message', (event) => {
    const result = incomingSchema.safeParse(event.data)

    // Ignore non-matching events.
    if (!result.success) {
      return
    }

    const message = result.data

    // Handle incoming events in type-safe way.
    switch (message.type) {
      case 'chat/join': {
        // ...
        break
      }

      case 'chat/message': {
        // ...
        break
      }
    }
  })
})
```

> Feel free to introduce a higher-order listener for the message event that abstracts that parsing, helping you reuse it across your handlers.
