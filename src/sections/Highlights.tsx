import React from 'react'
import { Composition } from 'atomic-layout'
import styled from 'styled-components'
import { Grid } from '../components/Grid'
import { CheckistItem } from '../components/ChecklistItem'
import { Accent } from '../components/Accent'

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
      <Grid paddingVertical={64} paddingVerticalMd={100}>
        <Composition
          templateColsXl="repeat(2, 1fr)"
          alignItems="center"
          gap={64}
        >
          <div>
            <h2>
              Convincing titles.
              <br />
              Are <Accent>not easy</Accent> to write.
            </h2>
          </div>
          <Composition as={UnstyledUl} gap={12} templateColsMd="repeat(2, 1fr)">
            <CheckistItem>Full specification compliance</CheckistItem>
            <CheckistItem>Powerful functional syntax</CheckistItem>
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
