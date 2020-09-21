import * as React from 'react'
import { Box } from 'atomic-layout'
import { Text } from './Text'

interface ScopedExampleProps {
  title: string
  logo: any
  fill?: string
  url: string
}

export const ScopedExampleItem: React.FC<ScopedExampleProps> = ({
  title,
  url,
  fill,
  logo,
}) => {
  return (
    <Box flex alignItems="center">
      <Box as={logo} fill={fill} width={32} marginRight={8} />
      <Text>{title}</Text>
    </Box>
  )
}
