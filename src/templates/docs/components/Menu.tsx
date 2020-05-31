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
  height: 100vh;
  background-color: #fff;
  overflow-y: auto;
  transform: translateX(-100%);
  transition: transform .5s ease;

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

    @media ${query({ from: 'lg' })} {
      bottom: 3rem;
      top: 2rem;
    }
  }

  a {
    display: block;
    color: var(--color-gray);
    text-decoration: none;

    &:hover {
      color: var(--color-black);
    }

    &.active {
      font-weight: 600;
      color: var(--color-black);

      &[aria-current="page"] {
        color: var(--color-secondary);
      }
    }
  }
`

const MenuSticky = styled(Box)`
  @media ${query({ from: 'lg' })} {
    position: sticky;
    top: 0;
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
        top: 4px;
        bottom: 4px;
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
  childPages: MenuTree[]
  isRoot: boolean
}> = ({ childPages, displayName, url, isRoot }) => {
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
          partiallyActive={!isRootSection}
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
  items: MenuTree[]
}

export const Menu: React.FC<MenuProps> = ({ tree, isOpen }) => {
  return (
    <Box
      as={MenuSection}
      isOpen={isOpen}
      paddingVertical={16}
      paddingRight={32}
      paddingTopMdDown={48}
      paddingLeftLg={0}
    >
      <Box as={MenuSticky} paddingVertical={32}>
        <PagesList>{renderTreeItem(tree, true)}</PagesList>
      </Box>
    </Box>
  )
}
