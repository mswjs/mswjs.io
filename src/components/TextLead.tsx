import styled, { css } from 'styled-components'

export const TextLead = styled.p<{ align?: 'start' | 'center' | 'end' }>`
  font-size: 1.4rem;
  line-height: 1.5;

  ${({ align }) =>
    align &&
    css`
      text-align: ${align};
    `}
`
