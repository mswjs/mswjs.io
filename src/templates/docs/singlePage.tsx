import React from 'react'
import { graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { MDXProvider } from '@mdx-js/react'

import Seo from '../../components/seo'

/* Documentation components */
import { TextLead } from '../../components/TextLead'

/* Markdown components */
import { Link as MdxLink } from '../../components/mdx/Link'
import { Code as MdxCode } from '../../components/mdx/Code'
import { Blockquote } from '../../components/mdx/Blockquote'
import { GitHubRepo } from '../../components/mdx/GitHubRepo'
import { PageLink } from '../../components/mdx/PageLink'
import { Hint } from '../../components/mdx/Hint'
import { Heading } from '../../components/mdx/Heading'
import { ResponsePreview } from '../../components/mdx/ResponsePreview'
import { Action } from '../../components/mdx/Action'
import { ConsoleMessage } from '../../components/mdx/ConsoleMessage'
import { Table } from '../../components/mdx/Table'
import { VideoEmbed } from '../../components/mdx/VideoEmbed'
import DocsLayout from './DocsLayout'
import { CarbonAds } from '../../components/CarbonAds'

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
  table: Table,
  VideoEmbed,
}

const DocumentationPage = ({ data, pageContext }) => {
  const { page } = data

  const categoryPage = pageContext.breadcrumbs[0]
  const siteName = 'Mock Service Worker Docs'
  const seo = {
    title: [page.frontmatter.title, categoryPage?.title]
      .filter(Boolean)
      .join(' - '),
    description:
      page.frontmatter.seo?.description || page.frontmatter.description,
  }

  return (
    <DocsLayout
      page={page}
      navTree={pageContext.navTree}
      breadcrumbs={pageContext.breadcrumbs}
      contributors={pageContext.contributors}
      lastModified={pageContext.lastModified}
    >
      <Seo
        title={seo.title}
        titleTemplate={`%s - ${siteName}`}
        description={page.frontmatter.description || siteName}
        socialDescription={seo.description}
        og={{
          siteName,
        }}
      />

      <h1>{page.frontmatter.title}</h1>
      {page.frontmatter.description && (
        <TextLead>{page.frontmatter.description}</TextLead>
      )}
      {page.frontmatter.ads !== false && <CarbonAds />}
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
        seo {
          description
        }
        ads
      }
      body
      tableOfContents
    }
  }
`

export default DocumentationPage
