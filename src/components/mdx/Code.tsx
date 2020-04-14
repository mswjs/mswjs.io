import React from 'react'
import { Code as ReactCdxCode } from 'react-cdx'
import CodeTheme from 'prism-react-renderer/themes/nightOwl'

export const Code: React.FC<{
  children: string
  language: string
  className?: string
  lineStartNumber?: string
}> = ({ children, language, className, lineStartNumber }) => {
  return (
    <ReactCdxCode
      code={children}
      language={language || (className && className.replace('language-', ''))}
      theme={CodeTheme}
      showLineNumbers={true}
      lineNumberStart={lineStartNumber && parseFloat(lineStartNumber)}
    />
  )
}
