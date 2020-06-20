import React from 'react'
import { Composition } from 'atomic-layout'
import styled from 'styled-components'
import { Grid } from '../components/Grid'
import { CheckistItem } from '../components/ChecklistItem'
import { Accent } from '../components/Accent'
import { Heading } from '../components/Heading'

const Container = styled.div`
  background-image: linear-gradient(
    120deg,
    #eee,
    ${({ theme }) => theme.colors.grayDim}
  );
`

const UnstyledUl = styled.ul`
  margin: 0;
`

export const Highlights = () => {
  return (
    <Container>
      <Grid paddingVertical={64} paddingVerticalMd={80} paddingVerticalLg={120}>
        <Composition
          templateColsXl="repeat(2, 1fr)"
          alignItems="center"
          gap={32}
          gapMd={64}
        >
          <div>
            <Heading level={3}>
              Why do people <Accent>fall in love</Accent> with{' '}
              <span className="no-wrap">Mock Service Worker</span>?
            </Heading>
          </div>
          <Composition as={UnstyledUl} gap={12} templateColsMd="repeat(2, 1fr)">
            <CheckistItem>Interception on the network level</CheckistItem>
            <CheckistItem>Modular functional syntax</CheckistItem>
            <CheckistItem>Standardized Service Worker API</CheckistItem>
            <CheckistItem>Client-side execution</CheckistItem>
            <CheckistItem>Support of REST API and GraphQL</CheckistItem>
            <CheckistItem>TypeScript support</CheckistItem>
          </Composition>
        </Composition>
      </Grid>
    </Container>
  )
}
