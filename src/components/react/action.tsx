import type { ReactNode } from 'react'
import { ArrowRightCircleIcon } from '@heroicons/react/24/solid'

export function Action({ children }: { children: ReactNode }) {
  return (
    <div className="action flex items-start gap-0.5 text-orange font-semibold leading-6">
      <ArrowRightCircleIcon className="inline w-5 mt-[2px] mr-[0.5ch] align-middle" />
      {children}
    </div>
  )
}
