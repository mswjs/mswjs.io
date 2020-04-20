import styled, { css } from 'styled-components'

interface ButtonProps {
  hero?: boolean
  variant?: 'primary' | 'secondary'
}

export const Button = styled.button<ButtonProps>`
  padding: 0.75rem 1.25rem;
  ${({ hero }) =>
    hero &&
    css`
      min-width: 200px;
    `}
  display: inline-block;

  border: 0;
  border-radius: 6px;
  color: var(--color-gray-dark);
  cursor: pointer;
  font-weight: 600;
  text-align: center;
  text-decoration: none;
  user-select: none;

  ${({ variant }) =>
    variant === 'primary'
      ? css`
          background-color: ${({ theme }) => theme.colors.primary};
          color: ${({ theme }) => theme.colors.primaryDark};
        `
      : css`
          background-color: ${({ theme }) => theme.colors.grayDim};
        `};
`

Button.defaultProps = {
  variant: 'secondary',
}
