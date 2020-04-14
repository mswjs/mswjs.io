import React from 'react'
import { Text } from './Text'
import styled, { css } from 'styled-components'

interface HeadingProps {
  level?: keyof typeof headingComponents
  hero?: boolean
}

const headingComponents = {
  1: 'h1',
  2: 'h2',
  3: 'h3',
  4: 'h4',
}

const StyledHeading = styled(Text)<HeadingProps>`
  ${({ hero }) =>
    hero &&
    css`
      font-size: 3rem;
    `}
`

export const Heading: React.FC<HeadingProps> = ({
  level,
  children,
  ...restProps
}) => {
  return (
    <StyledHeading as={headingComponents[level] as any} {...restProps}>
      {children}
    </StyledHeading>
  )
}

Heading.defaultProps = {
  level: 1,
}
