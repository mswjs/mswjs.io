import styled from 'styled-components'
import patternUrl from '../images/patternsvg.svg'

export const Divider = styled.hr`
  margin: 0;
  border: 0;
  height: 20px;
  width: 100%;

  background: url(${patternUrl}) repeat-x;
`
