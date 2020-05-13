import React, { useMemo } from 'react'
import { MDXProvider } from '@mdx-js/react'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { Box, Composition } from 'atomic-layout'

import Layout from '../../components/layout'
import { Grid } from '../../components/Grid'
import { Breadcrumbs } from './components/Breadcrumbs'
import { Menu } from './components/Menu'
import { TableOfContents } from './components/TableOfContents'
import { DocsPageFooter } from './components/DocsPageFooter'

interface Props {
  page?: any
  navTree: any
  breadcrumbs: any
}

const DocsLayout: React.FC<Props> = ({
  children,
  page,
  navTree,
  breadcrumbs,
}) => {
  const templateColsLg = useMemo(() => {
    // Skip the right-most column when there is no table of contents
    return ['250px', '1fr', page?.tableOfContents && '186px']
      .filter(Boolean)
      .join(' ')
  }, [page])

  return (
    <Layout>
      <Grid>
        <Composition templateColsLg={templateColsLg} gap={64}>
          <Menu tree={navTree} />
          <Box paddingVertical={48}>
            <Breadcrumbs items={breadcrumbs} />
            <Box as="article" id="docs-page">
              {children}
            </Box>
            {page && (
              <DocsPageFooter
                relativeFilePath={page.fields.relativeFilePath}
                editUrl={page.fields.editUrl}
              />
            )}
          </Box>
          {page?.tableOfContents?.items && (
            <TableOfContents items={page.tableOfContents.items} />
          )}
        </Composition>
      </Grid>
    </Layout>
  )
}

export default DocsLayout
