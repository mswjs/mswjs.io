import React from 'react'
import { Composition } from 'atomic-layout'

import Layout from '../components/layout'
import SEO from '../components/seo'
import { Grid } from '../components/Grid'
import { ExampleItem } from '../components/ExampleItem'
import { Text } from '../components/Text'
import { TextLead } from '../components/TextLead'
import { ReactComponent as GraphQLLogo } from '../images/graphql-logo.svg'
import { ReactComponent as JavaScriptIcon } from '../images/logos/javascript-2.svg'
import { ReactComponent as NextjsIcon } from '../images/logos/nextjs.svg'
import { ReactComponent as StorybookIcon } from '../images/logos/storybook.svg'
import { ReactComponent as AngularIcon } from '../images/logos/angular.svg'
import reduxSagaLogo from '../images/logos/redux-saga.png'
import { Heading } from '../components/Heading'

const ExampleList: React.FC = ({ children }) => {
  return (
    <Composition
      gap={32}
      gapLg={64}
      templateColsMd="repeat(2, 1fr)"
      templateColsLg="repeat(3, 1fr)"
    >
      {children}
    </Composition>
  )
}

const Examples = () => {
  return (
    <Layout>
      <SEO
        title="Examples – MSW – Seamless API mocking library for browser and Node"
        socialTitle="Examples – Mock Service Worker"
        description="Browse through the collection of Mock Service Worker usage examples
        with various libraries and frameworks."
      />
      <Grid paddingVertical={64} paddingVerticalMd={80}>
        <Heading>Examples</Heading>
        <TextLead>
          Learn by inspecting how Mock Service Worker integrates with your
          favorite tools.
        </TextLead>
        <hr />
        <Composition gap={80} marginTop={80}>
          <section>
            <Heading level={2}>API types</Heading>
            <Text>
              Each example in this section contains a complete showcase of Mock
              Service Worker usage in development, unit, and E2E tests. A great
              place to start with API mocking when all you know is the API type
              your application uses.
            </Text>
            <ExampleList>
              <ExampleItem
                title="REST API"
                description="Learn how to mock a RESTful API in a React application."
                logo={JavaScriptIcon}
                fill="red"
                url="https://github.com/mswjs/examples/tree/master/examples/rest-react"
              />
              <ExampleItem
                title="GraphQL API"
                description="Learn how to mock a GraphQL API in a React application using Apollo."
                logo={GraphQLLogo}
                fill="#E535AB"
                url="https://github.com/mswjs/examples/tree/master/examples/graphql-react-apollo"
              />
            </ExampleList>
          </section>
          <section>
            <Heading level={2}>Libraries & Frameworks</Heading>
            <Text>
              Examples below are focused on the integration of Mock Service
              Worker with specific tools.
            </Text>
            <Composition gap={24}>
              <ExampleItem
                mode="minimal"
                title="Angular"
                logo={AngularIcon}
                fill="#ff4785"
                url="https://github.com/mswjs/examples/tree/master/examples/rest-angular"
              />
              <ExampleItem
                mode="minimal"
                title="NextJS"
                logo={NextjsIcon}
                fill="#ff4785"
                url="https://github.com/vercel/next.js/tree/canary/examples/with-msw"
              />
              <ExampleItem
                mode="minimal"
                title="Storybook"
                logo={StorybookIcon}
                fill="#ff4785"
                url="https://github.com/mswjs/examples/tree/master/examples/with-storybook"
              />
              <ExampleItem
                mode="minimal"
                title="Redux Saga"
                logo={(props) => <img {...props} src={reduxSagaLogo} />}
                fill="#ff4785"
                url="https://github.com/mswjs/examples/tree/master/examples/with-redux-saga"
              />
            </Composition>
          </section>
        </Composition>
      </Grid>
    </Layout>
  )
}

export default Examples
