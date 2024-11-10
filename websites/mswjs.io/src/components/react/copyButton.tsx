import * as React from 'react'

interface CopyButtonProps
  extends Omit<React.HTMLAttributes<HTMLButtonElement>, 'type' | 'onClick'> {
  children: string
  elementId: string
}

export function CopyButton({ elementId, ...props }: CopyButtonProps) {
  const [text, setText] = React.useState(props.children)
  const timeoutRef = React.useRef<NodeJS.Timeout>()

  React.useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current)
    }
  }, [timeoutRef])

  const handleClick = async () => {
    const element = document.getElementById(elementId)

    if (!element) {
      return
    }

    await navigator.clipboard.writeText(element.outerHTML)
    setText('✓ Copied!')

    timeoutRef.current = setTimeout(() => {
      setText(props.children)
    }, 4000)
  }

  return (
    <button {...props} type="button" onClick={handleClick}>
      {text}
    </button>
  )
}
