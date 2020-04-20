import styled, { css } from 'styled-components'
import theme from '../theme'

interface TextProps {
  color?: keyof typeof theme.colors | 'inherit'
  align?: 'start' | 'center' | 'end'
}

export const Text = styled.p<TextProps>`
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
