import styled, { css } from 'styled-components'
import { Box } from 'atomic-layout'
import { BoxProps } from '@atomic-layout/core'
import theme from '../theme'

export interface TextProps {
  color?: keyof typeof theme.colors | 'inherit'
  align?: 'start' | 'center' | 'end'
}

export const Text = styled(Box)<TextProps & BoxProps>`
  ${({ color, theme }) =>
    color &&
    css`
      color: ${theme.colors[color]};
    `}
  ${({ align }) =>
    align &&
    css`
      text-align: ${align};
    `}
`

Text.defaultProps = {
  as: 'p',
}
