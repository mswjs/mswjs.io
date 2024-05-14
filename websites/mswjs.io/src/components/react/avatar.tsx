import type { ReactNode } from 'react'
import { cls } from 'mswjs.io-shared/utils/cls'

interface Props {
  url: string
  className?: string
  name: string
  children: ReactNode
}

export function Avatar({ url, name, children, className }: Props): JSX.Element {
  return (
    <div className="inline-flex items-center gap-3">
      <img
        src={url}
        alt={name}
        className={cls('p-1 border-4 border-stone-700 rounded-full', className)}
      />
      <div>
        <p className="font-semibold leading-5 mb-1.5 text-white">{name}</p>
        <p className="text-neutral-400 leading-5">{children}</p>
      </div>
    </div>
  )
}
