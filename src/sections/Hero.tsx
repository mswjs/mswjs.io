import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import { Box, Composition } from 'atomic-layout'

import { Grid } from '../components/Grid'
import { Heading } from '../components/Heading'
import { TextLead } from '../components/TextLead'
import { Button } from '../components/Button'
import { FullUsageExample } from '../components/FullUsageExample'
import theme from '../theme'

const Container = styled.section`
  position: relative;
  background-color: ${({ theme }) =>
    theme.utils.alpha(theme.colors.secondary, 0.25)};

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

const AbsoluteHeroShape = styled.svg`
  box-sizing: border-box;
  fill: url(#gradientGray);
  z-index: -1;
  width: 100%;
`

const ManualHeroShape = () => {
  return (
    <AbsoluteHeroShape viewBox="0 0 2000 150" preserveAspectRatio="none">
      <defs>
        <linearGradient id="gradientGray" x1="0%" y1="0%" x2="0%" y2="400%">
          <stop
            offset="0%"
            style={{ stopColor: theme.colors.secondary, stopOpacity: 0.25 }}
          />
          <stop
            offset="100%"
            style={{ stopColor: theme.colors.secondary, stopOpacity: 0.4 }}
          />
        </linearGradient>
      </defs>
      <path
        d="
M-250 0
t250 100
t500 0
t500 0
t500 -20
t500 0
t 500 -100
"
      />
    </AbsoluteHeroShape>
  )
}

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
            templateColsXl="1fr minmax(auto, 1fr)"
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
                Mock by intercepting actual requests. No more servers,
                conditional URL, and changes to the existing code.
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
                  Getting started
                </Button>
                <Button as="a" href="https://github.com/mswjs/examples">
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

      <ManualHeroShape />
    </div>
  )
}
