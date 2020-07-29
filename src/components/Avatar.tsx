import styled from 'styled-components'

export const Avatar = styled.img<{ size?: number }>`
  display: flex;
  padding: 4px;
  border: 2px solid var(--color-gray-light);
  max-height: ${({ size }) => size}px;
  width: ${({ size }) => size}px;
  max-width: 100%;
  height: auto;

  border-radius: 50%;
`

Avatar.defaultProps = {
  size: 70,
}
