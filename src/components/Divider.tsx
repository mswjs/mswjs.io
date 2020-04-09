import styled from 'styled-components'

export const Divider = styled.hr`
  height: 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.grayLight};
`
