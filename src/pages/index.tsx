import React from 'react'

import SEO from '../components/seo'
import Layout from '../components/layout'
import { Grid } from '../components/Grid'

import { Hero } from '../sections/Hero'
import { Highlights } from '../sections/Highlights'
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
            <Text marginBottom={0}>
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
    <DesignedToScale />
    <StartUsing />
  </Layout>
)

export default HomePage
