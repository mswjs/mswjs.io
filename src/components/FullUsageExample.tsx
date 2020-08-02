import React, { useState, useMemo } from 'react'
import { Link } from 'gatsby'
import styled, { css } from 'styled-components'
import { CodeWithVariants, Code } from 'react-cdx'
import { IoIosInformationCircleOutline as InfoIcon } from 'react-icons/io'
import { Box } from 'atomic-layout'

import { Fragment, FragmentItem } from './Fragment'
import { theme as HeroCodeTheme } from '../codeTheme'
import { ReactComponent as JavaScriptIcon } from '../images/logos/javascript-2.svg'
import { ReactComponent as TypeScriptIcon } from '../images/logos/typescript.svg'

const Section = styled.section`
  width: 100%;
  max-width: 100%;
  box-shadow: var(--box-shadow);
`

const Container = styled.div`
  background-color: var(--color-black);
  border-radius: calc(var(--border-radius) * 2);
  border-top-left-radius: 0;
  color: #fff;

  pre {
    margin: 0;
    padding-top: 0;
  }

  a {
    font-size: 90%;
    color: var(--color-primary);

    :hover {
      color: #fff;
    }
  }
`

const TabItem = styled.button<{ active?: boolean }>`
  padding: 0.5rem 1rem;
  background-color: var(--color-gray);
  border: 0;
  box-shadow: inset 0 -3px 0 rgba(0, 0, 0, 0.15);
  color: #fff;
  cursor: pointer;
  font-size: 90%;

  :first-of-type {
    border-top-left-radius: var(--border-radius);
  }

  :last-of-type {
    border-top-right-radius: var(--border-radius);
  }

  ${({ active }) =>
    active &&
    css`
      background-color: var(--color-black);
      box-shadow: unset;
    `}
`

const LanguageName: React.FC<{
  name: string
  fill: string
  icon: React.FC
}> = ({ name, icon: Icon, fill }) => {
  return (
    <Box as="span" flex alignItems="center">
      <Box as={Icon} fill={fill} size={16} width={16} marginRight={6} />
      {name}
    </Box>
  )
}

const renderCodeExample = ({
  activeVariant,
  activeIndex,
  variants,
  setVariantIndex,
}) => (
  <section>
    <Box as={Fragment} padding="1rem">
      {variants.map((variant, index) => (
        <FragmentItem
          active={index === activeIndex}
          size="small"
          onClick={() => setVariantIndex(index)}
        >
          {variant.name}
        </FragmentItem>
      ))}
    </Box>
    <Code theme={HeroCodeTheme} showLineNumbers {...activeVariant.codeProps} />
  </section>
)

const examples = [
  {
    name: 'REST API',
    readmoreText: 'Learn more about mocking REST API',
    readmoreUrl: '/docs/getting-started/mocks/rest-api',
    content: () => (
      <CodeWithVariants
        variants={[
          {
            name: (
              <LanguageName
                icon={JavaScriptIcon}
                fill="#f7df1e"
                name="JavaScript"
              />
            ),
            codeProps: {
              language: 'javascript',
              filename: 'mocks.js',
              code: `
import { setupWorker, rest } from 'msw'

const worker = setupWorker(
  rest.post('/login', (req, res, ctx) => {
    const { username } = req.body

    return res(
      ctx.json({
        username,
        firstName: 'John'
      })
    )
  }),
)

worker.start()
        `,
            },
          },
          {
            name: (
              <LanguageName
                icon={TypeScriptIcon}
                fill="#007acc"
                name="TypeScript"
              />
            ),
            codeProps: {
              language: 'typescript',
              code: `
import { setupWorker, rest } from 'msw'

interface LoginBody {
  username: string
}

interface LoginResponse {
  username: string
  firstName: string
}

const worker = setupWorker(
  rest.post<LoginBody, LoginResponse>('/login', (req, res, ctx) => {
    const { username } = req.body

    return res(
      ctx.json({
        username,
        firstName: 'John'
      })
    )
  }),
)

worker.start()
            `,
            },
          },
        ]}
      >
        {renderCodeExample}
      </CodeWithVariants>
    ),
  },
  {
    name: 'GraphQL API',
    readmoreText: 'Learn more about mocking GraphQL API',
    readmoreUrl: '/docs/getting-started/mocks/graphql-api',
    content: () => (
      <CodeWithVariants
        variants={[
          {
            name: (
              <LanguageName
                icon={JavaScriptIcon}
                fill="#f7df1e"
                name="JavaScript"
              />
            ),
            codeProps: {
              language: 'javascript',
              code: `
import { setupWorker, graphql } from 'msw'

const worker = setupWorker(
  graphql.mutation('Login', (req, res, ctx) => {
    const { username } = req.variables

    return res(
      ctx.data({
        user: {
          username,
          firstName: 'John'
        }
      })
    )
  })
)

worker.start()
            `,
            },
          },
          {
            name: (
              <LanguageName
                icon={TypeScriptIcon}
                fill="#007acc"
                name="TypeScript"
              />
            ),
            codeProps: {
              language: 'typescript',
              code: `
import { setupWorker, graphql } from 'msw'

interface Variables {
  username: string
}

interface Response {
  username: string
  firstName: string
}

const worker = setupWorker(
  graphql.mutation<Response, Variables>('Login', (req, res, ctx) => {
    const { username } = req.variables

    return res(
      ctx.data({
        user: {
          username,
          firstName: 'John'
        }
      })
    )
  })
)

worker.start()
              `,
            },
          },
        ]}
      >
        {renderCodeExample}
      </CodeWithVariants>
    ),
  },
]

export const FullUsageExample = () => {
  const [activeExampleIndex, setActiveExampleIndex] = useState(0)
  const activeExample = useMemo(() => {
    return examples[activeExampleIndex]
  }, [activeExampleIndex])

  return (
    <Section>
      {examples.map((example, index) => (
        <TabItem
          active={index === activeExampleIndex}
          onClick={() => setActiveExampleIndex(index)}
        >
          {example.name}
        </TabItem>
      ))}
      <Box as={Container}>
        <>{activeExample.content()}</>
        <Box
          flex
          paddingVertical="1rem"
          paddingHorizontal="1rem"
          justifyContent="center"
        >
          <Link to={activeExample.readmoreUrl}>
            <Box
              as={InfoIcon}
              size={16}
              inline
              marginBottom={-3}
              marginRight={6}
            />
            <span>{activeExample.readmoreText}</span>
          </Link>
        </Box>
      </Box>
    </Section>
  )
}
