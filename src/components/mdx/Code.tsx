import React from 'react'
import styled from 'styled-components'
import { Code as ReactCdxCode } from 'react-cdx'
import CodeTheme from 'prism-react-renderer/themes/nightOwlLight'
import { CopyButton } from '../CopyButton'

const StyledCode = styled(ReactCdxCode)`
  overflow: auto;
`

const Container = styled.div`
  position: relative;
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
          {copyable && <CopyButton onClick={copyToClipboard} />}
        </Container>
      )}
    </StyledCode>
  )
}
