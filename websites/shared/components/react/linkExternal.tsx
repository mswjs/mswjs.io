import type { DetailedHTMLProps } from 'react'

export function LinkExternal(
  props: DetailedHTMLProps<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  >
) {
  return <a {...props} target="_blank" rel="noopener noreferrer" />
}
