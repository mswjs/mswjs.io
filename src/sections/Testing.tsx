import React, { useState, useEffect, useMemo } from 'react'
import { Box } from 'atomic-layout'
import styled from 'styled-components'
import { IoIosCheckmark } from 'react-icons/io'
import { AiOutlineLoading } from 'react-icons/ai'

import { Button } from '../components/Button'
import { Accent } from '../components/Accent'
import { Heading } from '../components/Heading'
import { Text } from '../components/Text'
import { TextLead } from '../components/TextLead'
import { TextSmall } from '../components/TextSmall'
import { Section } from '../components/Section'
import { Browser, BrowserDevTools } from '../components/Browser'

const TestResults = styled.section`
  color: var(--color-gray-dim);
  font-family: var(--font-family-mono);
  font-size: 85%;
  line-height: 24px;
  user-select: none;
`

const TestDescribe = styled.p`
  margin: 0;
  font-weight: bold;
`

const Loading = styled(AiOutlineLoading)`
  animation: spin 1s linear infinite;
`

const TestResultIcon = styled(Box)`
  animation: fadeIn 1s ease both;
`

const TestResult: React.FC<{ title: string; delay?: number }> = ({
  title,
  delay = 0,
}) => {
  const [passed, setPassed] = useState(false)
  const Icon = useMemo(() => {
    return passed ? (
      <TestResultIcon as={IoIosCheckmark} fill="#6FDF4D" size={24} />
    ) : (
      <Box as={Loading} fill="var(--color-gray)" width={24} />
    )
  }, [passed])

  useEffect(() => {
    const ref = setTimeout(() => {
      setPassed(true)
    }, 1000 + delay)

    return () => {
      clearTimeout(ref)
    }
  })

  return (
    <Box flex alignItems="center" marginLeft="1ch">
      {Icon}
      <span>{title}</span>
    </Box>
  )
}

export const Testing = () => {
  return (
    <Section>
      <Box width="100%">
        <Box marginBottom={24}>
          <Browser maxWidth={500} marginHorizontal="auto">
            <Box
              flex
              height={200}
              padding={20}
              alignItems="center"
              justifyContent="center"
            >
              <Button size="small">Log in</Button>
            </Box>
            <Box as={BrowserDevTools} padding={20}>
              <TestResults>
                <TestDescribe>given I open a product detail</TestDescribe>
                <TestResult title="should display a product title" />
                <TestResult
                  title="should display the latest price"
                  delay={850}
                />
                <TestResult title="should do... something else" delay={1700} />
              </TestResults>
            </Box>
          </Browser>
        </Box>
        <TextSmall align="center" color="gray">
          Test example utilizing a <code>GET /posts</code> mock.
        </TextSmall>
      </Box>
      <div>
        <Heading level={2} marginBottom={8}>
          Resilient end-to-end testing
        </Heading>
        <TextLead>
          Write test suites that <Accent>don't smell</Accent>.
        </TextLead>
        <Text color="gray">
          Target any state of your API, while keeping the test suits slim and
          clean. A single imported module that declaratively mocks given request
          routes, nothing more.
        </Text>
      </div>
    </Section>
  )
}
