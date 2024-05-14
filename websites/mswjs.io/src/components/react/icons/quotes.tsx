import * as React from 'react'

export default function QuotesIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 320 192"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g stroke="none" strokeWidth="1" fillRule="evenodd">
        <path d="M0,128 L0,0 L128,0 L128,192 L64,192 L64,128 L0,128 Z"></path>
        <path d="M192,128 L192,0 L320,0 L320,192 L256,192 L256,128 L192,128 Z"></path>
      </g>
    </svg>
  )
}
