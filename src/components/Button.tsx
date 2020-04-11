import styled, { css } from 'styled-components'

interface ButtonProps {
  variant?: 'primary' | 'secondary'
}

export const Button = styled.button<ButtonProps>`
  padding: 0.75rem 1.25rem;
  display: inline-block;

  border: 0;
  border-radius: 3px;
  color: var(--color-gray-dark);
  cursor: pointer;
  font-weight: 500;
  transition: box-shadow 0.1s ease;
  text-decoration: none;

  &:focus {
    outline-color: red;
    /* box-shadow: 0 0 0 5px
      ${({ theme }) => theme.utils.alpha(theme.colors.primary, 0.5)}; */
  }

  ${({ variant }) =>
    variant === 'primary'
      ? css`
          background-color: ${({ theme }) => theme.colors.primary};
        `
      : css`
          background-color: ${({ theme }) => theme.colors.grayDim};
        `}
`

Button.defaultProps = {
  variant: 'secondary',
}
