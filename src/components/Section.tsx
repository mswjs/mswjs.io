import React from 'react'
import { Composition, Box } from 'atomic-layout'
import { CompositionProps } from '@atomic-layout/core'
import { Grid } from './Grid'

export const Section: React.FC<CompositionProps> = ({
  children,
  ...gridProps
}) => {
  return (
    <Grid>
      <Composition
        templateCols="minmax(0, 1fr)"
        templateColsLg="repeat(2, 1fr)"
        alignItems="center"
        justifyItems="center"
        gap={48}
        gapMd={64}
        paddingVertical={64}
        paddingVerticalMd={100}
        paddingVerticalLg={200}
        maxWidth="100%"
        marginHorizontal="auto"
        {...gridProps}
      >
        {children}
      </Composition>
    </Grid>
  )
}

export const SectionContent: React.FC = ({ children }) => {
  return (
    <Box
      maxWidth="100%"
      maxWidthSm="80%"
      maxWidthLg="100%"
      marginHorizontal="auto"
    >
      {children}
    </Box>
  )
}
