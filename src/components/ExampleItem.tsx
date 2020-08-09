import React from 'react'
import { Box } from 'atomic-layout'
import { Text } from './Text'
import styled, { css } from 'styled-components'

import { TextLead } from './TextLead'

type ExampleItemMode = 'full' | 'minimal'

const Container = styled.a<{ mode: ExampleItemMode }>`
  background-color: var(--color-gray-dim);
  border: 1px solid transparent;
  border-radius: var(--border-radius);
  text-decoration: none;
  color: inherit;
  align-items: center;

  ${({ mode }) => {
    switch (mode) {
      case 'full': {
        return css`
          flex-direction: column;
          text-align: center;
        `
      }

      case 'minimal': {
        return css`
          flex-direction: row;
          text-align: start;
        `
      }
    }
  }}

  &:hover {
    border-color: var(--color-gray-light);
  }

  :focus {
    border-color: var(--color-primary);
    box-shadow: 0 0 0 5px
      ${({ theme }) => theme.utils.alpha(theme.colors.primary, 0.4)};
    outline: none;
  }
`

interface PropsExample {
  mode?: ExampleItemMode
  title: string
  description?: string
  logo: any
  fill: string
  url: string
}

export const ExampleItem: React.FC<PropsExample> = ({
  mode = 'full',
  title,
  description,
  logo: Logo,
  fill,
  url,
}) => {
  const iconSize = mode === 'full' ? 64 : 48
  const paddingVertical = mode === 'full' ? 48 : 24
  const paddingHorizontal = mode === 'full' ? 32 : 16

  return (
    <Box
      as={Container}
      href={url}
      flex
      mode={mode}
      paddingVertical={paddingVertical}
      paddingHorizontal={paddingHorizontal}
    >
      <Box marginRight={mode === 'minimal' && 10}>
        <Box
          as={Logo}
          fill={fill}
          height={iconSize}
          marginBottom={mode === 'full' && 24}
        />
      </Box>
      <Box>
        <Box as={TextLead} marginBottom={0}>
          {title}
        </Box>
        {description && (
          <Text color="gray" marginTop={4}>
            {description}
          </Text>
        )}
      </Box>
    </Box>
  )
}
