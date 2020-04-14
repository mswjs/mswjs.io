import React from 'react'
import { Composition } from 'atomic-layout'

import { Grid } from '../components/Grid'
import { TextLead } from '../components/TextLead'
import { Accent } from '../components/Accent'
import { Text } from '../components/Text'

export const Testing = () => {
  return (
    <Grid>
      <Composition
        templateColsLg="repeat(2, 1fr)"
        alignItems="center"
        justifyItems="center"
        gap={32}
        paddingVertical={64}
        paddingVerticalMd={100}
        maxWidth="100%"
        width="80%"
        marginHorizontal="auto"
      >
        <div>
          <p>Some image</p>
        </div>
        <div>
          <h2>Perfect for testing at any level</h2>
          <TextLead>
            Write test suites that <Accent>don't smell</Accent>.
          </TextLead>
          <Text color="gray">
            Target any state of your API, while keeping the test suits slim and
            clean. A single imported module that declaratively mocks given
            request routes, nothing more.
          </Text>
        </div>
      </Composition>
    </Grid>
  )
}
