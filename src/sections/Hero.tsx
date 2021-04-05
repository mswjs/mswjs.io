import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import { Box, Composition } from 'atomic-layout'

import { Grid } from '../components/Grid'
import { Heading } from '../components/Heading'
import { TextLead } from '../components/TextLead'
import { Button } from '../components/Button'
import { FullUsageExample } from '../components/FullUsageExample'

const Container = styled.section`
  position: relative;
  background-image: linear-gradient(hsl(210, 32%, 97%), #fff);

  &:before {
    content: '';
    position: absolute;
    top: -80px;
    height: 80px;
    width: 100%;

    background-color: inherit;
    z-index: -1;
  }
`

export const Hero = () => {
  return (
    <div>
      <Box
        as={Container}
        paddingVertical={48}
        paddingVerticalMd={64}
        paddingVerticalXl={164}
      >
        <Grid>
          <Composition
            templateCols="minmax(0, 1fr)"
            templateColsXl="1fr 50%"
            gap={64}
            alignItems="flex-start"
            width={650}
            widthXl="initial"
            maxWidth="100%"
            marginHorizontal="auto"
          >
            <Box marginTopLg={60}>
              <Heading level={1} hero>
                API mocking of the next generation
              </Heading>
              <TextLead>
                Mock by intercepting requests on the network level. Seamlessly
                reuse the same mock definition for testing, development, and
                debugging.
              </TextLead>
              <Composition
                inline
                templateColsSm="repeat(2, auto)"
                gap={10}
                marginTop={24}
                width="100%"
                widthMd="initial"
              >
                <Button
                  as={Link}
                  to="/docs/getting-started/install"
                  variant="primary"
                  hero
                >
                  Get started
                </Button>
                <Button as={Link} to="/examples">
                  See examples
                </Button>
              </Composition>
            </Box>

            <Box justify="center" width="100%">
              <FullUsageExample />
            </Box>
          </Composition>
        </Grid>
      </Box>
    </div>
  )
}
