import React from 'react'
import { Box } from 'atomic-layout'
import { BoxProps } from '@atomic-layout/core'

export const Grid: React.FC<BoxProps> = (props) => {
  return (
    <Box
      // widthSm="600px"
      // widthMd="720px"
      // widthLg="960px"
      // widthXl="1140px"
      widthXxl="1360px"
      marginHorizontal="auto"
      paddingHorizontal={20}
      paddingHorizontalSm={32}
      maxWidth="100%"
      {...props}
    />
  )
}
