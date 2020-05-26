import React from 'react'
import { graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { MDXProvider } from '@mdx-js/react'

import Seo from '../../components/seo'

/* Documentation components */
import { TextLead } from '../../components/TextLead'

/* Markdown components */
import { Link as MdxLink } from '../../components/mdx/Link'
import { Code as MdxCode } from '../../components/mdx/code'
import { Blockquote } from '../../components/mdx/Blockquote'
import { GitHubRepo } from '../../components/mdx/GitHubRepo'
import { PageLink } from '../../components/mdx/PageLink'
import { Hint } from '../../components/mdx/Hint'
import { Heading } from '../../components/mdx/Heading'
import { ResponsePreview } from '../../components/mdx/ResponsePreview'
import { Action } from '../../components/mdx/Action'
import { ConsoleMessage } from '../../components/mdx/ConsoleMessage'
import { PathMatchPreview } from '../../components/mdx/PathMatchPreview'
import DocsLayout from './DocsLayout'
import { Table } from '../../components/mdx/Table'

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
  table: Table,
}

const DocumentationPage = ({ data, pageContext }) => {
  const { page } = data

  return (
    <DocsLayout
      page={page}
      navTree={pageContext.navTree}
      breadcrumbs={pageContext.breadcrumbs}
    >
      <Seo
        title={page.frontmatter.title}
        description={page.frontmatter.description}
      />
      <h1>{page.frontmatter.title}</h1>
      {page.frontmatter.description && (
        <TextLead>{page.frontmatter.description}</TextLead>
      )}
      <MDXProvider components={components}>
        <MDXRenderer>{page.body}</MDXRenderer>
      </MDXProvider>
    </DocsLayout>
  )
}

export const query = graphql`
  query GetSinglePage($postId: String!) {
    page: mdx(id: { eq: $postId }) {
      fields {
        relativeFilePath
        editUrl
      }
      frontmatter {
        title
        description
      }
      body
      tableOfContents
    }
  }
`

export default DocumentationPage
