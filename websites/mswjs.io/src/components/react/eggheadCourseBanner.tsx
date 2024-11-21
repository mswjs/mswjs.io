import { LinkExternal } from '@mswjs/shared/components/react/linkExternal'

export function EggheadCourseBanner({
  courseUrl,
  thumbnailUrl,
  title,
  description,
}: {
  courseUrl: string
  thumbnailUrl: string
  title: React.ReactNode
  description: React.ReactNode
}) {
  return (
    <div className="@container">
      <LinkExternal
        href={courseUrl}
        className="relative group my-10 px-5 py-5 min-h-[125px] grid grid-rows-[160px,1fr] @lg:grid-rows-1 @lg:grid-cols-[150px_1fr] gap-5 @lg:gap-8 items-center bg-neutral-800 bg-opacity-40 border border-neutral-800 rounded-lg no-underline hover:bg-opacity-70"
      >
        <img
          src={thumbnailUrl}
          className="mx-auto w-[200px] -translate-y-5 group-hover:-translate-y-[35px] transition-transform duration-500 @lg:absolute @lg:top-0 @lg:w-[170px] @lg:-translate-y-[25px] @lg:left-3 @lg:m-0"
        />
        <div className="@lg:col-start-2">
          <h4 className="mt-0">{title}</h4>
          <p className="mb-0 text-neutral-400 leading-6">{description}</p>
        </div>
      </LinkExternal>
    </div>
  )
}
