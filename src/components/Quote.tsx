import React from 'react'
import { Box, Composition } from 'atomic-layout'
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
    color: var(--color-primary);
    font-size: 4rem;
    font-weight: 600;
    margin-top: -0.5ch;
  }

  ::before {
    content: '“';
  }

  ::after {
    content: '”';
  }
`

const QuoteContent = styled(TextLead)`
  color: var(--color-black);
  font-style: italic;
  line-height: 1.7;
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
      templateCols="auto auto auto"
      justifyContent="center"
      gap={20}
      maxWidthMd="75%"
      marginHorizontal="auto"
    >
      <section>
        <Box as={QuoteContent} align="center" marginBottom={48}>
          {content}
        </Box>
        <Composition
          templateCols="auto auto"
          alignItems="center"
          justifyContent="center"
          gap={12}
        >
          <Avatar src={avatarUrl} alt={name} />
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
