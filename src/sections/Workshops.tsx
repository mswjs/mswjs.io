import React from 'react'
import { Composition, Box } from 'atomic-layout'

import { Grid } from '../components/Grid'
import { TextLead } from '../components/TextLead'
import { Accent } from '../components/Accent'
import { Text } from '../components/Text'
import {
  ObliqueSection,
  ObliqueSectionContent,
} from '../components/ObliqueSection'

export const Workshops = () => {
  return (
    <ObliqueSection>
      <ObliqueSectionContent>
        <Grid>
          <Composition
            templateColsLg="repeat(2, 1fr)"
            alignItems="center"
            justifyItems="center"
            gap={64}
            paddingVertical={64}
            paddingVerticalMd={100}
            maxWidth="100%"
            width="80%"
            marginHorizontal="auto"
          >
            <Box order={1}>
              <p>Some image</p>
            </Box>
            <div>
              <h2>Workshops & tutorials</h2>
              <TextLead>
                API for your next tutorial{' '}
                <Accent>in a matter of minutes</Accent>.
              </TextLead>
              <Text color="gray">
                Let your students <em>and</em> yourself focus on the topic,
                while <span class="no-wrap">Mock Service Worker</span> provides
                a reliable API substitution that you don't even have to run, and
                that behaves the same between different OS.
              </Text>
            </div>
          </Composition>
        </Grid>
      </ObliqueSectionContent>
    </ObliqueSection>
  )
}
