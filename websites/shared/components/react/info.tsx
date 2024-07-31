import type { ReactNode } from 'react'

export function Info({ children }: { children: ReactNode }): JSX.Element {
  return (
    <div
      role="alert"
      className="px-4 py-2.5 my-5 font-medium text-blue-400 bg-blue-900 bg-opacity-10 border border-blue-900 rounded-lg"
    >
      {children}
    </div>
  )
}
