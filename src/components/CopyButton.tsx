import React, { useCallback, useState, useEffect } from 'react'
import styled from 'styled-components'
import {
  IoMdClipboard as CopyIcon,
  IoMdCheckmark as DoneIcon,
} from 'react-icons/io'

const Button = styled.button`
  position: absolute;
  padding: 0.5rem;
  top: 10px;
  right: 10px;

  background: none;
  border: 1px solid var(--color-gray-light);
  border-radius: var(--border-radius);
  cursor: pointer;
  display: flex;
  color: var(--color-gray);

  :hover {
    background-color: #fff;
    border-color: var(--color-gray);
    color: var(--color-black);
  }

  :focus {
    background-color: #fff;
    border-color: var(--color-secondary);
    color: var(--color-secondary);
  }
`

const Icon = styled.svg`
  animation: fadeIn 0.25s linear;
`

export const CopyButton: React.FC<React.HTMLAttributes<HTMLButtonElement>> = ({
  children,
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
      onClick(event)
      setCopied(true)
    },
    [onClick],
  )

  return (
    <Button {...restProps} onClick={handleClick}>
      {isCopied ? (
        <Icon as={DoneIcon} size={16} fill="green" />
      ) : (
        <Icon as={CopyIcon} size={16} />
      )}
    </Button>
  )
}
