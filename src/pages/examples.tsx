import React from 'react'
import { Composition, Box } from 'atomic-layout'

import Layout from '../components/layout'
import { Grid } from '../components/Grid'
import { ExampleItem } from '../components/exampleItem'
import { TextLead } from '../components/TextLead'
import { ReactComponent as GraphQLLogo } from '../images/graphql-logo.svg'
import { ReactComponent as JavaScriptIcon } from '../images/logos/javascript-2.svg'
import { ReactComponent as StorybookIcon } from '../images/logos/storybook.svg'
import { Heading } from '../components/Heading'

const ExampleList: React.FC = ({ children }) => {
  return (
    <Composition
      gap={64}
      templateCols="repeat(1, 1fr)"
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
      <Grid paddingVertical={64} paddingVerticalMd={80}>
        <Heading>Examples</Heading>
        <TextLead>
          Here will be the introductory text on why examples are important and
          that we provide some of them below.
        </TextLead>
        <Composition gap={80} marginTop={80}>
          <section>
            <Heading level={2}>API types</Heading>
            <ExampleList>
              <ExampleItem
                textLide="REST API"
                text="info"
                logo={JavaScriptIcon}
                fill="red"
                url="https://github.com/mswjs/examples/tree/master/examples/rest-react"
              />
              <ExampleItem
                textLide="GraphQL API (Apollo)"
                text="info"
                logo={GraphQLLogo}
                fill="#E535AB"
                url="https://github.com/mswjs/examples/tree/master/examples/graphql-react-apollo"
              />
            </ExampleList>
          </section>
          <section>
            <Heading level={2}>Libraries & Frameworks</Heading>
            <ExampleList>
              <ExampleItem
                textLide="Storybook"
                text="info"
                logo={StorybookIcon}
                fill="#ff4785"
                url="https://github.com/mswjs/examples/tree/master/examples/with-storybook"
              />
            </ExampleList>
          </section>
        </Composition>
      </Grid>
    </Layout>
  )
}

export default Examples
