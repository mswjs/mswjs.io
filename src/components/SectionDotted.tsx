import styled from 'styled-components'

import patternUrl from '../images/pattern-stripe.png'

export const SectionDotted = styled.section`
  position: relative;

  &:before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    z-index: -1;

    background: url(${patternUrl}) repeat;
    background-size: 90px;
    opacity: 0.07;
  }
`
