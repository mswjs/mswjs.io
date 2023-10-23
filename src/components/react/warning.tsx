import type { ReactNode } from 'react'

export function Warning({ children }: { children: ReactNode }): JSX.Element {
  return (
    <div
      role="alert"
      className="flex items-start gap-2 px-4 py-2.5 my-5 text-yellow-500 bg-yellow-900 bg-opacity-10 font-medium leading-6 border border-yellow-800 rounded-lg"
    >
      {/* <ExclamationIcon className="flex-shrink-0 w-4 mt-1 text-yellow-500" /> */}
      {children}
    </div>
  )
}
