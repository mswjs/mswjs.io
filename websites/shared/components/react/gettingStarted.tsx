import { CommandLineIcon } from '@heroicons/react/24/outline'
import { Container } from './container'
import { PageHeaderSubtitle } from './pageHeader'
import { IconBlock } from './iconBlock'

interface Props {
  iconUrl: string
  iconAlt: string
  title: string
  linkUrl: string
  linkText: React.ReactNode
  children: React.ReactNode
}

export function GettingStarted(props: Props): JSX.Element {
  return (
    <div className="hero-gradient items-center py-24 text-center bg-neutral-800 bg-opacity-40 border-t-neutral-800 border-y border-b-neutral-800 -mb-px">
      <Container>
        <IconBlock imageUrl={props.iconUrl} alt={props.iconAlt} />

        <div className="max-w-2xl mx-auto">
          <h2 className="mt-12 mb-8 capitalize">{props.title}</h2>
          <PageHeaderSubtitle className="text-left md:text-center">
            {props.children}
          </PageHeaderSubtitle>

          <a
            href={props.linkUrl}
            className="button button-primary inline-flex items-center justify-center gap-2 text-lg mt-10 px-10 w-full md:w-auto"
          >
            <CommandLineIcon className="w-8 text-primary" />
            {props.linkText}
          </a>
        </div>
      </Container>
    </div>
  )
}
