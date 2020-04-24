import React from 'react'
import { Link } from 'gatsby'
import styled, { css } from 'styled-components'
import { Box } from 'atomic-layout'

const MenuSection = styled.section`
  position: relative;
  background-color: var(--color-gray-dim);
  border-right: 1px solid
    ${({ theme }) => theme.utils.alpha(theme.colors.grayLight, 0.3)};
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

    &:hover {
      color: var(--color-black);
    }

    &[aria-current='page'] {
      color: var(--color-secondary);
    }
  }
`

const MenuSticky = styled(Box)`
  position: sticky;
  top: 0;
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

const PageTitle = styled.span<{ isRootSection: boolean; hasChildren: boolean }>`
  display: flex;
  padding: 0.5rem 1rem;
  line-height: 1.4;

  ${({ isRootSection }) =>
    !isRootSection &&
    css`
      &:before {
        display: block;
        content: '•';
        color: var(--color-gray-light);
        width: 1ch;
        margin-right: 1ch;
      }

      [aria-current='page'] &:before {
        color: var(--color-secondary);
        content: '›';
      }
    `}

  ${({ isRootSection, theme }) =>
    isRootSection &&
    css`
      color: ${theme.colors.grayDark};
      font-size: 90%;
      font-weight: bold;
      text-transform: uppercase;
      letter-spacing: 1px;

      &::after {
        content: '';
        height: 1px;
        background-color: ${theme.colors.grayLight};
        top: 0;
        width: 100%;
        right: 1rem;
        bottom: 0;
        margin: auto 0 auto 0.5rem;
      }
    `}

  ${({ isRootSection, hasChildren }) =>
    !isRootSection &&
    hasChildren &&
    css`
      color: red;
    `}
`

const renderTreeItem = (items: MenuTree[], isRoot?: boolean) => {
  return items.map((page, index) => {
    const { displayName, url, items: children } = page
    const hasChildren = !!children
    const isRootSection = isRoot && hasChildren
    const Title = (
      <PageTitle isRootSection={isRootSection} hasChildren={hasChildren}>
        {displayName}
      </PageTitle>
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
  return (
    <Box as={MenuSection} paddingVertical={16} paddingRight={32}>
      <Box as={MenuSticky} paddingVertical={32}>
        <PagesList>{renderTreeItem(tree, true)}</PagesList>
      </Box>
    </Box>
  )
}
