import React from 'react'
import { Composition, Box } from 'atomic-layout'
import { Code, CodeWithVariants } from 'react-cdx'
import { DiNodejsSmall } from 'react-icons/di'

import { Grid } from '../components/Grid'
import { TextLead } from '../components/TextLead'
import { ReactComponent as GraphQLLogo } from '../images/graphql-logo.svg'

export const GettingStarted = () => {
  return (
    <Grid paddingVertical={64} paddingVerticalMd={100}>
      <Box flex flexDirection="column" alignItems="center">
        <h2>Getting started</h2>
        <TextLead>Integrate mocks in under 5 minutes</TextLead>
      </Box>
      <Composition
        marginTop={48}
        gap={32}
        maxWidth={500}
        marginHorizontal="auto"
      >
        <div>
          <h3>Install</h3>
          <Code code="$ npm install msw --save-dev" language="bash" />
        </div>

        <div>
          <h3>Initialize</h3>
          <Code code="$ npx msw init ./public" language="bash" />
        </div>

        <div>
          <h3>Create a mock definition</h3>
          <CodeWithVariants
            variants={[
              {
                name: 'REST API',
                icon: DiNodejsSmall,
                language: 'javascript',
                code: `
// src/mocks.js
import { composeMocks, rest } from 'msw'

const { start } = composeMocks(
  // Match a request by method, URL, path, or regular expression
  rest.get('https://api.github.com/users/:username', (req, res, ctx) => {
    const { username } = req.params

    return res(
      ctx.json({
        firstName: 'John',
        lastName: 'Maverick'
      })
    )
  })
)

start()
          `,
              },
              {
                name: 'GraphQL',
                language: 'javascript',
                icon: GraphQLLogo,
                code: `
// src/mocks.js
import { composeMocks, graphql } from 'msw'

const { start } = composeMocks(
  graphql.query('GetUser', (req, res, ctx) => {
    const { username } = req.variables

    return res(
      ctx.data({
        user: {
          firstName: 'John',
          lastName: 'Maverick'
        }
      })
    )
  })
)

start()
              `,
              },
            ]}
          >
            {({ activeVariant, variants, setVariant }) => (
              <div>
                <Box flex>
                  {variants.map((variant, index) => (
                    <Box
                      flex
                      alignItems="center"
                      marginRight={24}
                      onClick={() => setVariant(index)}
                    >
                      <Box
                        as={variant.icon}
                        fill="#000"
                        size={16}
                        height={16}
                        marginRight={4}
                      />
                      <span>{variant.name}</span>
                    </Box>
                  ))}
                </Box>
                <Code {...activeVariant} />
              </div>
            )}
          </CodeWithVariants>
        </div>

        <div>
          <h3>Import</h3>
          <Code
            code={`
// src/App.js
import './mocks'
          `}
            language="javascript"
          />
        </div>
      </Composition>
    </Grid>
  )
}
