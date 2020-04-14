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
      padding-left: 2rem;
      padding-right: 2rem;
    `}
  display: inline-block;

  border: 0;
  border-radius: 6px;
  color: var(--color-gray-dark);
  cursor: pointer;
  font-weight: 600;
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
          color: #fff;
        `
      : css`
          background-color: ${({ theme }) => theme.colors.grayDim};
        `}
`

Button.defaultProps = {
  variant: 'secondary',
}
