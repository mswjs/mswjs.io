import React from 'react'

import SEO from '../components/seo'
import Layout from '../components/layout'
import { Grid } from '../components/Grid'
import { DividerPattern } from '../components/DividerPattern'

import { Hero } from '../sections/Hero'
import { Highlights } from '../sections/Highlights'
import { GettingStarted } from '../sections/GettingStarted'
import { Features } from '../sections/Features'
import { DesignedToScale } from '../sections/DesignedToScale'
import { StartUsing } from '../sections/StartUsing'
import { Testing } from '../sections/Testing'
import { IncrementalDevelopment } from '../sections/IncrementalDevelopment'
import { Debugging } from '../sections/Debugging'
import { Workshops } from '../sections/Workshops'
import { Box, Composition } from 'atomic-layout'
import { Avatar } from '../components/Avatar'

import kentAvatar from '../images/avatars/kentcdodds.png'
import { TextSmall } from '../components/TextSmall'
import { Text } from '../components/Text'

const HomePage = () => (
  <Layout>
    <SEO title="Home" />
    <Hero />

    <DividerPattern />

    <Features />

    <Grid>
      <hr />
      <Box paddingVertical={120}>
        <Composition
          templateCols="auto auto"
          alignItems="center"
          justifyContent="center"
          gap={12}
        >
          <Avatar src={kentAvatar} alt="Kent C. Dodds" />
          <div>
            <Text marginBottom={4}>
              <strong>Kent C. Dodds</strong>
            </Text>
            <TextSmall color="gray">
              Teacher, open source developer, Google Developer Expert.
            </TextSmall>
          </div>
        </Composition>
      </Box>
    </Grid>

    <Highlights />
    <Testing />
    <IncrementalDevelopment />
    <Debugging />
    <Workshops />
    <GettingStarted />
    <DesignedToScale />
    <StartUsing />
  </Layout>
)

export default HomePage
