import React from 'react'
import { Link } from 'gatsby'
import { Composition, Box } from 'atomic-layout'

import Layout from '../components/layout'
import { Grid } from '../components/Grid'
import { Button } from '../components/Button'
import SEO from '../components/seo'
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
            <h1>
              Client-side API mocking <br />
              of the next generation
            </h1>
            <TextLead>
              Seamless mocking by intercepting production requests. No servers,
              no conditional URL, not a single change to the existing codebase.
            </TextLead>
            <Composition
              inline
              templateCols="repeat(2, auto)"
              gap={10}
              marginTop={16}
            >
              <Button as={Link} to="/docs/getting-started" variant="primary">
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
