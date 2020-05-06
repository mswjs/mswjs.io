import React from 'react'
import styled from 'styled-components'
import { IoMdArrowRoundDown as Icon } from 'react-icons/io'

const Paragraph = styled.p`
  color: var(--color-black);
  font-weight: 500;
  line-height: 1.4;
`

const StyledIcon = styled(Icon)`
  margin: 0 0.5ch -2px 0;
  color: var(--color-secondary);
  border: 2px solid var(--color-secondary);
  border-radius: 50%;
`

export const Action: React.FC = ({ children }) => {
  return (
    <Paragraph>
      <StyledIcon size={16} />
      <span>{children}</span>
    </Paragraph>
  )
}
