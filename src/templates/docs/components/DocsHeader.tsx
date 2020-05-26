import React from 'react'
import { Link } from 'gatsby'
import styled, { useTheme } from 'styled-components'
import { Box, Composition, Only, query } from 'atomic-layout'
import { IoIosMenu as MenuIcon } from 'react-icons/io'
import { DiGithubBadge as GitHubIcon } from 'react-icons/di'

import { Grid } from '../../../components/Grid'
import logo from '../../../images/logo.svg'

interface Props {
  onBurgerClick?: () => void
}

const StyledHeader = styled.header`
  color: ${({ theme }) => theme.colors.grayDark};
  font-size: 0.9rem;
  font-weight: 600;

  background-color: #fff;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  box-shadow: 0 2px 0 rgba(0, 0, 0, 0.015);
  z-index: 1;

  @media ${query({ to: 'lg' })} {
    position: sticky;
    top: 0;
  }
`

const HeaderLink = styled.a`
  padding: 0.5rem;
  color: inherit;
  text-decoration: none;

  &:hover {
    color: ${({ theme }) => theme.colors.secondary};
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

export const DocsHeader: React.FC<Props> = ({ onBurgerClick }) => {
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
          <BurgerMenuButton onClick={onBurgerClick}>
            <MenuIcon size={24} />
          </BurgerMenuButton>
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
          <HeaderLink as={Link} to="/docs/">
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
