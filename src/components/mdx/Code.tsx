import React from 'react'
import styled from 'styled-components'
import { Code as ReactCdxCode } from 'react-cdx'
import CodeTheme from 'prism-react-renderer/themes/nightOwlLight'
import { CopyButton } from '../CopyButton'
import { query, useResponsiveQuery, useResponsiveValue } from 'atomic-layout'

const StyledCode = styled(ReactCdxCode)`
  overflow: auto;
  font-size: 90%;
`

const Container = styled.div`
  position: relative;
`

const CopyCodeButton = styled(CopyButton)`
  margin-top: -1rem;
  width: 100%;

  @media ${query({ from: 'md' })} {
    margin: 0;
    width: initial;

    position: absolute;
    top: 10px;
    right: 10px;
  }
`

interface CodeProps {
  theme?: any
  children: string
  copyable?: boolean
  language: string
  className?: string
  lineStartNumber?: string
  showLineNumbers?: boolean
  focusedLines?: string
}

export const Code: React.FC<CodeProps> = ({
  children,
  theme,
  language,
  className,
  copyable = true,
  lineStartNumber,
  showLineNumbers = false,
  focusedLines,
}) => {
  const shouldShowCopyText = useResponsiveValue(
    {
      xs: true,
      sm: true,
      md: true,
    },
    false,
  )

  return (
    <StyledCode
      code={children}
      className={className}
      language={language || (className && className.replace('language-', ''))}
      theme={theme || CodeTheme}
      showLineNumbers={showLineNumbers}
      lineNumberStart={lineStartNumber && parseFloat(lineStartNumber)}
      focusedLines={focusedLines}
    >
      {({ Preview, copyToClipboard }) => (
        <Container>
          <Preview />
          {copyable && (
            <CopyCodeButton
              showText={shouldShowCopyText}
              onClick={copyToClipboard}
            >
              Copy this example
            </CopyCodeButton>
          )}
        </Container>
      )}
    </StyledCode>
  )
}
