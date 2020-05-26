import React from 'react'
import styled from 'styled-components'
import { Box } from 'atomic-layout'
import { IoMdArrowDropright as Icon } from 'react-icons/io'

export const StyledLink = styled.a`
  margin: 0 -1rem;
  padding: 1rem;
  font-size: 1.1em;
  font-weight: 500;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`

export const ReadmoreLink: React.FC<React.DetailedHTMLProps<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
> & { as?: any }> = ({ children, ref, ...restProps }) => {
  return (
    <StyledLink {...restProps}>
      <Box inline as={Icon} marginRight={4} marginBottom={-2} />
      <span>{children}</span>
    </StyledLink>
  )
}
