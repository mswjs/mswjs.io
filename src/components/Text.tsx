import styled, { css } from 'styled-components'
import theme from '../theme'

interface TextProps {
  color?: keyof typeof theme.colors | 'inherit'
}

export const Text = styled.p<TextProps>`
  ${({ color }) =>
    color &&
    css`
      color: ${color};
    `}
`
