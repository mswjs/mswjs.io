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

const HomePage = () => (
  <Layout>
    <SEO title="Home" />
    <Hero />
    <DividerPattern />

    <Features />
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
