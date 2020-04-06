import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import { Box, Composition } from 'atomic-layout'

import { Grid } from './Grid'
import logo from '../images/logo.svg'

const StyledHeader = styled.header`
  background-color: ${({ theme }) => theme.colors.primary};
  font-size: 0.9rem;
  font-weight: 500;
`

const Header = () => (
  <Box as={StyledHeader} paddingVertical={16}>
    <Grid flex alignItems="center" justifyContent="space-between">
      <Box as={Link} to="/" flex alignItems="center">
        <img src={logo} alt="MSW" width="48" />
        <Box as="span" marginLeft={8}>
          <strong>Mock Service Worker</strong>
        </Box>
      </Box>
      <Composition inline templateCols="repeat(3, auto)" gap={16}>
        <Link to="/docs">Docs</Link>
        <Link to="/">GitHub</Link>
      </Composition>
    </Grid>
  </Box>
)

export default Header
