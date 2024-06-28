import { cls } from '../../utils/cls'

interface ContainerProps {
  children: React.ReactNode
  className?: string
  compact?: boolean
}

export function Container({
  children,
  className,
  compact,
}: ContainerProps): JSX.Element {
  return (
    <div className={cls(compact ? 'px-5' : 'container', className)}>
      {children}
    </div>
  )
}
