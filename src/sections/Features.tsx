import React from 'react'
import { Composition } from 'atomic-layout'

import { Grid } from '../components/Grid'

export const Features = () => {
  return (
    <Grid>
      <Composition
        templateColsLg="repeat(3, 1fr)"
        gap={32}
        paddingVertical={64}
        paddingVerticalMd={100}
      >
        <div>
          <h3>Non-invasive</h3>
          <p>
            Forget about stubs and hacks that make your code smell. Leverage a
            dedicated layer of interception to keep your tests clean and shiny.
          </p>
        </div>
        <div>
          <h3>Deviation-free</h3>
          <p>
            Request the same production resources and test the behavior of your
            app. Test what actually matters, leaving the mocking to MSW.
          </p>
        </div>
        <div>
          <h3>Familiar & Powerful</h3>
          <p>
            Use Express-like mocking route definition syntax to capture outgoing
            requests. Parameters, wildcards, regular expressions—mocking has
            never been easier.
          </p>
        </div>
      </Composition>
    </Grid>
  )
}
