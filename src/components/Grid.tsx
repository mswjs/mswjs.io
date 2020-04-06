import React from "react"
import { Box } from "atomic-layout"
import { BoxProps } from "@atomic-layout/core"

export const Grid: React.FC<BoxProps> = props => {
  return (
    <Box
      width="1400px"
      marginHorizontal="auto"
      paddingHorizontal={16}
      paddingHorizontalSm={32}
      maxWidth="100%"
      {...props}
    />
  )
}
