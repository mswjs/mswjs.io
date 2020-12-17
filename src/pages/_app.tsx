import type { AppProps } from 'next/app'
import type { ReactElement } from 'react'

export default function App({
  Component: Page,
  pageProps,
}: AppProps): ReactElement {
  return <Page {...pageProps} />
}
