import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import { Box } from 'atomic-layout'

import { TextLead } from '../components/TextLead'
import { Accent } from '../components/Accent'
import { Text } from '../components/Text'
import { Section, SectionContent } from '../components/Section'
import { Heading } from '../components/Heading'
import { ReactComponent as Diagram } from '../images/development-diagram.svg'
import { ReadmoreLink } from '../components/ReadmoreLink'

const AnimatedDiagram = styled(Diagram)`
  width: 100%;

  #progress {
    animation: strokeOffset 30s linear infinite;
  }

  #request-rest {
    animation: requestRest 16s ease infinite;
  }

  #request-graphql {
    animation: requestGraphql 16s ease infinite;
  }

  #response-rest {
    animation: responseRest 16s ease infinite;
  }

  #response-graphql {
    animation: responseGraphql 16s ease infinite;
  }

  @keyframes requestRest {
    0% {
      opacity: 0;
      transform: translateX(-50%);
    }
    12.5%,
    25%,
    37.5% {
      opacity: 1;
      transform: translateX(0);
    }
    50%,
    100% {
      opacity: 0;
      transform: translateX(50%);
    }
  }

  @keyframes requestGraphql {
    0%,
    50% {
      opacity: 0;
      transform: translateX(-50%);
    }
    62.5%,
    75%,
    87.5% {
      opacity: 1;
      transform: translateX(0);
    }
    100% {
      opacity: 0;
      transform: translateX(50%);
    }
  }

  @keyframes responseRest {
    0% {
      opacity: 0;
      transform: translateX(50%);
    }
    12.5%,
    25%,
    37.5% {
      opacity: 1;
      transform: translateX(0);
    }
    50%,
    100% {
      opacity: 0;
      transform: translateX(-50%);
    }
  }

  @keyframes responseGraphql {
    0%,
    50% {
      opacity: 0;
      transform: translateX(50%);
    }
    62.5%,
    75%,
    87.5% {
      opacity: 1;
      transform: translateX(0);
    }
    100% {
      opacity: 0;
      transform: translateX(-50%);
    }
  }
`

const IllustrationContainer = styled.div`
  position: relative;
  overflow: hidden;
`

export const Development = () => {
  return (
    <Section>
      <Box
        as={IllustrationContainer}
        orderLg={1}
        alignItems="center"
        justifyItems="center"
        justifyContent="space-between"
        width="100%"
        maxWidth={500}
        marginHorizontal="auto"
      >
        <AnimatedDiagram />
      </Box>
      <SectionContent>
        <Heading level={2} marginBottom={8} align="center" alignLg="start">
          Develop incrementally
        </Heading>
        <TextLead align="center" alignLg="start">
          Modern solution for <Accent>competitive development</Accent>.
        </TextLead>
        <Text color="gray">
          Present a fully functioning application or kick off the next
          successful startup without having any backend at all. RESTful API
          today, or GraphQL tomorrow? Experiment, combine, and find what suits
          your project best before committing to the ecosystem.
        </Text>
        <Text marginBottom={0}>
          <ReadmoreLink as={Link} to="/docs/getting-started/mocks/rest-api">
            Explore REST API integration
          </ReadmoreLink>
        </Text>
        <Text>
          <ReadmoreLink as={Link} to="/docs/getting-started/mocks/graphql-api">
            Explore GraphQL API integration
          </ReadmoreLink>
        </Text>
      </SectionContent>
    </Section>
  )
}
