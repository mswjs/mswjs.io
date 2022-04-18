import React, { useState, useMemo, useCallback } from 'react'
import styled, { css, createGlobalStyle } from 'styled-components'
import { Box, Composition, Only } from 'atomic-layout'

import { Grid } from '../../components/Grid'
import Header from '../../components/header'
import { Breadcrumbs } from './components/Breadcrumbs'
import { Menu } from './components/Menu'
import { TableOfContents } from './components/TableOfContents'
import { DocsPageFooter } from './components/DocsPageFooter'
import { BaseLayout } from '../../components/BaseLayout'
import { Footer } from '../../components/Footer'
import { Banner } from '../../components/Banner'

interface Props {
  page?: any
  navTree: any
  breadcrumbs: any
  contributors?: any
  lastModified?: any
}

const BodyStylesOverride = createGlobalStyle`
  html,
  body {
    height: 100%;
    overflow: hidden;
  }

  body {
    position: relative;
  }
`

const OverlayMask = styled.div<{ isVisible: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.75);
  transition: opacity 0.5s ease;
  opacity: 0;
  visibility: hidden;
  z-index: 5;

  ${({ isVisible }) =>
    isVisible &&
    css`
      opacity: 1;
      visibility: visible;
    `}
`

const DocsLayout: React.FC<Props> = ({
  children,
  page,
  navTree,
  breadcrumbs,
  contributors,
  lastModified,
}) => {
  const [isMenuOpen, setMenuOpen] = useState(false)

  const handleBurgerClick = useCallback(() => {
    setMenuOpen(!isMenuOpen)
  }, [isMenuOpen])

  const handleOverlayClick = useCallback(() => {
    setMenuOpen(false)
  }, [])

  const threeColLayout = useMemo(() => {
    // Skip the right-most column when there is no table of contents
    return ['300px', 'minmax(0, 1fr)', page?.tableOfContents && '186px']
      .filter(Boolean)
      .join(' ')
  }, [page])

  return (
    <BaseLayout>
      <Banner />
      <Header withMenu={true} onMenuClick={handleBurgerClick} />
      <Grid>
        <Composition
          templateCols="minmax(0, 1fr)"
          templateColsLg="300px minmax(0, 1fr)"
          templateColsXl={threeColLayout}
          gap={64}
        >
          <Menu tree={navTree} isOpen={isMenuOpen} />
          <Box paddingVertical={48}>
            {breadcrumbs.length > 0 && <Breadcrumbs items={breadcrumbs} />}
            <Box as="article" id="docs-page">
              {children}
            </Box>
            {page && (
              <DocsPageFooter
                lastModified={lastModified}
                contributors={contributors}
                editUrl={page.fields.editUrl}
              />
            )}
          </Box>
          {page?.tableOfContents?.items && (
            <Only from="xl">
              <TableOfContents items={page.tableOfContents.items} />
            </Only>
          )}
        </Composition>
      </Grid>
      <OverlayMask isVisible={isMenuOpen} onClick={handleOverlayClick} />
      <Footer />
      {isMenuOpen && <BodyStylesOverride />}
    </BaseLayout>
  )
}

export default DocsLayout
