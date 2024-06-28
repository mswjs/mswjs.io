import React from 'react'
import { cls } from '../../utils/cls'

export function Grid({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}): JSX.Element {
  return (
    <div
      className={cls(
        'grid grid-cols-1 gap-10 md:gap-16 lg:grid-cols-12',
        className
      )}
    >
      {children}
    </div>
  )
}
