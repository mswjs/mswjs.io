import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import { Box } from 'atomic-layout'

const MenuSection = styled.section`
  position: relative;
  background-color: var(--color-gray-dim);
  font-size: 0.9rem;
  font-weight: 500;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    width: 50vw;
    background-color: inherit;
  }

  a {
    display: block;
    color: var(--color-gray);
    text-decoration: none;

    &[aria-current='page'] {
      color: var(--color-secondary);
      font-weight: 600;
    }
  }
`

const MenuSticky = styled.div`
  position: sticky;
  top: 0;
  padding-top: 1rem;
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
          <PagesList nested={!isRootSection}>
            {renderTreeItem(children, false)}
          </PagesList>
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
    <Box as={MenuSection} paddingVertical={32} paddingRight={32}>
      <Box as={MenuSticky}>
        <PagesList>{renderTreeItem(tree, true)}</PagesList>
      </Box>
    </Box>
  )
}
