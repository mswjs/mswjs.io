interface PageCardProps {
  url: string
  title: string
  description: string
  icon: React.FC<any>
}

export function PageCard({
  url,
  icon: Icon,
  title,
  description,
}: PageCardProps) {
  const isExternal = !url.startsWith('/')
  const extraProps = isExternal
    ? {
        target: '_blank',
        rel: 'noopener noreferrer',
      }
    : {}

  return (
    <a
      {...extraProps}
      href={url}
      className="block my-5 px-5 py-4 border border-neutral-800 rounded-lg shadow-sm text-white no-underline bg-opacity-40 bg-neutral-800 hover:bg-opacity-70"
    >
      <article className="flex items-start gap-5">
        <div className="bg-orange bg-opacity-10 rounded-md p-2">
          <Icon className="w-[24px] h-[24px] text-orange text-lg" />
        </div>
        <div>
          <p className="mt-0 mb-1 text-base font-bold">{title}</p>
          <p className="mb-0 mt-0 text-sm leading-6 text-neutral-400">
            {description || url}
          </p>
        </div>
      </article>
    </a>
  )
}
