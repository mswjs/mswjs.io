import React from 'react'
import { graphql } from 'gatsby'
import { Composition, Box } from 'atomic-layout'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { MDXProvider } from '@mdx-js/react'

import Layout from '../../components/layout'
import Seo from '../../components/seo'

/* Documentation components */
import { Menu } from './components/Menu'
import { Breadcrumbs } from './components/Breadcrumbs'
import { TableOfContents } from './components/TableOfContents'

/* Markdown components */
import { Link as MdxLink } from '../../components/mdx/Link'
import { Code as MdxCode } from '../../components/mdx/code'
import { Blockquote } from '../../components/mdx/Blockquote'
import { GitHubRepo } from '../../components/mdx/GitHubRepo'
import { Hint } from '../../components/mdx/Hint'
import { Grid } from '../../components/Grid'

const components = {
  a: MdxLink,
  pre: ({ children }) => <>{children}</>,
  code: MdxCode,
  blockquote: Blockquote,
  GitHubRepo,
  Hint,
}

const DocumentationPage = ({ data, pageContext }) => {
  const { page } = data

  return (
    <Layout>
      <Seo title={page.frontmatter.title} />
      <Grid>
        <Composition templateCols="260px 1fr 224px" gap={64}>
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
