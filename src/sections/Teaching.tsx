import React from 'react'
import styled from 'styled-components'
import { Box } from 'atomic-layout'

import { TextLead } from '../components/TextLead'
import { Accent } from '../components/Accent'
import { Text } from '../components/Text'
import { Section, SectionContent } from '../components/Section'
import { Heading } from '../components/Heading'

import { ReactComponent as TeachersDiagram } from '../images/teachers-diagram.svg'
import { ReadmoreLink } from '../components/ReadmoreLink'

const AnimatedDiagram = styled(TeachersDiagram)`
  max-width: 100%;

  #progress-left,
  #progress-top,
  #progress-bottom,
  #progress-right {
    animation: strokeOffset 30s linear infinite;
  }

  #teacher-circle-beat {
    animation: pulseAndFade 5s ease infinite;
    transform-origin: 32px 32px;
  }

  #middle-fill,
  #right-fill,
  #left-fill {
    mask: url('#mask-4');
    transform-origin: 32px 32px;
    animation: fillUp 5s ease infinite backwards;
  }

  #left-fill {
    animation-duration: 6.5s;
  }

  #right-fill {
    animation-duration: 7.5s;
  }

  @keyframes pulseAndFade {
    0%,
    50% {
      opacity: 0.5;
      transform: scale(1);
    }

    100% {
      opacity: 0;
      transform: scale(1.5);
    }
  }

  @keyframes fillUp {
    0% {
      y: 64;
    }
    50% {
      y: 0;
      mask: url('#mask-4');
      transform: scale(1);
      rx: 0;
    }
    51% {
      opacity: 1;
      transform: scale(1);
      rx: 50%;
      mask: unset;
    }
    100% {
      mask: unset;
      opacity: 0;
      rx: 50%;
      transform: scale(1.5);
    }
  }
`

export const Teaching: React.FC = () => {
  return (
    <Section>
      <Box orderLg={1}>
        <AnimatedDiagram />
      </Box>
      <SectionContent>
        <Heading level={2} marginBottom={8} align="center" alignLg="start">
          Teach what matters
        </Heading>
        <TextLead align="center" alignLg="start">
          API for your next lesson <Accent>in a matter of minutes</Accent>.
        </TextLead>
        <Text color="gray">
          Let your students <em>and</em> yourself focus on the topic, while{' '}
          <span className="no-wrap">Mock Service Worker</span> provides a
          reliable API substitution that you don't need to run, and that behaves
          the same between different OS.
        </Text>
        <ReadmoreLink
          href="https://epicreact.dev/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Enroll in the "Epic React" course featuring MSW
        </ReadmoreLink>
      </SectionContent>
    </Section>
  )
}
