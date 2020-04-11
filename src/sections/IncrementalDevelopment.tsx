import React from 'react'
import { Composition, Box } from 'atomic-layout'

import { Grid } from '../components/Grid'
import { TextLead } from '../components/TextLead'
import { Accent } from '../components/Accent'

export const IncrementalDevelopment = () => {
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
        <Box order={1}>
          <p>Some image</p>
        </Box>
        <div>
          <h2>Incremental development</h2>
          <TextLead>
            Modern solution for <Accent>competitive development.</Accent>
          </TextLead>
          <p>
            Present a fully functioning application or kick off the next
            successful startup without having a single backend code. RESTful API
            today, or GraphQL tomorrow? Experiment, combine, and find what suits
            your project best before committing to the ecosystem.
          </p>
        </div>
      </Composition>
    </Grid>
  )
}
