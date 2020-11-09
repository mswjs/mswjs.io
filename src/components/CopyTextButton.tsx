import React, { useCallback, useState, useEffect } from 'react'
import styled from 'styled-components'
import {
  IoMdClipboard as CopyIcon,
  IoMdCheckmark as DoneIcon,
} from 'react-icons/io'

const Button = styled.button`
  padding: 0.5rem;

  background: none;
  border: 1px solid var(--color-gray-light);
  border-radius: var(--border-radius);
  cursor: pointer;
  display: flex;
  align-items: center;
  color: var(--color-gray);
  font-size: 90%;

  :hover {
    border-color: var(--color-gray);
    background-color: var(--color-gray);
    color: #fff;
  }

  :focus {
    outline: 0;
    background-color: var(--color-gray);
    border-color: var(--color-primary);
    box-shadow: 0 0 0 4px var(--color-primary-dim);
    color: #fff;
  }

  span {
    margin-left: 4px;
  }
`

const Icon = styled.svg`
  animation: fadeIn 0.25s linear;
`

interface Props {
  text: string
  showText?: boolean
}

export const CopyTextButton: React.FC<
  Props & React.HTMLAttributes<HTMLButtonElement>
> = ({
  children = 'Copy the code snippet',
  showText = false,
  text,
  onClick,
  ...restProps
}) => {
  const [isCopied, setCopied] = useState(false)

  useEffect(() => {
    if (isCopied) {
      const timeoutId = setTimeout(() => {
        setCopied(false)
      }, 2500)

      return () => clearTimeout(timeoutId)
    }
  }, [isCopied])

  const handleClick = useCallback(
    (event) => {
      navigator.clipboard.writeText(text)
      setCopied(true)
      onClick?.(event)
    },
    [text, onClick],
  )

  // Do not render the button on devices where the clipboard API doesn't exist.
  if (typeof navigator === 'undefined' || !navigator?.clipboard?.writeText) {
    return null
  }

  return (
    <Button {...restProps} onClick={handleClick}>
      {isCopied ? (
        <Icon as={DoneIcon} size={16} />
      ) : (
        <Icon as={CopyIcon} size={16} />
      )}
      {showText && <span>{isCopied ? 'Copied to clipboard!' : children}</span>}
    </Button>
  )
}
