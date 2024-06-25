import * as React from 'react'
import { NewspaperIcon } from '@heroicons/react/24/solid'
import { DiscordIcon } from './icons/discord'
import { GitHubIcon } from './icons/github'
import { DISCORD_URL } from '../../consts'

interface DocsSidebarLinksProps {
  gitHubUrl: string
  blogUrl: string
}

export function DocsSidebarLinks(props: DocsSidebarLinksProps) {
  return (
    <section>
      <h4 className="text-xs mb-2 font-bold tracking-widest text-white uppercase">
        Community
      </h4>
      <ul>
        <li>
          <a
            href={props.gitHubUrl}
            className="py-1.5 inline-flex items-center gap-1.5 leading-5 text-neutral-400 hover:text-white"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GitHubIcon className="text-lg w-5" />
            <span>GitHub</span>
          </a>
        </li>
        <li>
          <a
            href={DISCORD_URL}
            className="py-1.5 inline-flex items-center gap-1.5 leading-5 text-neutral-400 hover:text-white"
            target="_blank"
            rel="noopener noreferrer"
          >
            <DiscordIcon className="text-lg w-5" />
            <span>Discord</span>
          </a>
        </li>
        <li>
          <a
            href={props.blogUrl}
            className="py-1.5 inline-flex items-center gap-1.5 leading-5 text-neutral-400 hover:text-white"
            target="_blank"
            ref="noopener noreferrer"
          >
            <NewspaperIcon className="w-5" />
            <span>Blog</span>
          </a>
        </li>
      </ul>
    </section>
  )
}
