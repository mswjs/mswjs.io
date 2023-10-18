import type { ReactNode } from 'react'

export function Section({ children }: { children: ReactNode }): JSX.Element {
  return (
    <section className="py-24 md:py-48 bg-neutral-800 bg-opacity-40 border-t-neutral-800 border-y border-b-neutral-800">
      {children}
    </section>
  )
}
