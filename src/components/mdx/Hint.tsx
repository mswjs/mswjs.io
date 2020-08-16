import styled, { css } from 'styled-components'

interface HintProps {
  mode?: 'info' | 'success' | 'warning' | 'danger'
}

export const Hint = styled.div<HintProps>`
  --bg-color: var(--color-gray-dim);

  ${({ mode }) => {
    switch (mode) {
      case 'success':
        return css`
          --border-color: var(--color-success);
        `
      case 'warning':
        return css`
          --border-color: var(--color-primary);
        `
      case 'danger':
        return css`
          --border-color: var(--color-danger);
        `
      default:
        return css`
          --border-color: var(--color-secondary);
        `
    }
  }}

  margin: 2rem 0;
  padding: 1rem;
  padding-left: 1.4rem;
  background-color: var(--bg-color);
  border-radius: var(--border-radius);
  border-left: 3px solid var(--border-color);
  color: var(--color-gray);
  font-size: 0.9rem;
  font-weight: 500;
  line-height: 1.6;
`

Hint.defaultProps = {
  mode: 'info',
}
