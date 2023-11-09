import type { ReactNode } from 'react'

export function Success({ children }: { children: ReactNode }): JSX.Element {
  return (
    <div
      role="alert"
      className="px-4 py-2.5 my-5 font-medium text-green-600 bg-green-900 bg-opacity-10 border border-green-800 rounded-lg"
    >
      {children}
    </div>
  )
}
