import React from 'react'
import styled from 'styled-components'
import { IoIosColorFilter as ArrowIcon } from 'react-icons/io'

const Container = styled.a`
  display: block;
  padding: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.grayLight};
  border-radius: var(--border-radius);
`

interface MdxModule {
  default: any
  _frontmatter: {
    title: string
  }
}

export const PageLink: React.FC<{ to: MdxModule }> = ({ to }) => {
  return (
    <Container>
      <ArrowIcon />
      <p>{to._frontmatter.title}</p>
    </Container>
  )
}
