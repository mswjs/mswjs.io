import React from 'react'
import { Composition } from 'atomic-layout'

import { Grid } from '../components/Grid'
import { TextLead } from '../components/TextLead'
import { Accent } from '../components/Accent'

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
      >
        <div>
          <p>Some image</p>
        </div>
        <div>
          <h2>Perfect for testing at any level</h2>
          <TextLead>
            Write test suites that <Accent>do not smell</Accent>.
          </TextLead>
          <ul>
            <li>Target any state of the API</li>
            <li>Keep your tests ABSOLUTELY clean</li>
            <li>Delay responses to simulate slow connection speed</li>
          </ul>
        </div>
      </Composition>
    </Grid>
  )
}
