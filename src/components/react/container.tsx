import React from 'react'
import { cls } from '../../utils/cls'

interface ContainerProps {
  children: React.ReactNode
  className?: string
  isFluid?: boolean
}

export function Container({
  children,
  className,
  isFluid,
}: ContainerProps): JSX.Element {
  return (
    <div className={cls(isFluid ? 'px-5' : 'container', className)}>
      {children}
    </div>
  )
}
