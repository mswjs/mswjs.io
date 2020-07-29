import React from 'react'
import { Box, Composition, query } from 'atomic-layout'

import { TextLead } from './TextLead'
import { Text } from './Text'
import { TextSmall } from './TextSmall'
import { Avatar } from './Avatar'
import styled from 'styled-components'

const QuoteContainer = styled.blockquote`
  margin: 0;
  padding: 0;

  ::before,
  ::after {
    display: inline-block;
    height: 3rem;
    color: var(--color-gray-light);
    font-size: 4rem;
    font-weight: 600;
    margin-top: -0.5ch;
    margin-left: auto;
    margin-right: auto;
  }

  ::before {
    content: '“';
  }

  ::after {
    display: none;

    @media ${query({ from: 'md' })} {
      content: '”';
      display: inline-block;
    }
  }
`

const QuoteContent = styled(TextLead)`
  color: var(--color-black);
  font-style: italic;
  line-height: 1.7;

  @media ${query({ to: 'md' })} {
    font-size: 1rem;
  }
`

interface Props {
  name: string
  title: string
  avatarUrl: string
  content: string
}

export const Quote: React.FC<Props> = ({ name, title, content, avatarUrl }) => {
  return (
    <Composition
      as={QuoteContainer}
      templateColsMd="auto auto auto"
      justifyContent="center"
      gap={20}
      maxWidthMd="75%"
      marginHorizontal="auto"
    >
      <section>
        <Box as={QuoteContent} alignMd="center" marginBottom={48}>
          {content}
        </Box>
        <Composition templateCols="auto auto" alignItems="center" gap={12}>
          <Box as={Avatar} src={avatarUrl} alt={name} justify="flex-end" />
          <div>
            <Text marginBottom={0}>
              <strong>{name}</strong>
            </Text>
            <TextSmall color="gray">{title}</TextSmall>
          </div>
        </Composition>
      </section>
    </Composition>
  )
}
