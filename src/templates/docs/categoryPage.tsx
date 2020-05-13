import React from 'react'
import { PageProps, graphql } from 'gatsby'

import { PageLink } from '../../components/mdx/PageLink'
import DocsLayout from './DocsLayout'
import Seo from '../../components/seo'
import { TextLead } from '../../components/TextLead'
import { Heading } from '../../components/Heading'

interface PageData {
  childPages: {
    edges: Array<{
      node: {
        fields: {
          url: string
        }
        frontmatter: {
          title: string
        }
      }
    }>
  }
}

interface PageContext {
  categoryTitle: string
  categoryDescription?: string
  navTree: any
  breadcrumbs: any
}

const CategoryPage: React.FC<PageProps<PageData, PageContext>> = ({
  data,
  pageContext,
}) => {
  const { childPages } = data
  const {
    categoryTitle,
    categoryDescription,
    navTree,
    breadcrumbs,
  } = pageContext

  return (
    <DocsLayout navTree={navTree} breadcrumbs={breadcrumbs}>
      <Seo title={categoryTitle} description={categoryDescription} />
      <Heading level={1}>{categoryTitle}</Heading>
      {categoryDescription && <TextLead>{categoryDescription}</TextLead>}

      <Heading level={2}>Table of Contents</Heading>
      {childPages.edges.map(({ node }) => (
        <PageLink title={node.frontmatter.title} url={node.fields.url} />
      ))}
    </DocsLayout>
  )
}

export const query = graphql`
  query GetChildPages($categoryRegex: String!) {
    childPages: allMdx(
      filter: { fields: { url: { regex: $categoryRegex } } }
      sort: { order: ASC, fields: [frontmatter___order] }
    ) {
      edges {
        node {
          fields {
            url
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`

export default CategoryPage
