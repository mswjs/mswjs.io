import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import { Box, Composition } from 'atomic-layout'
import HeroIllustration from '../images/hero-illustration.png'

import { Grid } from '../components/Grid'
import { Heading } from '../components/Heading'
import { TextLead } from '../components/TextLead'
import { Button } from '../components/Button'

const Container = styled.section`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.primaryDark};

  h1 {
    color: inherit;
  }
`

export const Hero = () => {
  return (
    <Box as={Container} paddingVertical={64} paddingVerticalMd={164}>
      <Grid>
        <Composition
          alignItems="center"
          templateColsMd="repeat(2, 1fr)"
          gap={64}
        >
          <div>
            <Heading level={1} hero>
              Client-side API mocking <br />
              of the next generation
            </Heading>
            <TextLead>
              Mock by intercepting production requests. No more servers,
              conditional URL, and changes to the existing code.
            </TextLead>
            <Composition
              inline
              templateCols="repeat(2, auto)"
              gap={10}
              marginTop={24}
            >
              <Button
                as={Link}
                to="/docs/getting-started"
                variant="primary"
                hero
              >
                Getting started
              </Button>
              <Button as="a" href="https://github.com/open-draft/msw">
                GitHub
              </Button>
            </Composition>
          </div>
          <Box orderSmDown={-1} justify="center">
            <img src={HeroIllustration} style={{ maxWidth: '450px' }} />
          </Box>
        </Composition>
      </Grid>
    </Box>
  )
}
