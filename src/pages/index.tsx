import React from 'react'
import { Box } from 'atomic-layout'

import SEO from '../components/seo'
import Layout from '../components/layout'
import { Grid } from '../components/Grid'

import { Hero } from '../sections/Hero'
import { Highlights } from '../sections/Highlights'
import { Features } from '../sections/Features'
import { Testing } from '../sections/Testing'
import { Development } from '../sections/Development'
import { Debugging } from '../sections/Debugging'
import { Teaching } from '../sections/Teaching'
import { Integration } from '../sections/Integration'

import kentAvatarUrl from '../images/avatars/kentcdodds.png'
import { Quote } from '../components/Quote'

const HomePage = () => (
  <Layout>
    <SEO
      title="MSW – Seamless API mocking library for browser and Node"
      titleTemplate="%s"
    />
    <Hero />
    <Features />
    <Grid>
      <Box as="hr" marginBottom={0} />
      <Box paddingVertical={120}>
        <Quote
          name="Kent C. Dodds"
          title="Teacher, Google Developer Expert"
          content="This is a quote from Kent, I hope he'll share some feedback."
          avatarUrl={kentAvatarUrl}
        />
      </Box>
    </Grid>
    <Highlights />
    <Integration />
    <Testing />
    <Development />
    <Debugging />
    <Teaching />
  </Layout>
)

export default HomePage
