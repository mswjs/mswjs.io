import React from 'react'
import { graphql } from 'gatsby'
import { Composition, Box } from 'atomic-layout'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { MDXProvider } from '@mdx-js/react'

import Layout from '../components/layout'
import Seo from '../components/seo'
import { Link as MdxLink } from '../components/mdx/Link'
import { Code as MdxCode } from '../components/mdx/code'
import { TableOfContents } from '../components/mdx/TableOfContents'
import { Blockquote } from '../components/mdx/Blockquote'
import { Menu } from '../components/mdx/Menu'
import { Breadcrumbs } from '../components/mdx/Breadcrumbs'
import { GitHubRepo } from '../components/mdx/GitHubRepo'
import { Hint } from '../components/mdx/Hint'

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
      <Composition templateCols="minmax(224px, 20vw) 1fr 224px" gap={64}>
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
