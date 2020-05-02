import React from 'react'
import { Composition, Box } from 'atomic-layout'

import { Grid } from '../components/Grid'
import { TextLead } from '../components/TextLead'
import { Accent } from '../components/Accent'
import { Text } from '../components/Text'
import { ObliqueSection } from '../components/ObliqueSection'
import { Section } from '../components/Section'
import { Heading } from '../components/Heading'

export const Workshops = () => {
  return (
    <ObliqueSection>
      <Section>
        <Box order={1}>
          <p>Some image</p>
        </Box>
        <div>
          <Heading level={2}>Perfect for teachers</Heading>
          <TextLead>
            API for your next tutorial <Accent>in a matter of minutes</Accent>.
          </TextLead>
          <Text color="gray">
            Let your students <em>and</em> yourself focus on the topic, while{' '}
            <span className="no-wrap">Mock Service Worker</span> provides a
            reliable API substitution that you don't even have to run, and that
            behaves the same between different OS.
          </Text>
        </div>
      </Section>
    </ObliqueSection>
  )
}
