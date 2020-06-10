import React from 'react'
import styled from 'styled-components'
import { Box } from 'atomic-layout'
import NightOwlTheme from 'prism-react-renderer/themes/nightOwl'

import { Accent } from '../components/Accent'
import { TextLead } from '../components/TextLead'
import { Section, SectionContent } from '../components/Section'
import { Heading } from '../components/Heading'
import { ObliqueSection } from '../components/ObliqueSection'
import { Code } from '../components/mdx/Code'

const StyledCode = styled(Code)`
  padding: 2rem 1rem;
  box-shadow: var(--box-shadow);
`

export const Debugging = () => {
  return (
    <ObliqueSection>
      <Section>
        <Box maxWidth="100%" widthLg="100%">
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
        title: 'Lord of the Rings'
      }
    ])
  )
})
            `}
          </StyledCode>
        </Box>
        <SectionContent>
          <Heading level={2} marginBottom={8} align="center" alignLg="start">
            Next favorite debugging tool
          </Heading>
          <TextLead align="center" alignLg="start">
            Mock the <Accent>very response</Accent> that crashes your app.
          </TextLead>
          <p>
            Triage, bisect, and eliminate front-end issues without resetting the
            state of your application. Stop wasting time when you are one step
            away from full-scale mocking.
          </p>
        </SectionContent>
      </Section>
    </ObliqueSection>
  )
}
