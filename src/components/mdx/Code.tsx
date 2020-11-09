import React from 'react'
import styled from 'styled-components'
import { Code as ReactCdxCode } from 'react-cdx'
import { theme } from '../../codeTheme'
import { CopyTextButton } from '../CopyTextButton'
import { query, useResponsiveValue } from 'atomic-layout'

const StyledCode = styled(ReactCdxCode)`
  overflow: auto;
  font-size: 90%;
`

const Container = styled.div`
  position: relative;
`

const CopyCodeButton = styled(CopyTextButton)`
  margin-top: -1rem;
  background-color: var(--color-black);
  border-color: var(--color-gray);
  color: #fff;
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
  language,
  className,
  copyable = true,
  lineStartNumber,
  showLineNumbers = true,
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
      theme={theme}
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
