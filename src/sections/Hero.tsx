import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import { Box, Composition, makeResponsive } from 'atomic-layout'
import { IoIosPlay } from 'react-icons/io'

import { ReactComponent as HeroShape } from '../images/hero-shape.svg'

import { Grid } from '../components/Grid'
import { Heading } from '../components/Heading'
import { TextLead } from '../components/TextLead'
import { Button } from '../components/Button'
import theme from '../theme'

const AbsoluteSvg = makeResponsive(styled(Box)`
  position: absolute;
  top: 0;
  right: 0;
  fill: url(#grad1);
  z-index: -1;
`)

AbsoluteSvg.defaultProps = {
  as: 'svg',
}

const VideoContainer = styled.div`
  height: 400px;
  width: 650px;
  max-width: 100%;

  border-radius: 1rem;
  background-color: ${({ theme }) => theme.colors.secondary};
  background-image: url('https://images.unsplash.com/photo-1557669973-a927e548e948?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3302&q=80');
  background-size: cover;
  background-blend-mode: soft-light;

  box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.02),
    0 6.7px 5.3px rgba(0, 0, 0, 0.028), 0 12.5px 10px rgba(0, 0, 0, 0.035),
    0 22.3px 17.9px rgba(0, 0, 0, 0.042), 0 41.8px 33.4px rgba(0, 0, 0, 0.05),
    0 100px 80px rgba(0, 0, 0, 0.07);
`

const PlayButton = styled.button`
  display: block;
  border: 0;
  height: 100px;
  width: 100px;
  background-color: #fff;
  border-radius: 50%;
  color: ${({ theme }) => theme.colors.black};
  cursor: pointer;

  svg {
    margin: 0 20px -10px;
  }
`

export const Hero = () => {
  return (
    <Box
      as="section"
      paddingVertical={48}
      paddingVerticalMd={64}
      paddingVerticalLg={164}
    >
      <svg height={0} width={0}>
        <defs>
          <linearGradient id="grad1" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" style={{ stopColor: 'red', stopOpacity: 0.6 }} />
            <stop
              offset="100%"
              style={{ stopColor: theme.colors.primary, stopOpacity: 1 }}
            />
          </linearGradient>
        </defs>
      </svg>

      <AbsoluteSvg
        as={HeroShape}
        widthSmDown={0}
        widthLg={800}
        widthXl={900}
        maxWidth="60vw"
        widthXxl={1350}
      />

      <Grid>
        <Composition
          alignItems="center"
          templateColsXl="repeat(2, 1fr)"
          gap={64}
        >
          <Box orderXl={1} justify="center">
            <Box
              as={VideoContainer}
              flex
              alignItems="center"
              justifyContent="center"
            >
              <Box
                as={PlayButton}
                flex
                alignItems="center"
                justifyContent="center"
              >
                <IoIosPlay size={48} />
              </Box>
            </Box>
          </Box>
          <div>
            <Heading level={1} hero>
              API mocking of
              <br />
              the next generation
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
        </Composition>
      </Grid>
    </Box>
  )
}
