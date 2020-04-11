import React from 'react'
import { Composition } from 'atomic-layout'

import { Grid } from '../components/Grid'
import { TextLead } from '../components/TextLead'
import { Accent } from '../components/Accent'

export const Debugging = () => {
  return (
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
        <div>
          <p>Some image</p>
        </div>
        <div>
          <h2>Irreplaceable tool in your debugging arsenal</h2>
          <TextLead>
            Mock the <Accent>very response</Accent> that crashes your app.
          </TextLead>
          <p>
            Triage, bisect, and eliminate front-end issues without resetting the
            state of your application. Don't waste time on...
          </p>
        </div>
      </Composition>
    </Grid>
  )
}
