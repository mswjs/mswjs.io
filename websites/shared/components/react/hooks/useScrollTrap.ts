import React, { useRef } from 'react'
import { enableBodyScroll, disableBodyScroll } from 'body-scroll-lock'

export function useScrollTrap<E extends HTMLElement = HTMLElement>(): [
  React.RefObject<E>,
  () => void,
  () => void,
] {
  const elementRef = useRef<E>(null)

  return [
    elementRef,
    () => {
      if (!elementRef.current) return
      disableBodyScroll(elementRef.current)
    },
    () => {
      if (!elementRef.current) return
      enableBodyScroll(elementRef.current)
    },
  ]
}
