import React from 'react'
import { Composition } from 'atomic-layout'

import Layout from '../components/layout'
import SEO from '../components/seo'
import { Grid } from '../components/Grid'
import { Heading } from '../components/Heading'
import { Text } from '../components/Text'
import { TextLead } from '../components/TextLead'
import { ExampleItem } from '../components/ExampleItem'
import { ScopedExampleItem } from '../components/ScopedExampleItem'
import { ReactComponent as GraphQLLogo } from '../images/logos/graphql.svg'
import { ReactComponent as ReactLogo } from '../images/logos/react.svg'
import { ReactComponent as NextJsLogo } from '../images/logos/nextjs.svg'
import { ReactComponent as StorybookLogo } from '../images/logos/storybook.svg'
import { ReactComponent as AngularLogo } from '../images/logos/angular.svg'
import reduxSagaLogo from '../images/logos/redux-saga.png'

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
          See how Mock Service Worker integrates with your favorite libraries.
        </TextLead>
        <hr />
        <Composition gap={80} marginTop={80}>
          <section>
            <Heading level={2}>Full examples</Heading>
            <Text>
              Each example in this section features a complete usage of Mock
              Service Worker in development, integration, and E2E tests.
            </Text>
            <Composition gap={32} marginTop={48}>
              <div>
                <Heading level={3}>React</Heading>
                <ExampleList>
                  <ExampleItem
                    title="REST API"
                    description="Learn how to mock a RESTful API in a React application."
                    logo={ReactLogo}
                    fill="#61DAFB"
                    bgColor="#61DAFB"
                    url="https://github.com/mswjs/examples/tree/master/examples/rest-react"
                  />
                  <ExampleItem
                    title="GraphQL API"
                    description="Learn how to mock a GraphQL API in a React application using Apollo."
                    logo={GraphQLLogo}
                    fill="#E535AB"
                    bgColor="#E535AB"
                    url="https://github.com/mswjs/examples/tree/master/examples/graphql-react-apollo"
                  />
                </ExampleList>
              </div>
              <div>
                <Heading level={3}>Angular</Heading>
                <ExampleList>
                  <ExampleItem
                    title="REST API"
                    description="Learn how to mock a RESTful API in an Angular application."
                    logo={AngularLogo}
                    fill="#ff4785"
                    bgColor="#C82B39"
                    url="https://github.com/mswjs/examples/tree/master/examples/rest-angular"
                  />
                </ExampleList>
              </div>
            </Composition>
          </section>
          <hr />
          <section>
            <Heading level={2}>Scoped examples</Heading>
            <Text>
              Examples below are focused on the integration of Mock Service
              Worker with specific tools.
            </Text>
            <Composition gap={24} marginTop={32} paddingHorizontalMd={16}>
              <ScopedExampleItem
                title="NextJS"
                logo={NextJsLogo}
                url="https://github.com/vercel/next.js/tree/canary/examples/with-msw"
              />
              <ScopedExampleItem
                title="Storybook"
                fill="#ff4785"
                logo={StorybookLogo}
                url="https://github.com/mswjs/examples/tree/master/examples/with-storybook"
              />
              <ScopedExampleItem
                title="Redux Saga"
                logo={(props) => <img {...props} src={reduxSagaLogo} />}
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
