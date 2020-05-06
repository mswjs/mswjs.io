import React, { useMemo } from 'react'
import { Box, makeResponsive, query, useMediaQuery } from 'atomic-layout'
import {
  DiReact as ReactLogo,
  DiAngularSimple as AngluarLogo,
} from 'react-icons/di'

import { Section } from '../components/Section'
import { Heading } from '../components/Heading'
import { Text } from '../components/Text'

import { ReactComponent as Logo } from '../images/logo.svg'
import { ReactComponent as JestLogo } from '../images/jest-logo.svg'
import { ReactComponent as VueLogo } from '../images/vue-logo.svg'
import { ReactComponent as GatsbyLogo } from '../images/gatsby-logo.svg'
import { ReactComponent as CypressLogo } from '../images/cypress-logo.svg'
import styled from 'styled-components'
import { IconType } from 'react-icons/lib/cjs'
import theme from '../theme'
import { TextLead } from '../components/TextLead'
import { Accent } from '../components/Accent'

const Parent = styled.div`
  position: relative;
`

const TechnologyCircle = styled(Box)<{ color: string }>`
  --size: 48px;

  background-color: ${({ color, theme }) => theme.utils.alpha(color, 0.15)};
  border-radius: 50%;
  color: ${({ color }) => color};
  height: var(--size);
  width: var(--size);
  opacity: 0.7;

  @media ${query({ from: 'lg' })} {
    --size: 64px;
  }
`

TechnologyCircle.defaultProps = {
  flex: true,
  inline: true,
  alignItems: 'center',
  justifyContent: 'center',
}

const MswLogo = styled(Logo)`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
`

const RawCircle = styled(Box)`
  position: relative;
  height: ${({ width }) => width}px;

  > * {
    display: inline-block;
    overflow: hidden;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: 0 auto 0;
    transform-origin: 50% 50%;
    height: 100%;
  }

  > *:nth-child(2) {
    transform: rotate(45deg);

    > div {
      transform: rotate(-45deg);
    }
  }

  > *:nth-child(3) {
    transform: rotate(90deg);

    > div {
      transform: rotate(-90deg);
    }
  }

  > *:nth-child(4) {
    transform: rotate(135deg);

    > div {
      transform: rotate(-135deg);
    }
  }

  > *:nth-child(5) {
    transform: rotate(180deg);

    > div {
      transform: rotate(-180deg);
    }
  }

  > *:nth-child(6) {
    transform: rotate(-135deg);

    > div {
      transform: rotate(135deg);
    }
  }

  > *:nth-child(7) {
    transform: rotate(-90deg);

    > div {
      transform: rotate(90deg);
    }
  }

  > *:nth-child(8) {
    transform: rotate(-45deg);

    > div {
      transform: rotate(45deg);
    }
  }
`

const Circle = makeResponsive(RawCircle)

const TechLine = styled.svg`
  position: absolute;
  left: 0;
  right: 0;
  margin: 5px auto 0;

  @media (prefers-reduced-motion: no-preference) {
    animation: lineProgress 2s linear infinite;
  }

  @keyframes lineProgress {
    0% {
      stroke-dashoffset: 24px;
    }

    100% {
      stroke-dashoffset: 0;
    }
  }
`

const Technology: React.FC<{ icon: IconType; color: string }> = ({
  icon,
  color,
}) => {
  const Icon = useMemo(() => {
    return makeResponsive(icon)
  }, [icon])

  return (
    <div>
      <Box inline as={TechLine} width={4} height="50%">
        <line
          x1={0}
          y1={0}
          x2={0}
          y2={150}
          stroke={theme.colors.grayLight}
          strokeDasharray={12}
          strokeWidth={4}
        />
      </Box>
      <TechnologyCircle color={color}>
        <Icon
          size={32}
          sizeLg={48}
          width={24}
          widthLg={32}
          fill="currentColor"
        />
      </TechnologyCircle>
    </div>
  )
}

export const Agnostic = () => {
  return (
    <Section>
      <Box as={Parent} orderLg={1}>
        <Circle width={300} widthLg={400}>
          <Technology icon={ReactLogo} color="hsl(196, 87%, 68%)" />
          <Technology icon={AngluarLogo} color="hsl(2, 56%, 51%)" />
          <Technology icon={VueLogo} color="hsl(153, 48%, 49%)" />
          <Technology icon={GatsbyLogo} color="hsl(270, 50%, 40%)" />
          <Technology icon={JestLogo} color="hsl(14, 82%, 43%)" />
          <Technology icon={CypressLogo} color="hsl(231, 9%, 16%)" />
          <Technology icon={JestLogo} color="hsl(14, 82%, 43%)" />
          <Technology icon={GatsbyLogo} color="hsl(270, 50%, 40%)" />
        </Circle>
        <MswLogo height={64} />
      </Box>
      <div>
        <Heading level={2}>Integrate anywhere</Heading>
        <TextLead>
          Integrate mocking into <Accent>any setup</Accent>.
        </TextLead>
        <Text>Integrate Mock Service Worker into any application setup.</Text>
      </div>
    </Section>
  )
}
