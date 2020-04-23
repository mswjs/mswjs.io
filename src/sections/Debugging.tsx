import React from 'react'

import { TextLead } from '../components/TextLead'
import { Accent } from '../components/Accent'
import { Section } from '../components/Section'
import { Heading } from '../components/Heading'

export const Debugging = () => {
  return (
    <Section>
      <div>
        <p>Some image</p>
      </div>
      <div>
        <Heading level={2} marginBottom={8}>
          Your next favorite debugging tool
        </Heading>
        <TextLead>
          Mock the <Accent>very response</Accent> that crashes your app.
        </TextLead>
        <p>
          Triage, bisect, and eliminate front-end issues without resetting the
          state of your application. Stop wasting time when you are one import
          away from full-scale mocking.
        </p>
      </div>
    </Section>
  )
}
