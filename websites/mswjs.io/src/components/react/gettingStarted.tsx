import { CommandLineIcon } from '@heroicons/react/24/outline'
import { Container } from 'mswjs.io-shared/components/react/container'
import { MswBlockItem } from './mswBlockItem'
import { PageHeaderSubtitle } from './pageHeader'

export function GettingStarted(): JSX.Element {
  return (
    <div className="hero-gradient items-center py-24 text-center bg-neutral-800 bg-opacity-40 border-t-neutral-800 border-y border-b-neutral-800 -mb-px">
      <Container>
        <MswBlockItem />

        <div className="max-w-2xl mx-auto">
          <h2 className="mt-12 mb-8 capitalize">Ship better products today.</h2>
          <PageHeaderSubtitle className="text-left md:text-center">
            <span className="text-white">Mock Service Worker</span> is the best
            way to integrate API mocking across your entire stack. Test,
            prototype, and debug withouth sacrificing your application's
            integrity. Give it a try, it's open-source and free!
          </PageHeaderSubtitle>

          <a
            href="/docs/getting-started"
            className="button button-primary inline-flex items-center justify-center gap-2 text-lg mt-10 px-10 w-full md:w-auto"
          >
            <CommandLineIcon className="w-8 text-orange" />
            Get started in 3 steps
          </a>
        </div>
      </Container>
    </div>
  )
}
