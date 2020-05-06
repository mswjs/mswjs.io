import React from 'react'
import { graphql } from 'gatsby'
import { Composition, Box } from 'atomic-layout'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { MDXProvider } from '@mdx-js/react'

import Layout from '../../components/layout'
import Seo from '../../components/seo'

/* Documentation components */
import { TextLead } from '../../components/TextLead'
import { Menu } from './components/Menu'
import { Breadcrumbs } from './components/Breadcrumbs'
import { TableOfContents } from './components/TableOfContents'

/* Markdown components */
import { Link as MdxLink } from '../../components/mdx/Link'
import { Code as MdxCode } from '../../components/mdx/code'
import { Blockquote } from '../../components/mdx/Blockquote'
import { GitHubRepo } from '../../components/mdx/GitHubRepo'
import { PageLink } from '../../components/mdx/PageLink'
import { Hint } from '../../components/mdx/Hint'
import { Grid } from '../../components/Grid'
import { Heading } from '../../components/mdx/Heading'
import { ResponsePreview } from '../../components/mdx/ResponsePreview'
import { Action } from '../../components/mdx/Action'
import { ConsoleMessage } from '../../components/mdx/ConsoleMessage'
import { PathMatchPreview } from '../../components/mdx/PathMatchPreview'

const createHeading = (level: 1 | 2 | 3 | 4): React.FC => {
  return (props) => <Heading level={level} {...props} />
}

const components = {
  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  a: MdxLink,
  pre: ({ children }) => <>{children}</>,
  code: (props) => {
    const Component = props.className?.includes('language-') ? MdxCode : 'code'

    return <Component {...props} />
  },
  blockquote: Blockquote,
  PageLink,
  GitHubRepo,
  Hint,
  Action,
  ConsoleMessage,
  TextLead,
  ResponsePreview,
  PathMatchPreview,
}

const DocumentationPage = ({ data, pageContext }) => {
  const { page } = data

  return (
    <Layout>
      <Seo title={page.frontmatter.title} />
      <Grid>
        <Composition templateCols="260px 1fr 185px" gap={64}>
          <Menu tree={pageContext.navTree} />
          <Box paddingVertical={48}>
            <Breadcrumbs items={pageContext.breadcrumbs} />
            <Box as="article" id="docs-page">
              <h1>{page.frontmatter.title}</h1>
              <MDXProvider components={components}>
                <MDXRenderer>{page.body}</MDXRenderer>
              </MDXProvider>
            </Box>
          </Box>
          {page.tableOfContents?.items && (
            <TableOfContents items={page.tableOfContents.items} />
          )}
        </Composition>
      </Grid>
    </Layout>
  )
}

export const query = graphql`
  query GetSinglePage($postId: String!) {
    page: mdx(id: { eq: $postId }) {
      frontmatter {
        title
      }
      body
      tableOfContents
    }
  }
`

export default DocumentationPage
