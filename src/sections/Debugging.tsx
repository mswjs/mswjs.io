import React from 'react'
import styled from 'styled-components'
import { Box } from 'atomic-layout'
import NightOwlTheme from 'prism-react-renderer/themes/nightOwl'
import {
  IoIosPlay as PlayIcon,
  IoIosPause as PauseIcon,
  IoIosSquare as StopIcon,
} from 'react-icons/io'

import { Accent } from '../components/Accent'
import { Text } from '../components/Text'
import { TextLead } from '../components/TextLead'
import { Section, SectionContent } from '../components/Section'
import { Heading } from '../components/Heading'
import { ObliqueSection } from '../components/ObliqueSection'
import { Code } from '../components/mdx/Code'

const Parent = styled.div`
  position: relative;
`

const StyledCode = styled(Code)`
  padding: 2rem 1rem;
  box-shadow: var(--box-shadow);
`

const DebugginToolsContainer = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  z-index: 1;

  background-color: var(--color-gray);
  border-radius: var(--border-radius);
  color: #fff;
`

const DebugginTools: React.FC = () => {
  return (
    <Box as={DebugginToolsContainer} flex alignItems="center">
      <Box as={PlayIcon} fill="#67DA69" margin={10} />
      <Box as={PauseIcon} margin={10} />
      <Box as={StopIcon} fill="#E56B6B" margin={10} />
    </Box>
  )
}

export const Debugging = () => {
  return (
    <ObliqueSection>
      <Section>
        <Box as={Parent} maxWidth="100%" widthLg="100%">
          <DebugginTools />
          <StyledCode
            theme={NightOwlTheme}
            language="javascript"
            copyable={false}
          >
            {`
rest.get('/books', (req, res, ctx) => {
  // So the issue is when there's a single book!
  return res(
    ctx.json([
      {
        id: 'ea42ffcb-e729-4dd5-bfac-7a5b645cb1da',
        title: 'The Lord of the Rings',
        publishedAt: -486867600
      }
    ])
  )
})
            `}
          </StyledCode>
        </Box>
        <SectionContent>
          <Heading level={2} marginBottom={8} align="center" alignLg="start">
            Debug like a pro
          </Heading>
          <TextLead align="center" alignLg="start">
            Mock the <Accent>very response</Accent> that crashes your app.
          </TextLead>
          <Text color="gray">
            Triage, bisect, and eliminate API-related issues without resetting
            the state of your application. With the unique ability to intercept
            requests to any origins, finally feel like you are in charge on what
            happens with the traffic.
          </Text>
        </SectionContent>
      </Section>
    </ObliqueSection>
  )
}
