import * as React from 'react'
import styled from 'styled-components'
import { IoIosArrowForward as Icon } from 'react-icons/io'

export const Line = styled.p`
  padding: 0.5rem;
  background-color: #fff;
  border: 1px solid var(--color-gray-light);
  border-radius: var(--border-radius);
  color: #ff4500;
  font-family: var(--font-family-mono);
  font-weight: 600;

  box-shadow: 0 0 0 3px var(--color-gray-dim);

  svg {
    margin: -2px 0.25ch 0 0;
    vertical-align: middle;
  }
`

export const ConsoleMessage: React.FC = ({ children }) => {
  return (
    <Line>
      <Icon fill="#4C7CE9" />
      {children}
    </Line>
  )
}
