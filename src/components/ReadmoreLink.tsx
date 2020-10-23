import React from 'react'
import styled from 'styled-components'
import { Box } from 'atomic-layout'
import { IoMdArrowDropright as Icon } from 'react-icons/io'

export const StyledLink = styled.a`
  display: inline-flex;
  margin: 0 -1rem;
  padding: 0.5rem 1rem;
  font-size: 1.1em;
  font-weight: 500;
  line-height: 1.5;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`

export const ReadmoreLink: React.FC<
  React.DetailedHTMLProps<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  > & { as?: any }
> = ({ children, ref, ...restProps }) => {
  return (
    <StyledLink {...restProps}>
      <Box inline as={Icon} marginRight={4} marginTop="0.25ch" />
      <span>{children}</span>
    </StyledLink>
  )
}
