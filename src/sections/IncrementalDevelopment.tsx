import React, { useEffect, useState, useRef } from 'react'
import styled, { css } from 'styled-components'
import { Box, Composition } from 'atomic-layout'
import { IoIosCode as BrowserContentIcon } from 'react-icons/io'
import { DiNodejsSmall } from 'react-icons/di'

import { TextLead } from '../components/TextLead'
import { Accent } from '../components/Accent'
import { Text } from '../components/Text'
import { Section } from '../components/Section'
import { Heading } from '../components/Heading'
import { Browser } from '../components/Browser'
import { TextMono } from '../components/TextMono'
import { ReactComponent as Logo } from '../images/logo-mask.svg'
import { ReactComponent as GraphqQL } from '../images/graphql-logo.svg'
import theme from '../theme'
import { Link } from 'gatsby'

const Parent = styled.div`
  position: relative;
`

const SvgCommunication = styled.svg`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  margin: auto;
  overflow: visible !important;
  z-index: -1;

  animation: strokeOffset 16s linear infinite;

  @keyframes strokeOffset {
    0% {
      stroke-dashoffset: 100%;
    }
    100% {
      stroke-dashoffset: 0;
    }
  }
`

const RequestAnimation = styled.div`
  position: absolute;
  animation: slideFromLeft 8s ease both infinite;
  user-select: none;

  @keyframes slideFromLeft {
    0% {
      opacity: 0;
      transform: translateX(-50%);
    }
    25%,
    50%,
    75% {
      opacity: 1;
      transform: translateX(0);
    }
    100% {
      opacity: 0;
      transform: translateX(50%);
    }
  }
`

const ResponseAnimation = styled.div`
  animation: slideFromRight 8s ease both infinite;
  user-select: none;

  @keyframes slideFromRight {
    0% {
      opacity: 0;
      transform: translateX(50%);
    }
    25%,
    50%,
    75% {
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
  z-index: 0;
`

interface AbsoluteBrowserProps {
  offsetX: number
  offsetY: number
}

const AbsoluteBrowser = styled(Browser)<AbsoluteBrowserProps>`
  position: absolute;
  left: 0;
  top: 50%;
  z-index: -1;

  ${({ offsetX, offsetY }) => css`
    transform: translate(${offsetX}px, ${offsetY}px);
  `}
`

AbsoluteBrowser.defaultProps = {
  offsetX: 0,
  offsetY: 0,
}

const FakeBrowser: React.FC<AbsoluteBrowserProps> = ({ offsetX, offsetY }) => {
  return (
    <AbsoluteBrowser
      offsetX={offsetX}
      offsetY={offsetY}
      useLightTheme={true}
      showControls={false}
      showAddressBar={false}
      width={150}
    >
      <Box height={128} width="100%" />
    </AbsoluteBrowser>
  )
}

const TechnologyCircle = styled(Box)<{ borderColor: string }>`
  background-color: ${({ borderColor }) => borderColor};
  border-radius: 50%;
  height: 42px;
  width: 42px;
  z-index: 1;
`

function useInterval(callback: () => void, delay: number) {
  const savedCallback = useRef<Function>()

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  // Set up the interval.
  useEffect(() => {
    function tick() {
      if (savedCallback) {
        savedCallback.current()
      }
    }
    if (delay !== null) {
      let id = setInterval(tick, delay)
      return () => clearInterval(id)
    }
  }, [delay])
}

const useExampleType = (delay: number = 0) => {
  const [type, setType] = useState('node')

  useInterval(() => {
    setType(type === 'node' ? 'gql' : 'node')
  }, 8000)

  return type
}

const RequestExample = () => {
  const type = useExampleType()

  return (
    <RequestAnimation>
      <TextMono>
        {type === 'node' ? (
          <>
            GET <strong>/user</strong>
          </>
        ) : (
          <>
            query <strong>GetUserInfo</strong>
          </>
        )}
      </TextMono>
    </RequestAnimation>
  )
}

const ResponseExample = () => {
  const type = useExampleType()

  const isNode = type === 'node'
  const resBody = isNode
    ? `{ "firstName": "John" }`
    : `\
user {
  firstName: "John"
}`

  return (
    <Box as={ResponseAnimation} flex flexDirection="column" alignItems="center">
      <TechnologyCircle
        as={ResponseAnimation}
        flex
        alignItems="center"
        justifyContent="center"
        borderColor={isNode ? '#8BB637' : '#d147a7'}
      >
        {isNode ? (
          <DiNodejsSmall size={24} fill="#fff" />
        ) : (
          <GraphqQL height={24} fill="#fff" />
        )}
      </TechnologyCircle>
      <Box as={TextMono} marginTop={12}>
        {resBody}
      </Box>
    </Box>
  )
}

export const IncrementalDevelopment = () => {
  return (
    <Section>
      <Composition
        as={IllustrationContainer}
        orderLg={1}
        gap={10}
        templateCols="1fr"
        alignItems="center"
        justifyItems="center"
        justifyContent="space-between"
        width={380}
      >
        <Box
          flex
          flexDirection="column"
          alignItems="center"
          marginBottom={50}
          height={32}
        >
          <RequestExample />
        </Box>

        <Box
          flex
          alignItems="center"
          justifyContent="space-between"
          width="100%"
        >
          <FakeBrowser offsetX={-10} offsetY={-71} />
          <Browser
            showControls={false}
            showAddressBar={false}
            inline
            height="100%"
            width={150}
            marginLeft={-24}
          >
            <Box flex alignItems="center" justifyContent="center" height={125}>
              <BrowserContentIcon size={48} fill={theme.colors.grayLight} />
            </Box>
          </Browser>

          <Logo height={80} />
        </Box>

        <Box as={Parent} marginTop={16} height={80}>
          <ResponseExample />
        </Box>

        <SvgCommunication>
          <rect
            x={10}
            y={48}
            height={240}
            width={290}
            fill="none"
            stroke={theme.colors.grayLight}
            strokeWidth={3}
            strokeDasharray={10}
          />
        </SvgCommunication>
      </Composition>
      <div>
        <Heading level={2} marginBottom={8}>
          Develop incrementally
        </Heading>
        <TextLead>
          Modern solution for <Accent>competitive development</Accent>.
        </TextLead>
        <Text color="gray">
          Present a fully functioning application or kick off the next
          successful startup without having any backend at all. RESTful API
          today, or GraphQL tomorrow? Experiment, combine, and find what suits
          your project best before committing to the ecosystem.
        </Text>
      </div>
    </Section>
  )
}
