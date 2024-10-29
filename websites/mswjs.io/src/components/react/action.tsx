import type { ReactNode } from 'react'
import { ArrowRightCircleIcon } from '@heroicons/react/24/solid'

export function Action({ children }: { children: ReactNode }) {
  return (
    <p className="font-semibold text-primary">
      <ArrowRightCircleIcon className="inline -mt-[0.25ch] mr-[0.5ch] w-5 align-middle" />
      {children}
    </p>
  )
}
