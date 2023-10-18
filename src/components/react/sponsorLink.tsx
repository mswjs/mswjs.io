import { HeartIcon } from '@heroicons/react/24/solid'
import { LinkExternal } from './linkExternal'

export function SponsorLink() {
  return (
    <LinkExternal
      href="https://github.com/sponsors/mswjs"
      className="inline-flex items-center px-3 py-1 h-[36px] space-x-1 border rounded-md border-orange text-orange hover:bg-orange hover:text-black"
    >
      <span className="self-center">
        <HeartIcon className="absolute w-3 motion-safe:animate-ping duration-long" />
        <HeartIcon className="w-3" />
      </span>
      <span className="hidden md:inline">Sponsor</span>
    </LinkExternal>
  )
}
