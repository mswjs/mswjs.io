import React from 'react'
import styled from 'styled-components'
import { Box, Composition } from 'atomic-layout'
import { DiNodejsSmall } from 'react-icons/di'
import { FiArrowRightCircle } from 'react-icons/fi'
import { IoIosApps } from 'react-icons/io'

import { Grid } from '../components/Grid'
import { Card, CardProps } from '../components/Card'
import { TextLead } from '../components/TextLead'
import bgPattern from '../images/bg-pattern.png'
import { ReactComponent as GraphQLLogo } from '../images/graphql-logo.svg'
import { Link } from 'gatsby'
import { Heading } from '../components/Heading'

const Container = styled.section`
  position: relative;
  background: url(${bgPattern}) repeat center;
  background-size: 100px;
  color: #fff;
  z-index: 0;

  @media screen and (prefers-reduced-motion: no-preference) {
    animation: scrollBackground 120s linear infinite;

    @keyframes scrollBackground {
      0% {
        background-position: 0 -100%;
      }
      100% {
        background-position: 0 100%;
      }
    }
  }

  h2 {
    color: inherit;
  }

  &:after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    background-color: hsla(200, 42%, 25%, 0.95);
    z-index: -1;
  }
`

const ApiCard: React.FC<{
  logo: any
  title: String
  stroke?: string
  iconSize?: number
  url: string
} & CardProps> = ({
  logo: Logo,
  title,
  url,
  iconSize,
  stroke,
  ...cardProps
}) => {
  return (
    <Composition
      as={Card}
      alignItems="start"
      justifyItems="center"
      {...cardProps}
      gap={16}
    >
      <Box
        as={Logo}
        stroke={stroke}
        fill={stroke}
        width={iconSize}
        size={iconSize}
      />
      <div>
        <Box as={TextLead} flex justifyContent="center" marginBottom={6}>
          <strong>{title}</strong>
        </Box>
        <Box as={Link} to={url} flex alignItems="center">
          See the tutorial <Box as={FiArrowRightCircle} marginLeft={4} />
        </Box>
      </div>
    </Composition>
  )
}

ApiCard.defaultProps = {
  iconSize: 48,
}

export const DesignedToScale = () => {
  return (
    <Container>
      <Grid paddingVertical={64} paddingVerticalMd={100}>
        <Box flex flexDirection="column" alignItems="center">
          <Heading level={2} marginBottom={8}>
            Scales with your needs
          </Heading>
          <TextLead>Standard-compliant tools for your favorite API</TextLead>
        </Box>
        <Box flex justifyContent="center">
          <Composition
            inline
            templateColsMd="repeat(2, auto)"
            gap={48}
            marginTop={64}
          >
            <ApiCard
              stripeColor="#8BB637"
              stroke="#8BB637"
              logo={DiNodejsSmall}
              iconSize={52}
              url="/docs/getting-started/install"
              title="REST API"
            />
            <ApiCard
              stripeColor="#D147A7"
              stroke="#D147A7"
              logo={GraphQLLogo}
              url="/docs/getting-started/install"
              title="GraphQL"
            />
          </Composition>
        </Box>
      </Grid>
    </Container>
  )
}
