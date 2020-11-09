import * as React from 'react'
import { Composition } from 'atomic-layout'
import Layout from '../components/layout'
import SEO from '../components/seo'
import { Grid } from '../components/Grid'
import { Heading } from '../components/Heading'
import { TextLead } from '../components/TextLead'
import { PathMatchPreview } from '../components/mdx/PathMatchPreview'
import { Link } from '../components/mdx/Link'
import { CopyTextButton } from '../components/CopyTextButton'
import { useIsomorphicLocation } from '../hooks/useIsomorphicLocation'

const PAGE_DESCRIPTION =
  'Preview how your request handler URL matches against an actual request URL.'

const ReplPage: React.FC = () => {
  const location = useIsomorphicLocation()

  const searchParams = new URLSearchParams(location.search)
  const expectedPath = searchParams.get('path') || '/user/:userId'
  const expectedUrl = searchParams.get('url') || '/user/0251e7ac'

  const updateQueryParam = (paramName: string) => {
    return (nextValue: string) => {
      const nextSearchParams = new URLSearchParams(location.search)
      nextSearchParams.set(paramName, nextValue)
      const nextUrl = `?${nextSearchParams.toString()}`

      history.pushState(null, null, nextUrl)
    }
  }

  return (
    <Layout>
      <SEO title="Path matching REPL" description={PAGE_DESCRIPTION} />

      <Grid paddingVertical={64} paddingVerticalMd={80}>
        <Heading>Path matching REPL</Heading>
        <TextLead>{PAGE_DESCRIPTION}</TextLead>
        <hr />
        <Composition
          templateColsLg="repeat(2, 1fr)"
          alignItems="center"
          gap={24}
          gapLg={32}
        >
          <PathMatchPreview
            path={expectedPath}
            url={expectedUrl}
            onPathChange={updateQueryParam('path')}
            onUrlChange={updateQueryParam('url')}
          />
          <aside>
            <ul>
              <li>
                <strong>
                  Uses{' '}
                  <Link href="https://github.com/mswjs/node-match-path">
                    <code>node-match-path</code>
                  </Link>{' '}
                  library.
                </strong>
              </li>
              <li>Ignores trailing slashes.</li>
              <li>Ignores query parameters and hashes.</li>
            </ul>
            <CopyTextButton showText={true} text={location.href}>
              Share this page
            </CopyTextButton>
          </aside>
        </Composition>
      </Grid>
    </Layout>
  )
}

export default ReplPage
