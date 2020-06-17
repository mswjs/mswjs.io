import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import { Box, Composition, Only } from 'atomic-layout'
import { IoIosMenu as MenuIcon } from 'react-icons/io'
import { DiGithubBadge as GitHubIcon } from 'react-icons/di'

import { Grid } from './Grid'
import { ReactComponent as Logo } from '../images/logo.svg'

const StyledHeader = styled.header`
  position: sticky;
  top: 0;

  color: ${({ theme }) => theme.colors.grayDark};
  font-size: 0.9rem;
  font-weight: 600;

  background-color: #fff;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  box-shadow: 0 2px 0 rgba(0, 0, 0, 0.015);
  z-index: 2;
`

const LibraryName = styled.span`
  font-weight: 800;
`

const HeaderLink = styled.a`
  position: relative;
  padding: 1.5rem 0.5rem;
  color: inherit;
  text-decoration: none;
  transition: color 0.1s ease;

  &:hover {
    color: var(--color-gray);
  }

  &.active {
    color: var(--color-secondary);

    ::before {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 2px;
      background-color: var(--color-secondary);
    }
  }
`

const BurgerMenuButton = styled.button`
  margin-left: -1rem;
  padding: 1rem;
  position: relative;
  display: flex;
  align-items: center;
  background: transparent;
  border: 0;
  cursor: pointer;
  color: var(--color-gray);
  z-index: 11;

  :hover {
    color: var(--color-black);
  }
`

interface Props {
  className?: string
  withMenu?: boolean
  onMenuClick?: () => void
}

const Header: React.FC<Props> = ({ className, withMenu, onMenuClick }) => {
  return (
    <Box as={StyledHeader} className={className}>
      <Composition
        as={Grid}
        templateCols="minmax(0, 1fr) auto"
        gap={10}
        alignItems="center"
        justifyContent="space-between"
      >
        <Box flex justify="flex-start" alignItems="center">
          <Box as={Link} to="/" flex>
            <Logo height="48" width="48" />
          </Box>
          <Only from="md" as="span" marginLeft={8}>
            <LibraryName>Mock Service Worker</LibraryName>
          </Only>
        </Box>
        <Composition inline autoFlow="column" alignItems="center" gap={16}>
          <HeaderLink
            as={Link}
            to="/docs/"
            activeClassName="active"
            partiallyActive
          >
            Docs
          </HeaderLink>
          <Only
            from="sm"
            as={HeaderLink}
            href="https://github.com/mswjs/examples"
          >
            Examples
          </Only>
          <Box as={HeaderLink} href="https://github.com/mswjs/msw" flex>
            <GitHubIcon size={24} />
          </Box>
          {withMenu && (
            <Only to="lg">
              <BurgerMenuButton onClick={onMenuClick}>
                <MenuIcon size={24} />
              </BurgerMenuButton>
            </Only>
          )}
        </Composition>
      </Composition>
    </Box>
  )
}

export default Header
