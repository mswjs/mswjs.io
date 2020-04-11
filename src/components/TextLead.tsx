import styled, { css } from 'styled-components'

export const TextLead = styled.p<{ align?: 'start' | 'center' | 'end' }>`
  font-size: 1.2rem;
  line-height: 1.6;
  letter-spacing: -0.1px;

  ${({ align }) =>
    align &&
    css`
      text-align: ${align};
    `}
`
