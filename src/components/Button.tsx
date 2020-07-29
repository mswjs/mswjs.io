import styled, { css } from 'styled-components'

interface ButtonProps {
  hero?: boolean
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'default' | 'small'
}

export const Button = styled.button<ButtonProps>`
  --size-multiplier: ${({ size }) => (size === 'small' ? 0.4 : 1)};

  padding: calc(0.75rem * var(--size-multiplier))
    calc(1.25rem * var(--size-multiplier));

  ${({ hero }) =>
    hero &&
    css`
      min-width: 200px;
    `}
  display: inline-flex;
  justify-content: center;

  border: 0;
  border-radius: 4px;
  color: var(--color-gray-dark);
  cursor: pointer;
  font-weight: 600;
  text-align: center;
  text-decoration: none;
  user-select: none;

  ${({ variant }) => {
    switch (variant) {
      case 'primary': {
        return css`
          background-color: ${({ theme }) => theme.colors.black};
          color: #fff;
        `
      }

      case 'secondary': {
        return css`
          background-color: ${({ theme }) => theme.colors.grayDim};
        `
      }

      case 'ghost': {
        return css``
      }
    }
  }}

  ${({ size }) =>
    size === 'small' &&
    css`
      font-size: 80%;
    `}
`

Button.defaultProps = {
  variant: 'secondary',
}
