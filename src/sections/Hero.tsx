import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import { Box, Composition, makeResponsive } from 'atomic-layout'

import { ReactComponent as HeroShape } from '../images/hero-pattern.svg'

import { Grid } from '../components/Grid'
import { Heading } from '../components/Heading'
import { TextLead } from '../components/TextLead'
import { Button } from '../components/Button'
import { FullUsageExample } from '../components/FullUsageExample'
import theme from '../theme'

const Container = styled.section`
  position: relative;
  background-color: ${({ theme }) =>
    theme.utils.alpha(theme.colors.secondary, 0.2)};

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
            style={{ stopColor: theme.colors.secondary, stopOpacity: 0.2 }}
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
        paddingVerticalLg={164}
      >
        <Grid>
          <Composition
            alignItems="flex-start"
            templateColsXl="1fr minmax(650px, 1fr)"
            gap={64}
          >
            <Box marginTopLg={60}>
              <Heading level={1} hero>
                API mocking of
                <br />
                the next generation
              </Heading>
              <TextLead>
                Mock by intercepting actual requests. No more servers,
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
            </Box>

            <Box justify="center" width="100%">
              <FullUsageExample />
            </Box>
          </Composition>
        </Grid>
      </Box>
      <ManualHeroShape />

      {/* <Box as={AbsoluteHeroShape} height={50} heightMd="initial" /> */}
    </div>
  )
}
