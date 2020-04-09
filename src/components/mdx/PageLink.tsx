import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'

const Container = styled.a`
  display: block;
  padding: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.grayLight};
  border-radius: 4px;
`

export const PageLink: React.FC<{ slug: string }> = ({ slug }) => {
  return (
    <Container>
      <p>Slug: {slug}</p>
    </Container>
  )
}
