import * as React from 'react'
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
      socialTitle="Mock Service Worker"
    />
    <Hero />
    <Features />
    <Grid>
      <Box as="hr" margin={0} />
      <Box paddingVertical={64} paddingVerticalMd={80} paddingVerticalLg={120}>
        <Quote
          name="Kent C. Dodds"
          title="Teacher, Google Developer Expert"
          content="I found MSW and was thrilled that not only could I still see the mocked responses in my DevTools, but that the mocks didn't have to be written in a Service Worker and could instead live alongside the rest of my app. This made it silly easy to adopt. The fact that I can use it for testing as well makes MSW a huge productivity booster."
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
