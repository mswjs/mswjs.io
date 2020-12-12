import type { ReactElement } from 'react'
import Link from 'next/link'

export default function Page(): ReactElement {
  return (
    <>
      <h1>Blog</h1>
      <Link href="/blog/msw">
        <a href="/blog/msw">MSW</a>
      </Link>
    </>
  )
}
