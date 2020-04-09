import React from 'react'
import { Code as ReactCdxCode } from 'react-cdx'
import CodeTheme from 'prism-react-renderer/themes/nightOwlLight'

export const Code: React.FC<{
  children: string
  language: string
  className?: string
}> = ({ children, language, className }) => {
  return (
    <ReactCdxCode
      code={children}
      language={language || (className && className.replace('language-', ''))}
      theme={CodeTheme}
    />
  )
}
