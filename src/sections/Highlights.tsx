import React from 'react'
import { Composition, Box } from 'atomic-layout'
import styled from 'styled-components'
import { CheckistItem } from '../components/ChecklistItem'
import { Heading } from '../components/Heading'
import { Section } from '../components/Section'
import { Companies } from './Companies'

const Container = styled.div`
  background-color: var(--color-gray-dim);
  font-size: 1.15rem;

  hr {
    background-color: var(--color-gray);
    opacity: 0.16;
    width: 100%;
  }
`

const UnstyledUl = styled.ul`
  margin: 0;
`

export const Highlights = () => {
  return (
    <Container>
      <Section templateColsLg="1fr">
        <div>
          <Heading level={3} align="center">
            Why Mock Service Worker?
          </Heading>
        </div>
        <Composition
          as={UnstyledUl}
          gap={12}
          gapCol={64}
          templateColsMd="repeat(2, 1fr)"
        >
          <CheckistItem>Interception on the network level</CheckistItem>
          <CheckistItem>Composable functional syntax</CheckistItem>
          <CheckistItem>Standardized Service Worker API</CheckistItem>
          <CheckistItem>Client-side execution</CheckistItem>
          <CheckistItem>Support of REST API and GraphQL</CheckistItem>
          <CheckistItem>Native TypeScript support</CheckistItem>
        </Composition>
        <hr />
        <Companies />
      </Section>
    </Container>
  )
}
