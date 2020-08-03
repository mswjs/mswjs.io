import styled from 'styled-components'
import { Heading } from './Heading'

export const HeadingDiminished = styled(Heading)`
  font-size: 0.8rem;
  letter-spacing: 0.2ch;
  text-transform: uppercase;
`

HeadingDiminished.defaultProps = {
  level: 4,
}
