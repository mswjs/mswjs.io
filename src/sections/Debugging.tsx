import React from 'react'
import { Link } from 'gatsby'
import NightOwlTheme from 'prism-react-renderer/themes/nightOwl'

import { TextLead } from '../components/TextLead'
import { TextSmall } from '../components/TextSmall'
import { Accent } from '../components/Accent'
import { Section, SectionContent } from '../components/Section'
import { Heading } from '../components/Heading'
import { ObliqueSection } from '../components/ObliqueSection'
import { Code } from '../components/mdx/code'

export const Debugging = () => {
  return (
    <ObliqueSection>
      <Section>
        <div>
          <div className="box-shadow border-radius">
            <Code theme={NightOwlTheme} language="javascript">
              {`
// src/mocks.js
rest.post('/login', (req, res, ctx) => {
  // What if my API suddenly returns an error?
  return res(
    ctx.status(403),
    ctx.json({
      errorMessage: 'Not authorized'
    })
  )
})
            `}
            </Code>
          </div>
          <TextSmall align="center" color="gray">
            Example of mocking an unexpected server response.
            <br />
            <strong>
              Read more on{' '}
              <Link to="/docs/recipes/mocking-error-responses">
                mocking error responses
              </Link>
              .
            </strong>
          </TextSmall>
        </div>
        <SectionContent>
          <Heading level={2} marginBottom={8} align="center" alignLg="start">
            Your next favorite debugging tool
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
