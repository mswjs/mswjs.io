import React from 'react'
import { Box } from 'atomic-layout'

import { Section, SectionContent } from '../components/Section'
import { Heading } from '../components/Heading'
import { Text } from '../components/Text'

import { ReactComponent as AgnosticIllustration } from '../images/msw-agnostic.svg'

import styled from 'styled-components'
import { TextLead } from '../components/TextLead'
import { Accent } from '../components/Accent'

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
          Perfect match for <Accent>any setup</Accent>.
        </TextLead>
        <Text color="gray">
          API mocking that is available anywhere: during the development, unit
          tests of UI components, or entire end-to-end scenarios. Living in a
          dedicated mocking layer, Mock Sercive Worker is agnostic of the
          frameworks, libraries, or setups you may use.
        </Text>
      </SectionContent>
    </Section>
  )
}
