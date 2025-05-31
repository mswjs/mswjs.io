---
order: 3
title: Binary responses
description: Responding with binary data.
keywords:
  - binary
  - image
  - video
  - audio
  - buffer
---

You can provide an `ArrayBuffer` to the mocked response instance to respond with binary data, like images, video, or audio.

```ts {7}
http.get('/images/:imageId', async ({ params }) => {
  // Get an ArrayBuffer from reading the file from disk or fetching it.
  const buffer = await fetch(`/static/images/${params.imageId}`).then(
    (response) => response.arrayBuffer(),
  )

  return HttpResponse.arrayBuffer(buffer, {
    headers: {
      'content-type': 'image/png',
    },
  })
})
```

> Using [`HttpResponse.arrayBuffer()`](/docs/api/http-response#httpresponsearraybufferbody-init) static method will automatically set `content-length` on the mocked response. Make sure to still set the appropriate `content-type` header!
