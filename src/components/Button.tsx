import styled, { css } from 'styled-components'

interface ButtonProps {
  variant?: 'primary' | 'secondary'
}

export const Button = styled.button<ButtonProps>`
  padding: 0.75rem 1.25rem;

  border: 0;
  border-radius: 3px;
  cursor: pointer;
  font-weight: 500;
  transition: box-shadow 0.1s ease;

  &:focus {
    outline: 0;
    box-shadow: 0 0 0 5px red;
  }

  ${({ variant }) =>
    variant === 'primary'
      ? css`
          background-color: ${({ theme }) => theme.colors.primary};
        `
      : css`
          background-color: #f9e4d4;
        `}
`

Button.defaultProps = {
  variant: 'secondary',
}
