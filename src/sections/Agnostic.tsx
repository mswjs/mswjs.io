import React from 'react'
import styled from 'styled-components'
import { Box } from 'atomic-layout'

import { Section, SectionContent } from '../components/Section'
import { Heading } from '../components/Heading'
import { Text } from '../components/Text'
import { TextLead } from '../components/TextLead'
import { Accent } from '../components/Accent'
import { ReadmoreLink } from '../components/ReadmoreLink'

import { ReactComponent as AgnosticIllustration } from '../images/msw-agnostic.svg'

const Parent = styled.div`
  position: relative;

  [class$='connection'] {
    stroke-dasharray: 14;
    stroke: var(--color-gray-light);

    @media (prefers-reduced-motion: no-preference) {
      animation: lineProgress 24s linear infinite;
    }
  }

  @keyframes lineProgress {
    0% {
      stroke-dashoffset: -100%;
    }

    100% {
      stroke-dashoffset: 0;
    }
  }
`

export const Agnostic = () => {
  return (
    <Section>
      <Box as={Parent} orderLg={1}>
        <AgnosticIllustration />
      </Box>
      <SectionContent>
        <Heading level={2} marginBottom={8} align="center" alignLg="start">
          Integrate anywhere
        </Heading>
        <TextLead align="center" alignLg="start">
          Perfect match for <Accent>your setup</Accent>.
        </TextLead>
        <Text color="gray">
          API mocking that is available anywhere: during development, unit tests
          of UI components, or entire end-to-end scenarios. Living in a
          dedicated mocking layer, Mock Sercive Worker is agnostic of the
          frameworks, libraries, or setups you may use.
        </Text>
        <ReadmoreLink href="https://github.com/mswjs/examples">
          See usage example with your setup
        </ReadmoreLink>
      </SectionContent>
    </Section>
  )
}
