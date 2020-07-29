import React from 'react'
import styled from 'styled-components'
import { Composition } from 'atomic-layout'
import {
  AiTwotoneWarning,
  AiTwotonePlayCircle,
  AiTwotoneUpSquare,
} from 'react-icons/ai'

import { Grid } from '../components/Grid'
import { Text } from '../components/Text'
import { Heading } from '../components/Heading'

const Section = styled.section`
  position: relative;
`

const Block = styled.div`
  display: inline-flex;
  margin: 0.5ch 0.5ch 0 0;
  border-radius: 4px;
  color: var(--color-black);
`

export const Features = () => {
  return (
    <Grid>
      <Composition
        templateColsLg="repeat(3, 1fr)"
        gap={64}
        paddingVertical={64}
        paddingVerticalMd={80}
        paddingVerticalLg={120}
      >
        <Section>
          <Heading level={3} flex alignItems="flex-start">
            <Block>
              <AiTwotonePlayCircle size={20} />
            </Block>
            Seamless
          </Heading>
          <Text color="gray">
            Dedicated layer of requests interception at your disposal. Keep your
            application's code and tests unaware whether something is mocked or
            not.
          </Text>
        </Section>
        <Section>
          <Heading level={3} flex alignItems="flex-start">
            <Block>
              <AiTwotoneWarning size={20} />
            </Block>
            Deviation-free
          </Heading>
          <Text color="gray">
            Request the same production resources and test the actual behavior
            of your app. Augment an existing API, or design it as you go, when
            there is none.
          </Text>
        </Section>
        <Section>
          <Heading level={3} flex alignItems="flex-start">
            <Block>
              <AiTwotoneUpSquare size={20} />
            </Block>
            Familiar & Powerful
          </Heading>
          <Text color="gray">
            Use Express-like routing syntax to capture outgoing requests.
            Parameters, wildcards, regular expressions—mocking has never been
            easier.
          </Text>
        </Section>
      </Composition>
    </Grid>
  )
}
