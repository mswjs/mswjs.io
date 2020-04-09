import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import { Box } from 'atomic-layout'

const MenuSection = styled.section`
  position: relative;
  background-color: var(--color-gray-dim);
  font-size: 0.9rem;
  font-weight: 500;

  a {
    color: var(--color-gray);
    text-decoration: none;

    &[aria-current='page'] {
      color: var(--color-secondary);
    }
  }
`

const PagesList = styled.ul<{ nested?: boolean }>`
  margin: 0;
  padding: 0;
  list-style: none;
  ${({ nested }) =>
    nested &&
    `
    padding-left: 1rem;
  `}
`

const PageListItem = styled.li<{ isRootSection: boolean }>`
  ${({ isRootSection }) =>
    isRootSection &&
    `
      margin-top: 2rem;
  `}
`

const PageTitle = styled.span<{ isRootSection: boolean }>`
  display: flex;
  padding: 0.35rem 1rem;
  line-height: 1.4;

  ${({ isRootSection, theme }) =>
    isRootSection &&
    `
      color: ${theme.colors.gray};
      font-size: 90%;
      font-weight: bold;
      text-transform: uppercase;
      letter-spacing: 1px;

      &::after {
        content: '';
        height: 1px;
        background-color: ${theme.colors.grayLighter};
        top: 0;
        width: 100%;
        right: 1rem;
        bottom: 0;
        margin: auto 0 auto 0.5rem;
      }
`}
`

const renderTreeItem = (items: MenuTree[], isRoot?: boolean) => {
  return items.map((page, index) => {
    const { displayName, url, items: children } = page
    const isRootSection = isRoot && !!children
    const Title = (
      <PageTitle isRootSection={isRootSection}>{displayName}</PageTitle>
    )

    return (
      <PageListItem key={url || index} isRootSection={isRootSection}>
        {url ? <Link to={url}>{Title}</Link> : Title}
        {children && (
          <PagesList nested>{renderTreeItem(children, false)}</PagesList>
        )}
      </PageListItem>
    )
  })
}

interface MenuProps {
  tree: MenuTree[]
}

interface MenuTree {
  title: string
  displayName: string
  url?: string
  items: MenuTree[]
}

export const Menu: React.FC<MenuProps> = ({ tree }) => {
  console.log(tree)

  return (
    <Box as={MenuSection} paddingVertical={48} paddingRight={32}>
      <Box width={224} marginLeft="auto">
        <PagesList>{renderTreeItem(tree, true)}</PagesList>
      </Box>
    </Box>
  )
}
