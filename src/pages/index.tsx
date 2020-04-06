import React from 'react'
import { Link } from 'gatsby'
import { Composition, Box } from 'atomic-layout'
import { FiArrowRightCircle } from 'react-icons/fi'
import { DiNodejsSmall } from 'react-icons/di'

import Layout from '../components/layout'
import { Grid } from '../components/Grid'
import { Button } from '../components/Button'
import SEO from '../components/seo'
import { TextLead } from '../components/TextLead'
import { Divider } from '../components/Divider'
import { CardProps, Card } from '../components/Card'

import { ReactComponent as GraphQLLogo } from '../images/graphql-logo.svg'

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

const HomePage = () => (
  <Layout>
    <SEO title="Home" />
    <Box as="section" paddingVertical={200}>
      <Grid>
        <Composition
          alignItems="center"
          templateColsMd="repeat(2, 1fr)"
          gap={64}
        >
          <div>
            <h1>API mocking done right</h1>
            <TextLead>
              Seamless mocking by intercepting production requests. No servers,
              no conditional URL, not a single change to an existing codebase.
            </TextLead>
            <Composition
              inline
              templateCols="repeat(2, auto)"
              gap={10}
              marginTop={16}
            >
              <Button variant="primary">Getting started</Button>
              <Button>GitHub</Button>
            </Composition>
          </div>
          <Box orderSmDown={-1} justify="center">
            Image
          </Box>
        </Composition>
      </Grid>
    </Box>
    <Divider />

    <Grid>
      <Composition
        templateColsLg="repeat(3, 1fr)"
        gap={32}
        paddingVertical={80}
      >
        <div>
          <h3>Non-invasive</h3>
          <p>
            Forget about stubs and hacks that make your code smell. Leverage a
            dedicated layer of interception to keep your tests clean and shiny.
          </p>
        </div>
        <div>
          <h3>Deviation-free</h3>
          <p>
            Request the same production resources and test the behavior of your
            app. Test what actually matters, leaving the mocking to MSW.
          </p>
        </div>
        <div>
          <h3>Familiar & Powerful</h3>
          <p>
            Use Express-like mocking route definition syntax to capture outgoing
            requests. Parameters, wildcards, regular expressions—mocking has
            never been easier.
          </p>
        </div>
      </Composition>
    </Grid>

    <Grid paddingVertical={80}>
      <h2>How does this work?</h2>
      <p>
        You may be wondering: "
        <em>And how much experimental code do I need to put into my app?</em>
        ". The answer is: <strong>none</strong>.
      </p>
      <p>
        Mock Service Worker (MSW) uses Service Workers API to intercept outgoing
        page requests and match them against a mocking schema you define.
      </p>
    </Grid>

    <Grid paddingVertical={80}>
      <Box flex flexDirection="column" alignItems="center">
        <h2>Designed for API at scale</h2>
        <TextLead>
          Enterprise-grade mocking tools for the API that suits you best
        </TextLead>
      </Box>
      <Box flex justifyContent="center">
        <Composition
          inline
          templateColsSm="repeat(2, auto)"
          gap={48}
          marginTop={64}
        >
          <ApiCard
            stripeColor="#8BB637"
            stroke="#8BB637"
            logo={DiNodejsSmall}
            iconSize={52}
            url="/docs/tutorials"
            title="REST API"
          />
          <ApiCard
            stripeColor="#D147A7"
            logo={GraphQLLogo}
            url="/docs/tutorials"
            title="GraphQL"
          />
        </Composition>
      </Box>
    </Grid>
  </Layout>
)

export default HomePage
