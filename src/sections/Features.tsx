import React from 'react'
import styled from 'styled-components'
import { Composition } from 'atomic-layout'

import { Grid } from '../components/Grid'
import { Text } from '../components/Text'

const FeatureLetter = styled.span`
  position: absolute;
  top: 0;
  right: 0;
  z-index: -1;

  color: var(--color-gray-dim);
  font-size: 5rem;
  font-weight: 200;
  line-height: 0;
  user-select: none;
  font-variant-numeric: tabular-nums;
`

const Section = styled.section`
  position: relative;
`

export const Features = () => {
  return (
    <Grid>
      <Composition
        templateColsLg="repeat(3, 1fr)"
        gap={32}
        paddingVertical={64}
        paddingVerticalMd={120}
      >
        <Section>
          <FeatureLetter>01</FeatureLetter>
          <h3>Seamless</h3>
          <Text color="gray">
            Forget about stubs and hacks that make your code smell. Leverage a
            dedicated layer of interception to keep your code clean and shiny.
          </Text>
        </Section>
        <Section>
          <FeatureLetter>02</FeatureLetter>
          <h3>Deviation-free</h3>
          <Text color="gray">
            Request the same production resources and test the behavior of your
            app. Test what actually matters, leaving the mocking to MSW.
          </Text>
        </Section>
        <Section>
          <FeatureLetter>03</FeatureLetter>
          <h3>Familiar & Powerful</h3>
          <Text color="gray">
            Use Express-like mocking route definition syntax to capture outgoing
            requests. Parameters, wildcards, regular expressions—mocking has
            never been easier.
          </Text>
        </Section>
      </Composition>
    </Grid>
  )
}
