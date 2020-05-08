import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import { Box, Composition } from 'atomic-layout'
import { DiGithubBadge as GitHubIcon } from 'react-icons/di'

import { Grid } from './Grid'
import logo from '../images/logo.svg'

const StyledHeader = styled.header`
  color: ${({ theme }) => theme.colors.grayDark};
  font-size: 0.9rem;
  font-weight: 600;

  a {
    color: inherit;
    text-decoration: none;

    &:hover,
    &[aria-current='page'] {
      color: ${({ theme }) => theme.colors.secondary};
    }
  }
`

const Header = () => (
  <Box as={StyledHeader} paddingVertical={12}>
    <Grid flex alignItems="center" justifyContent="space-between">
      <Box flex alignItems="center">
        <Box as={Link} to="/" flex>
          <img src={logo} alt="MSW" width="48" />
        </Box>
        <Box as="span" marginLeft={8}>
          <strong>Mock Service Worker</strong>
        </Box>
      </Box>
      <Composition
        inline
        templateCols="repeat(2, auto)"
        alignItems="center"
        gap={32}
      >
        <Link to="/docs/">Docs</Link>
        <Box as="a" href="https://github.com/open-draft/msw" flex>
          <GitHubIcon size={24} />
        </Box>
      </Composition>
    </Grid>
  </Box>
)

export default Header
