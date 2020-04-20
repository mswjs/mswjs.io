import React from 'react'
import { Code as ReactCdxCode } from 'react-cdx'
import CodeTheme from 'prism-react-renderer/themes/nightOwl'
import styled, { css } from 'styled-components'

interface CodeProps {
  children: string
  language: string
  className?: string
  lineStartNumber?: string
  showLineNumbers?: boolean
  hero?: boolean
}

const StyledCode = styled(ReactCdxCode)<CodeProps>`
  ${({ hero }) =>
    hero &&
    css`
      padding: 100px;
      box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.02),
        0 6.7px 5.3px rgba(0, 0, 0, 0.028), 0 12.5px 10px rgba(0, 0, 0, 0.035),
        0 22.3px 17.9px rgba(0, 0, 0, 0.042),
        0 41.8px 33.4px rgba(0, 0, 0, 0.05), 0 100px 80px rgba(0, 0, 0, 0.07);
    `}
`

export const Code: React.FC<CodeProps> = ({
  children,
  language,
  className,
  lineStartNumber,
  showLineNumbers = true,
  hero,
}) => {
  return (
    <StyledCode
      code={children}
      language={language || (className && className.replace('language-', ''))}
      theme={CodeTheme}
      showLineNumbers={showLineNumbers}
      lineNumberStart={lineStartNumber && parseFloat(lineStartNumber)}
      hero={hero}
    />
  )
}
