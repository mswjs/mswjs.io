import React from 'react'
import { Link } from 'gatsby'
import { Box } from 'atomic-layout'

import { Grid } from '../components/Grid'
import { Text } from '../components/Text'
import { Button } from '../components/Button'
import { Heading } from '../components/Heading'
import { TextLead } from '../components/TextLead'
import styled from 'styled-components'

const Container = styled.section`
  /* background-color: var(--color-primary); */
`

export const StartUsing = () => {
  return (
    <Container>
      <Grid paddingVertical={64} paddingVerticalLg={148}>
        <Box
          flex
          flexDirection="column"
          alignItems="center"
          maxWidth="100%"
          widthLg={600}
          marginHorizontal="auto"
        >
          <Heading level={2} align="center">
            Start today!
          </Heading>
          <TextLead align="center">
            Integrate first-class API mocking in your project in under 10
            minutes.
          </TextLead>
          <Text align="center">
            Mock Service Worker can be used in any browser environment, be it
            your application, a unit test, or an end-to-end scenario. Bring your
            API mocking to the next level today.
          </Text>
          <Box marginTop={32}>
            <Button
              variant="primary"
              hero
              as={Link}
              to="/docs/getting-started/install"
            >
              Take the tutorial
            </Button>
          </Box>
        </Box>
      </Grid>
    </Container>
  )
}
