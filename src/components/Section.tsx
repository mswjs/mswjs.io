import React from 'react'
import { Composition } from 'atomic-layout'
import { Grid } from './Grid'

export const Section: React.FC = ({ children }) => {
  return (
    <Grid>
      <Composition
        templateColsLg="repeat(2, 1fr)"
        alignItems="center"
        justifyItems="center"
        gap={64}
        paddingVertical={64}
        paddingVerticalLg={148}
        maxWidth="100%"
        marginHorizontal="auto"
      >
        {children}
      </Composition>
    </Grid>
  )
}
