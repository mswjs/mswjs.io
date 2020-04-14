import styled, { css } from 'styled-components'

export const TextLead = styled.p<{ align?: 'start' | 'center' | 'end' }>`
  font-size: 1.25rem;
  line-height: 1.6;

  ${({ align }) =>
    align &&
    css`
      text-align: ${align};
    `}
`
