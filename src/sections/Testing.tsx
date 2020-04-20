import React from 'react'
import { Composition } from 'atomic-layout'

import { Grid } from '../components/Grid'
import { Accent } from '../components/Accent'
import { Text } from '../components/Text'
import { TextLead } from '../components/TextLead'
import { TextSmall } from '../components/TextSmall'
import { Code } from '../components/mdx/Code'

export const Testing = () => {
  return (
    <Grid>
      <Composition
        templateColsLg="repeat(2, 1fr)"
        alignItems="center"
        justifyItems="center"
        gap={32}
        paddingVertical={64}
        paddingVerticalMd={100}
        maxWidth="100%"
        width="80%"
        marginHorizontal="auto"
      >
        <div>
          <Code hero language="javascript" showLineNumbers={false}>{`
// test/login/not-found.mock.js
composeMocks(
  rest.post('/login', (req, res, ctx) => {
    const { username } = req.body

    return res(
      ctx.status(403),
      ctx.json([
        {
          error: \`User "\${username}" not found\`
        }
      ])
    )
  })
)
  `}</Code>
          <TextSmall align="center" color="gray">
            Mocking an error response to <code>POST /login</code> request.
          </TextSmall>
        </div>
        <div>
          <h2>Perfect for testing at any level</h2>
          <TextLead>
            Write test suites that <Accent>don't smell</Accent>.
          </TextLead>
          <Text color="gray">
            Target any state of your API, while keeping the test suits slim and
            clean. A single imported module that declaratively mocks given
            request routes, nothing more.
          </Text>
        </div>
      </Composition>
    </Grid>
  )
}
