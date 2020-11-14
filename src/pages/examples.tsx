import React from 'react'
import { Composition } from 'atomic-layout'

import Layout from '../components/layout'
import SEO from '../components/seo'
import { Grid } from '../components/Grid'
import { Heading } from '../components/Heading'
import { Text } from '../components/Text'
import { TextLead } from '../components/TextLead'
import { ExampleItem } from '../components/ExampleItem'
import { ReactComponent as GraphQLLogo } from '../images/logos/graphql.svg'
import { ReactComponent as ReactLogo } from '../images/logos/react.svg'
import { ReactComponent as NextJsLogo } from '../images/logos/nextjs.svg'
import { ReactComponent as StorybookLogo } from '../images/logos/storybook.svg'
import { ReactComponent as AngularLogo } from '../images/logos/angular.svg'
import reduxSagaLogo from '../images/logos/redux-saga.png'
import karmaLogo from '../images/logos/karma.png'

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
            <Composition gap={32}>
              <div>
                <Heading level={3}>React</Heading>
                <ExampleList>
                  <ExampleItem
                    title="REST API"
                    description="Learn how to mock a RESTful API in a React application."
                    logo={ReactLogo}
                    fill="#61DAFB"
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
              </div>
              <div>
                <Heading level={3}>Angular</Heading>
                <ExampleList>
                  <ExampleItem
                    title="REST API"
                    description="Learn how to mock a RESTful API in an Angular application."
                    logo={AngularLogo}
                    fill="#ff4785"
                    url="https://github.com/mswjs/examples/tree/master/examples/rest-angular"
                  />
                </ExampleList>
              </div>
            </Composition>
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
                title="NextJS"
                logo={NextJsLogo}
                fill="#ff4785"
                url="https://github.com/vercel/next.js/tree/canary/examples/with-msw"
              />
              <ExampleItem
                mode="minimal"
                title="Storybook"
                logo={StorybookLogo}
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
              <ExampleItem
                mode="minimal"
                title="Karma"
                logo={(props) => <img {...props} src={karmaLogo} />}
                fill="#ff4785"
                url="https://github.com/mswjs/examples/tree/master/examples/with-karma"
              />
            </Composition>
          </section>
        </Composition>
      </Grid>
    </Layout>
  )
}

export default Examples
