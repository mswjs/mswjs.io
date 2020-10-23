import React, { useMemo } from 'react'
import { Link } from 'gatsby'
import styled, { css } from 'styled-components'
import { Box, query } from 'atomic-layout'
import { FiChevronRight as SectionIcon } from 'react-icons/fi'

const MenuSection = styled.section<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  height: 100%;
  background-color: #fff;
  overflow-y: auto;
  transform: translateX(-100%);
  transition: transform 0.5s ease;

  ${({ isOpen }) =>
    isOpen &&
    css`
      transform: translateX(0);
    `}

  @media ${query({ from: 'lg' })} {
    position: relative;
    height: initial;
    transform: translateX(0);
    background-color: transparent;
    overflow-y: initial;
    z-index: 0;
  }

  &:after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    border-right: 1px solid
      ${({ theme }) => theme.utils.alpha(theme.colors.grayLight, 0.5)};
  }

  a {
    display: block;
    color: var(--color-gray);
    text-decoration: none;

    &:hover {
      color: var(--color-black);
    }

    &.active {
      color: var(--color-black);
      font-weight: 600;

      &[aria-current='page'] {
        background-color: var(--color-gray-dim);
        border-top-left-radius: var(--border-radius);
        border-bottom-left-radius: var(--border-radius);
        color: var(--color-secondary);
      }
    }
  }
`

const MenuSticky = styled(Box)`
  @media ${query({ from: 'lg' })} {
    position: sticky;
    top: 73px;
  }
`

const Scrollable = styled.div`
  @media ${query({ from: 'lg' })} {
    max-height: calc(100vh - 73px);
    overflow-y: auto;
  }
`

const PagesList = styled.ul<{ nested?: boolean }>`
  margin: 0;
  padding: 0;
  list-style: none;

  ${({ nested }) =>
    nested &&
    css`
      position: relative;
      display: none;

      &:before {
        position: absolute;
        left: 18px;
        top: 0;
        bottom: 0;
        content: '';
        width: 1px;
        background-color: var(--color-gray-light);
      }

      ${PageTitle}:before {
        padding-left: 4px;
        height: 0;
        width: 0;
      }

      .active + & {
        display: block;
      }
    `}
`

const StyledPageListItem = styled.li<{ isRootSection: boolean }>`
  ${({ isRootSection }) =>
    isRootSection &&
    `
      margin-top: 2rem;
  `}
`

const PageTitle = styled.span<{ isRootSection: boolean; hasChildren: boolean }>`
  position: relative;
  padding: 0.5rem 1rem;
  display: flex;
  align-items: center;
  line-height: 1.25;

  ${({ isRootSection }) =>
    !isRootSection &&
    css`
      text-indent: 20px;

      svg {
        position: absolute;
        margin-left: -5px;

        .active & {
          transform: rotate(90deg);
        }
      }

      [aria-current='page'] &:before {
        background-color: var(--color-black);
      }
    `}

  ${({ isRootSection, theme }) =>
    isRootSection &&
    css`
      color: ${theme.colors.grayDark};
      font-size: 90%;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.15ch;
    `}
`

const PageListItem: React.FC<{
  displayName: string
  url: string
  isHomapge?: boolean
  childPages: MenuTree[]
  isRoot: boolean
}> = ({ childPages, displayName, url, isHomapge, isRoot }) => {
  const isRootSection = useMemo(() => {
    return isRoot && !!childPages
  }, [isRoot, childPages])

  const Icon = useMemo(() => {
    if (isRootSection || !childPages) {
      return null
    }

    return <SectionIcon />
  }, [isRootSection, childPages])

  const Title = (
    <PageTitle isRootSection={isRootSection} hasChildren={!!childPages}>
      {Icon}
      <span>{displayName}</span>
    </PageTitle>
  )

  return (
    <StyledPageListItem isRootSection={isRootSection}>
      {url ? (
        <Link
          to={url}
          partiallyActive={!isHomapge && !isRootSection}
          activeClassName="active"
        >
          {Title}
        </Link>
      ) : (
        Title
      )}
      {childPages && (
        <PagesList nested={!isRootSection}>
          {renderTreeItem(childPages, false)}
        </PagesList>
      )}
    </StyledPageListItem>
  )
}

const renderTreeItem = (items: MenuTree[], isRoot?: boolean) => {
  return items.map((page) => {
    return (
      <PageListItem
        key={page.url}
        isRoot={isRoot}
        displayName={page.displayName}
        url={page.url}
        isHomapge={page.isHomepage}
        childPages={page.items}
      />
    )
  })
}

interface MenuProps {
  tree: MenuTree[]
  isOpen?: boolean
}

interface MenuTree {
  title: string
  displayName: string
  url?: string
  isHomepage?: boolean
  items: MenuTree[]
}

export const Menu: React.FC<MenuProps> = ({ tree, isOpen }) => {
  return (
    <Box
      as={MenuSection}
      isOpen={isOpen}
      paddingTopMdDown={0}
      paddingLeftLg={0}
      paddingHorizontalMdDown={16}
    >
      <Box as={MenuSticky}>
        <Box as={Scrollable} paddingVertical={32}>
          <PagesList>{renderTreeItem(tree, true)}</PagesList>
        </Box>
      </Box>
    </Box>
  )
}
