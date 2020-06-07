import React from 'react'
import { PageProps } from 'gatsby'

import DocsLayout from './DocsLayout'
import Seo from '../../components/seo'
import { TextLead } from '../../components/TextLead'
import { Heading } from '../../components/Heading'
import { CategoryChildPages } from './components/CategoryChildPages'

interface PageContext {
  categoryTitle: string
  categoryDescription?: string
  childPages?: any
  childNavTree?: any
  navTree: any
  breadcrumbs: any
}

const CategoryPage: React.FC<PageProps<never, PageContext>> = ({
  pageContext,
}) => {
  const {
    categoryTitle,
    categoryDescription,
    childNavTree,
    navTree,
    breadcrumbs,
  } = pageContext

  return (
    <DocsLayout navTree={navTree} breadcrumbs={breadcrumbs}>
      <Seo title={categoryTitle} description={categoryDescription} />
      <Heading level={1}>{categoryTitle}</Heading>
      {categoryDescription && (
        <TextLead dangerouslySetInnerHTML={{ __html: categoryDescription }} />
      )}
      {childNavTree[0]?.items && (
        <>
          <hr />
          <CategoryChildPages items={childNavTree[0].items} />
        </>
      )}
    </DocsLayout>
  )
}

export default CategoryPage
