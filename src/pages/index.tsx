import React from 'react'
import { Link } from 'gatsby'
import { Composition, Box } from 'atomic-layout'

import SEO from '../components/seo'
import Layout from '../components/layout'
import { Grid } from '../components/Grid'
import { Button } from '../components/Button'
import { Heading } from '../components/Heading'
import { TextLead } from '../components/TextLead'
import { DividerPattern } from '../components/DividerPattern'

import HeroIllustration from '../images/hero-illustration.png'
import { Highlights } from '../sections/Highlights'
import { GettingStarted } from '../sections/GettingStarted'
import { Features } from '../sections/Features'
import { WhenToUse } from '../sections/WhenToUse'
import { DesignedToScale } from '../sections/DesignedToScale'
import { StartUsing } from '../sections/StartUsing'
import { Testing } from '../sections/Testing'
import { IncrementalDevelopment } from '../sections/IncrementalDevelopment'
import { Debugging } from '../sections/Debugging'

const HomePage = () => (
  <Layout>
    <SEO title="Home" />
    <Box as="section" paddingVertical={64} paddingVerticalMd={164}>
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
              conditional URL, and changes to the existing codebase.
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
    <DividerPattern />

    <Features />
    <Highlights />

    <Testing />
    <IncrementalDevelopment />
    <Debugging />

    <GettingStarted />
    <WhenToUse />
    <DesignedToScale />
    <StartUsing />
  </Layout>
)

export default HomePage
