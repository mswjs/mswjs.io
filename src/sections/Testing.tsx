import React, { useState, useEffect, useMemo } from 'react'
import { Box, Composition } from 'atomic-layout'
import styled from 'styled-components'
import { IoIosCheckmark as CheckedIcon } from 'react-icons/io'
import { AiOutlineLoading as LoadingIcon } from 'react-icons/ai'
import { useInView } from 'react-intersection-observer'

import { Accent } from '../components/Accent'
import { Heading } from '../components/Heading'
import { Text } from '../components/Text'
import { TextLead } from '../components/TextLead'
import { TextSmall } from '../components/TextSmall'
import { ReadmoreLink } from '../components/ReadmoreLink'
import { Section, SectionContent } from '../components/Section'
import { Browser, BrowserDevTools } from '../components/Browser'
import { ObliqueSection } from '../components/ObliqueSection'

const TestResults = styled.section`
  color: var(--color-gray-dim);
  font-family: var(--font-family-mono);
  font-size: 85%;
  line-height: 1.35;
  user-select: none;
`

const TestDescribe = styled.p`
  margin: 0 0 0.5rem 0;
  font-weight: bold;
`

const Loading = styled(LoadingIcon)`
  animation: spin 1s linear infinite;
`

const TestResultIcon = styled(Box)`
  animation: fadeIn 1s ease both;
`

const TestResult: React.FC<{
  title: string
  isLoading?: boolean
  delay?: number
}> = ({ title, isLoading, preDelay = 1000, delay = 0 }) => {
  const [isPassed, setPassed] = useState(false)

  const Icon = useMemo(() => {
    return isPassed ? (
      <TestResultIcon as={CheckedIcon} fill="#6FDF4D" size={24} />
    ) : (
      <Box as={Loading} fill="var(--color-gray)" width={24} />
    )
  }, [isPassed])

  useEffect(() => {
    if (!isLoading) {
      const ref = setTimeout(() => {
        setPassed(true)
      }, delay)

      return () => {
        clearTimeout(ref)
      }
    }
  }, [isLoading])

  return (
    <Box
      flex
      alignItems="center"
      marginVertical={4}
      marginLeft={0}
      marginLeftMd="1ch"
    >
      <Box
        flex
        alignItems="center"
        marginRight={6}
        height={24}
        width={24}
        flexShrink="0"
      >
        {Icon}
      </Box>
      <span>{title}</span>
    </Box>
  )
}

const Block = styled.div`
  background-color: var(--color-gray-light);
  border-radius: var(--border-radius);
  animation: fadeIn 1s ease;
`

const PageContent: React.FC<{ isLoading?: boolean }> = ({ isLoading }) => {
  if (isLoading) {
    return (
      <Box>
        <Loading size={32} fill="var(--color-primary)" />
      </Box>
    )
  }

  return (
    <Composition
      templateCols="minmax(125px, 1fr) 2fr"
      gap={24}
      gapMd={32}
      width="100%"
    >
      <Box as={Block} height="100%" />
      <Box>
        <Box as={Block} height={32} marginBottom={24} />
        <Box as={Block} height={10} marginBottom={16} />
        <Box as={Block} height={10} marginBottom={16} />
        <Box as={Block} height={10} />
      </Box>
    </Composition>
  )
}

export const Testing = () => {
  const [isLoading, setLoading] = useState(true)
  const [ref, isContainerVisible] = useInView({
    threshold: 1,
  })

  useEffect(() => {
    if (isContainerVisible) {
      const timeout = setTimeout(() => {
        setLoading(false)
      }, 1000)

      return () => {
        clearTimeout(timeout)
      }
    }
  }, [isContainerVisible])

  return (
    <ObliqueSection>
      <Section>
        <Box width="100%">
          <Box ref={ref} marginBottom={24}>
            <Browser
              address="eshop.com/product/1"
              maxWidth={500}
              marginHorizontal="auto"
            >
              <Box
                flex
                heightMd={250}
                padding={32}
                alignItems="center"
                justifyContent="center"
              >
                <PageContent isLoading={isLoading} />
              </Box>
              <Box as={BrowserDevTools} padding={20}>
                <TestResults>
                  <TestDescribe>
                    given I wrote a test suite with MSW
                  </TestDescribe>
                  <TestResult
                    title="treats API response as a pre-requisite"
                    isLoading={isLoading}
                  />
                  <TestResult
                    title="tests how a user actually interacts with my app"
                    isLoading={isLoading}
                    delay={850}
                  />
                  <TestResult
                    title="produces a maintainable and resilient test"
                    isLoading={isLoading}
                    delay={1700}
                  />
                </TestResults>
              </Box>
            </Browser>
          </Box>
          <TextSmall align="center" color="gray">
            Test suite using a <code>GET /product/:productId</code> mock.
          </TextSmall>
        </Box>
        <SectionContent>
          <Heading level={2} marginBottom={8} align="center" alignLg="start">
            Test with confidence
          </Heading>
          <TextLead align="center" alignLg="start">
            Write test suites that <Accent>don't smell</Accent>.
          </TextLead>
          <Text color="gray">
            You don't expect your customers to mock <code>fetch</code>, do you?
            So don't expect your tests either. Target any state of your API
            while testing your application exactly how your users interact with
            it.
          </Text>
          <ReadmoreLink
            href="https://kentcdodds.com/blog/stop-mocking-fetch"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn about API mocking in tests with Kent C. Dodds
          </ReadmoreLink>
        </SectionContent>
      </Section>
    </ObliqueSection>
  )
}
