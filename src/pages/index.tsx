import type { ReactElement } from 'react'
import Link from 'next/link'

export default function Page(): ReactElement {
  return (
    <>
      <h1>Hello, World!</h1>
      <Link href="/blog">
        <a href="/blog">Blog</a>
      </Link>
    </>
  )
}
