import type { ReactNode } from 'react'
import { ArrowRightCircleIcon } from '@heroicons/react/24/solid'

export function Action({ children }: { children: ReactNode }) {
  return (
    <p className="text-orange font-semibold">
      <ArrowRightCircleIcon className="inline w-5 -mt-[0.25ch] mr-[0.5ch] align-middle" />
      {children}
    </p>
  )
}
