import styled from 'styled-components'

const SKEW_ANGLE = 3

export const ObliqueSection = styled.section`
  margin: 2rem 0;
  padding: 2rem 0;
  background-color: ${({ theme }) => theme.colors.grayDim};
  transform: skew(0deg, -${SKEW_ANGLE}deg);
`

export const ObliqueSectionContent = styled.div`
  transform: skew(0deg, ${SKEW_ANGLE}deg);
`
