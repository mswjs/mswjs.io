import React from 'react'
import { BoxProps } from '@atomic-layout/core'
import { makeResponsive } from 'atomic-layout'
import { Text } from './Text'
import styled, { css } from 'styled-components'

interface HeadingProps {
  align?: 'start' | 'center' | 'end'
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
      font-size: 3.4rem;
      font-weight: 800;
      line-height: 1.1;
    `}
`

export const RawHeading: React.FC<HeadingProps & BoxProps> = ({
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

RawHeading.defaultProps = {
  level: 1,
  align: 'start',
}

export const Heading = makeResponsive(RawHeading)
