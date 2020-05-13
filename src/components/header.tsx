import React from 'react'
import { Link } from 'gatsby'
import styled, { useTheme } from 'styled-components'
import { Box, Composition, Only } from 'atomic-layout'
import { IoIosMenu as MenuIcon } from 'react-icons/io'
import { DiGithubBadge as GitHubIcon } from 'react-icons/di'

import { Grid } from './Grid'
import logo from '../images/logo.svg'

const StyledHeader = styled.header`
  color: ${({ theme }) => theme.colors.grayDark};
  font-size: 0.9rem;
  font-weight: 600;
`

const HeaderLink = styled.a`
  padding: 0.5rem;
  color: inherit;
  text-decoration: none;

  &:hover {
    color: ${({ theme }) => theme.colors.secondary};
  }
`

const Header = () => {
  const theme = useTheme()

  return (
    <Box as={StyledHeader} paddingVertical={12}>
      <Composition
        as={Grid}
        templateCols="repeat(3, 1fr)"
        templateColsLg="1fr auto"
        gap={10}
        alignItems="center"
        justifyContent="space-between"
      >
        <Only to="lg">
          <button>
            <MenuIcon size={24} />
          </button>
        </Only>
        <Box flex justify="center" justifyLg="flex-start" alignItems="center">
          <Box as={Link} to="/" flex>
            <img src={logo} alt="MSW" width="48" />
          </Box>
          <Only from="lg" as="span" marginLeft={8}>
            <strong>Mock Service Worker</strong>
          </Only>
        </Box>
        <Box
          inline
          flex
          alignItems="center"
          justify="flex-end"
          justifyItems="flex-end"
        >
          <HeaderLink
            as={Link}
            to="/docs/"
            activeStyle={{ color: theme.colors.secondary }}
            partiallyActive
          >
            Documentation
          </HeaderLink>
          <Box as={HeaderLink} href="https://github.com/open-draft/msw" flex>
            <GitHubIcon size={24} />
          </Box>
        </Box>
      </Composition>
    </Box>
  )
}

export default Header
