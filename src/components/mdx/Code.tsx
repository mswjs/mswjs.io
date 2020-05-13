import React, { useMemo } from 'react'
import { Code as ReactCdxCode } from 'react-cdx'
import CodeTheme from 'prism-react-renderer/themes/github'

interface CodeProps {
  theme?: any
  children: string
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
  lineStartNumber,
  showLineNumbers = false,
  focusedLines,
}) => {
  const resolvedFocusedLines = useMemo(() => {
    if (!focusedLines) {
      return []
    }

    return focusedLines
      .split(',')
      .reduce((acc, index) => {
        if (index.includes('-')) {
          const [lowEdge, highEdge] = index.split('-').map(Number)
          const rangeArray = Array(highEdge - lowEdge + 1)
            .fill(null)
            .map((_, index) => {
              return lowEdge + index
            })

          return acc.concat(rangeArray)
        }

        return acc.concat(index)
      }, [])
      .map(Number)
  }, [focusedLines])

  return (
    <ReactCdxCode
      code={children}
      className={className}
      language={language || (className && className.replace('language-', ''))}
      theme={theme || CodeTheme}
      showLineNumbers={showLineNumbers}
      lineNumberStart={lineStartNumber && parseFloat(lineStartNumber)}
      focusedLines={resolvedFocusedLines}
    />
  )
}
