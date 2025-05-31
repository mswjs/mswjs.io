---
title: File uploads
description: Handle file uploads.
keywords:
  - upload
  - file
  - form
  - progress
  - formdata
---

File uploads on the web are usually done by submitting a `POST` request with a `FormData` body containing the files. You can intercept that request and read its body as `FormData` using the [`formData()`](https://developer.mozilla.org/en-US/docs/Web/API/Request/formData) method on the intercepted Fetch API [`Request`](https://developer.mozilla.org/en-US/docs/Web/API/Request) instance.

```js {5-6,19}
import { http, HttpResponse } from 'msw'

export const handlers = [
  http.post('/upload', async ({ request }) => {
    const data = await request.formData()
    const file = data.get('file')

    if (!file) {
      return new HttpResponse('Missing document', { status: 400 })
    }

    if (!(file instanceof File)) {
      return new HttpResponse('Uploaded document is not a File', {
        status: 400,
      })
    }

    return HttpResponse.json({
      contents: await file.text(),
    })
  }),
]
```

You can issue the file upload in any way you prefer. Here's an example of using the plain [`fetch()`](https://developer.mozilla.org/en-US/docs/Web/API/fetch) function in JavaScript that sends a plain text `doc.txt` document to the server:

```js {6-7}
const data = new FormData()
const file = new Blob(['Hello', 'world'], { type: 'text/plain' })
data.set('file', file, 'doc.txt')

fetch('/upload', {
  method: 'POST',
  body: data,
})
```

> Both [`FormData`](https://developer.mozilla.org/en-US/docs/Web/API/FormData) and [`Blob`](https://developer.mozilla.org/en-US/docs/Web/API/Blob) are standard APIs in the browser and Node.js. You can also use the [`File`](https://developer.mozilla.org/en-US/docs/Web/API/File) API to describe files.
