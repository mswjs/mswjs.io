import styled from 'styled-components'

export const Avatar = styled.img<{ size?: number }>`
  display: flex;
  height: ${({ size }) => size}px;
  width: ${({ size }) => size}px;

  border-radius: 50%;
`

Avatar.defaultProps = {
  size: 70,
}
