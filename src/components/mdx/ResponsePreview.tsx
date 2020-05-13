import * as React from 'react'
import styled from 'styled-components'
import { Box } from 'atomic-layout'
import { MdContentCopy as CopyIcon } from 'react-icons/md'
import { Code } from './Code'
import { TextSmall } from '../TextSmall'
import { Button } from '../Button'
import { InteractiveArea } from '../InteractiveArea'
import { TextMono } from '../TextMono'

const RequestUrl = styled(TextMono)`
  strong {
    color: var(--color-secondary);
  }
`

const StatusCode = styled(TextMono)`
  padding: 0 4px;
  background-color: #eee;
  border-radius: var(--border-radius);
`

interface Props {
  request: {
    method: string
    url: string
    body?: string
  }
  response: {
    statusCode: number
    statusText?: string
    body?: string
  }
  codeProps: Record<string, any>
}

export const ResponsePreview: React.FC<Props> = ({
  request,
  response,
  codeProps,
}) => {
  const [isCopied, setCopied] = React.useState(false)

  const handleCopyRequest = React.useCallback(() => {
    const originalUrl = request.url.replace(/\*\*/g, '')

    const fetchOptions = Object.assign(
      {},
      request.method !== 'GET' && { method: request.method },
      request.body && { body: request.body },
    )

    const requestText =
      Object.keys(fetchOptions).length > 0
        ? `fetch(${originalUrl}, ${JSON.stringify(fetchOptions, null, 2)})`
        : `fetch('${originalUrl}')`

    navigator.clipboard.writeText(requestText)

    setCopied(true)
  }, [request])

  return (
    <Box as={InteractiveArea} marginVertical={32} padding={32}>
      <section>
        <h4>Request</h4>
        <Box flex alignItems="center">
          <Box as={StatusCode} marginRight={6}>
            {request.method}
          </Box>
          <Box
            as={RequestUrl}
            flexGrow="1"
            marginRight={6}
            dangerouslySetInnerHTML={{
              __html: request.url.replace(
                /\*\*(.+?)\*\*/,
                '<strong>$1</strong>',
              ),
            }}
          />
          <Box>
            <Box
              as={Button}
              size="small"
              onClick={handleCopyRequest}
              flex
              alignItems="center"
            >
              {isCopied ? (
                <TextSmall as="span">Copied!</TextSmall>
              ) : (
                <>
                  <TextSmall as="span" marginRight={4}>
                    Copy
                  </TextSmall>
                  <CopyIcon />
                </>
              )}
            </Box>
          </Box>
        </Box>
        {request.body && (
          <>
            <h5>Body</h5>
            <Code language="json" showLineNumbers={true}>
              {request.body}
            </Code>
          </>
        )}
      </section>
      <hr />
      <h4>Response</h4>
      <Box flex alignItems="center">
        <Box as={StatusCode} marginRight={6}>
          {response.statusCode || 200}
        </Box>
        <TextMono>{response.statusText || 'OK'}</TextMono>
      </Box>
      <h5>Body</h5>
      <Code language="json" showLineNumbers={true} {...codeProps}>
        {response.body}
      </Code>
    </Box>
  )
}
