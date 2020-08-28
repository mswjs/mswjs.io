import styled, { css } from 'styled-components'
import { makeResponsive } from 'atomic-layout'
import { TextProps } from './Text'

type Props = TextProps & { align?: 'start' | 'center' | 'end' }

export const RawTextLead = styled.p<Props>`
  font-size: 1.4rem;
  line-height: 1.4;
  letter-spacing: -0.3px;

  ${({ align }) =>
    align &&
    css`
      text-align: ${align};
    `}
`

export const TextLead = makeResponsive<
  TextProps,
  TextProps & { [k: string]: any }
>(RawTextLead)
