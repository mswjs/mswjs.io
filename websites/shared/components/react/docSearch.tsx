import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { DocSearchModal, useDocSearchKeyboardEvents } from '@docsearch/react'

interface Props {
  appId: string
  apiKey: string
  indexName: string
}

export function DocSearch({ appId, apiKey, indexName }: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const [initialQuery, setInitialQuery] = useState('')
  const searchButtonRef = useRef(
    document.getElementById('docsearch-search-button') as HTMLButtonElement
  )

  const onOpen = useCallback(() => {
    setIsOpen(true)
  }, [setIsOpen])

  const onClose = useCallback(() => {
    setIsOpen(false)
  }, [setIsOpen])

  const onInput = useCallback(
    (event: KeyboardEvent) => {
      setIsOpen(true)
      setInitialQuery(event.key)
    },
    [setIsOpen, setInitialQuery]
  )

  useEffect(() => {
    searchButtonRef.current?.addEventListener('click', onOpen)
    return () => searchButtonRef.current?.removeEventListener('click', onOpen)
  }, [searchButtonRef.current, onOpen])

  useDocSearchKeyboardEvents({
    isOpen,
    onOpen,
    onClose,
    onInput,
    searchButtonRef,
  })

  if (!isOpen) {
    return null
  }

  return createPortal(
    <DocSearchModal
      appId={appId}
      apiKey={apiKey}
      indexName={indexName}
      initialQuery={initialQuery}
      initialScrollY={window.scrollY}
      insights
      placeholder="Search..."
      transformItems={(items) => {
        return items.map((item) => {
          const url = new URL(item.url)
          url.hash = ''

          return {
            ...item,
            url: url.href.replace(url.origin, ''),
          }
        })
      }}
      onClose={onClose}
    />,
    document.body
  )
}
