import React from 'react'
import { Box } from 'atomic-layout'
import { Text } from '../components/Text'
import styled from 'styled-components'

import { TextLead } from '../components/TextLead'

const Container = styled.a`
  border: 1px solid var(--color-gray-light);
  border-radius: var(--border-radius);
  text-decoration: none;
  color: inherit;

  :hover {
    border-color: var(--color-primary);
  }

  :focus {
    border-color: var(--color-primary);
    box-shadow: 0 0 0 5px
      ${({ theme }) => theme.utils.alpha(theme.colors.primary, 0.4)};
    outline: none;
  }
`

interface PropsExample {
  textLide: string
  text: string
  logo: any
  fill: string
  url: string
}

export const ExampleItem: React.FC<PropsExample> = ({
  textLide,
  text,
  logo: Logo,
  fill,
  url,
}) => {
  return (
    <Box
      as={Container}
      href={url}
      flex
      flexDirection="column"
      alignItems="center"
      padding={32}
    >
      <Box as={Logo} fill={fill} height={64} marginBottom={24} />
      <Box as={TextLead} align="center" marginBottom={16}>
        {textLide}
      </Box>
      <Text color="gray">{text}</Text>
    </Box>
  )
}
