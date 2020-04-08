import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import { Box, Composition } from 'atomic-layout'

import { Grid } from './Grid'
import logo from '../images/logo.svg'

const StyledHeader = styled.header`
  background-color: ${({ theme }) => theme.colors.grayDark};
  color: ${({ theme }) => theme.colors.grayLight};
  font-size: 0.9rem;
  font-weight: 600;

  a {
    color: inherit;
    text-decoration: none;

    &:hover {
      color: #fff;
    }
  }
`

const Header = () => (
  <Box as={StyledHeader} paddingVertical={12}>
    <Grid flex alignItems="center" justifyContent="space-between">
      <Box flex alignItems="center">
        <Link to="/">
          <img src={logo} alt="MSW" width="48" />
        </Link>
        <Box as="span" marginLeft={8}>
          <strong>Mock Service Worker</strong>
        </Box>
      </Box>
      <Composition inline templateCols="repeat(2, auto)" gap={32}>
        <Link to="/docs">Docs</Link>
        <a href="https://github.com/open-draft/msw">GitHub</a>
      </Composition>
    </Grid>
  </Box>
)

export default Header
