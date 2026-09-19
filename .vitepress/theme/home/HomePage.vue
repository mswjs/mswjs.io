<script setup lang="ts">
import type { Component } from 'vue'
import HomeHero from './HomeHero.vue'
import FeatureCard from './FeatureCard.vue'
import FeatureLink from './FeatureLink.vue'
import InterceptionDiagram from './InterceptionDiagram.vue'
import Container from '../components/Container.vue'
import PageHeaderSubtitle from '../components/PageHeaderSubtitle.vue'
import GetStarted from './GetStarted.vue'
import FeaturedQuote from './FeaturedQuote.vue'
import SourceOfTruth, { type SourceOfTruthScene } from './SourceOfTruth.vue'
import ReviewTile from './ReviewTile.vue'
import reviews from './reviews.json'

import PlayCircleIcon from '../components/icons/play-circle.vue'
import GitHubIcon from '../components/icons/github.vue'
import MicrosoftIcon from '../components/icons/microsoft.vue'
import GoogleIcon from '../components/icons/google.vue'
import AwsIcon from '../components/icons/aws.vue'
import NetflixIcon from '../components/icons/netflix.vue'
import SpotifyIcon from '../components/icons/spotify.vue'
import SamsungIcon from '../components/icons/samsung.vue'
import UberIcon from '../components/icons/uber.vue'
import VercelIcon from '../components/icons/vercel.vue'
import CloudflareIcon from '../components/icons/cloudflare.vue'
import ShopifyIcon from '../components/icons/shopify.vue'
import NvidiaIcon from '../components/icons/nvidia.vue'
import IbmIcon from '../components/icons/ibm.vue'
import AmdIcon from '../components/icons/amd.vue'
import MercedesIcon from '../components/icons/mercedes.vue'
import BasecampIcon from '../components/icons/basecamp.vue'

import mswLogo from '../../../src/images/msw.svg'
import kentCDoddsAvatar from '../../../src/images/people/kent-c-dodds.jpg'
import coryHouseAvatar from '../../../src/images/people/cory-house.jpg'

/**
 * Edit "reviews.json" to change the community reviews.
 */
interface CommunityReview {
  author: string
  position?: string
  /**
   * Trusted, hand-written markup: emphasis via "<em>".
   */
  quote: string
}

/**
 * Copies of the first reviews appended to the row so it stays full while
 * it scrolls; five 22rem tiles cover the widest homepage frame.
 */
const REPEATED_REVIEWS = 5

const communityReviews: Array<CommunityReview> = reviews

interface Company {
  name: string
  icon: Component
  class: string
}

/**
 * Copies of the first companies appended to the row so it stays full
 * while it scrolls; seven 224px cells cover the widest homepage frame.
 */
const REPEATED_COMPANIES = 7

const companies: Array<Company> = [
  { name: 'Microsoft', icon: MicrosoftIcon, class: 'h-6 md:h-9 max-w-full' },
  { name: 'Google', icon: GoogleIcon, class: 'h-6 md:h-9 max-w-full' },
  {
    name: 'Amazon Web Services',
    icon: AwsIcon,
    class: 'h-6 md:h-9 max-w-full',
  },
  { name: 'Netflix', icon: NetflixIcon, class: 'h-3.5 md:h-5 max-w-full' },
  { name: 'Spotify', icon: SpotifyIcon, class: 'h-6 md:h-9 max-w-full' },
  { name: 'Samsung', icon: SamsungIcon, class: 'h-6 md:h-9 max-w-full' },
  { name: 'Uber', icon: UberIcon, class: 'h-3 md:h-4 max-w-full' },
  { name: 'GitHub', icon: GitHubIcon, class: 'h-6 md:h-9 max-w-full' },
  { name: 'Vercel', icon: VercelIcon, class: 'h-6 md:h-9 max-w-full' },
  { name: 'Cloudflare', icon: CloudflareIcon, class: 'h-7 md:h-11 max-w-full' },
  { name: 'Shopify', icon: ShopifyIcon, class: 'h-8 md:h-12 max-w-full' },
  { name: 'Nvidia', icon: NvidiaIcon, class: 'h-6 md:h-9 max-w-full' },
  { name: 'IBM', icon: IbmIcon, class: 'h-5 md:h-7 max-w-full' },
  { name: 'AMD', icon: AmdIcon, class: 'h-4 md:h-5 max-w-full' },
  { name: 'Mercedes-Benz', icon: MercedesIcon, class: 'h-6 md:h-9 max-w-full' },
  { name: 'Basecamp', icon: BasecampIcon, class: 'h-5 md:h-7 max-w-full' },
]

/**
 * Scenes of the "source of truth" section: the heading's last word and
 * the slot (a fence in "index.md") holding the matching setup snippet.
 */
const sourceOfTruthScenes: Array<SourceOfTruthScene> = [
  { word: 'component testing', slot: 'scene-testing' },
  { word: 'end-to-end testing', slot: 'scene-e2e' },
  { word: 'development', slot: 'scene-development' },
  { word: 'debugging', slot: 'scene-debugging' },
  { word: 'perfect demos', slot: 'scene-storybook' },
]
</script>

<template>
  <HomeHero
    repo-url="https://github.com/mswjs/msw"
    getting-started-url="/docs/quick-start"
  >
    <template #headnote>
      <span>Learn best testing practices from MSW creator</span>
      <a
        href="https://epicweb.dev/testing"
        class="ml-auto inline-flex shrink-0 items-center gap-1 text-neutral-400 hover:text-white hover:underline"
        target="_blank"
        rel="noopener noreferrer"
      >
        <PlayCircleIcon class="h-4 w-4" aria-hidden="true" />
        Enroll now
      </a>
    </template>

    <template #title>
      The industry standard for API mocking in JavaScript.
    </template>
    <template #subtitle>
      Mock Service Worker is an API mocking library that allows you to write
      client-agnostic mocks and reuse them across any frameworks, tools, and
      environments.
    </template>
    <template #code>
      <slot name="hero-code" />
    </template>
  </HomeHero>

  <!-- Companies -->
  <Container class="home-frame">
    <div class="home-frame-rails -mb-px border border-neutral-800">
      <p
        class="border-b border-neutral-800 h-14 px-4 flex items-center justify-center text-center text-sm font-semibold uppercase tracking-widest text-neutral-400"
      >
        Trusted by teams at
      </p>
      <!-- One row of logos scrolling right to left, same mechanics as the
           reviews below: every company once plus copies of the first few. -->
      <div class="marquee overflow-hidden text-neutral-400 fill-neutral-400">
        <div
          class="marquee-track flex"
          :style="{
            '--marquee-count': companies.length,
            '--marquee-item': 224,
          }"
        >
          <div
            v-for="company in companies"
            :key="company.name"
            class="marquee-item flex shrink-0 items-center justify-center border-r border-neutral-800 px-6 py-6"
          >
            <component
              :is="company.icon"
              :class="company.class"
              :aria-label="company.name"
            />
          </div>
          <div
            v-for="company in companies.slice(0, REPEATED_COMPANIES)"
            :key="`repeat-${company.name}`"
            class="marquee-item flex shrink-0 items-center justify-center border-r border-neutral-800 px-6 py-6"
            aria-hidden="true"
          >
            <component :is="company.icon" :class="company.class" />
          </div>
        </div>
      </div>
    </div>
  </Container>

  <!-- Features -->
  <section>
    <Container class="home-frame">
      <div class="home-frame-rails -mb-px border border-neutral-800">
        <header class="px-6 pt-24 pb-16 text-center md:pt-32 md:pb-24">
          <h2 class="mb-0 capitalize max-w-lg md:max-w-2xl mx-auto">
            API mocking that feels
            <span class="whitespace-nowrap">like an extension</span> of
            JavaScript.
          </h2>
        </header>
        <div class="grid md:grid-cols-2">
          <FeatureCard
            plain
            title="Standard-first API mocking"
            code-placement="bottom-right"
            class="border-b border-neutral-800 md:border-r md:border-fade-t"
          >
            <template #description>
              MSW doesn't reinvent the wheel. How do you handle the network in
              JavaScript? With the Fetch API! And that's precisely how you write
              your mocks.
            </template>
            <template #links>
              <FeatureLink href="/docs/philosophy">Our philosophy</FeatureLink>
            </template>
            <slot name="feature-standards" />
          </FeatureCard>
          <FeatureCard
            plain
            title="Describe the network once"
            code-placement="bottom-right"
            class="border-b border-neutral-800"
          >
            <template #description>
              The era of patching <code>window.fetch</code> is over. MSW
              pioneered transparent network interception where you describe your
              mocks once and they work everywhere.
            </template>
            <template #links>
              <FeatureLink href="/guides/">Integration guides</FeatureLink>
            </template>
            <slot name="feature-agnostic" />
          </FeatureCard>
          <FeatureCard
            plain
            title="Unmatched feature set"
            code-placement="right-bottom"
            class="md:col-span-2 2xl:px-[calc(var(--card-padding-x)+62px)]"
          >
            <template #description>
              Mock REST, GraphQL, Server-Sent Events, and WebSocket APIs with a
              single network contract, simultaneously.
            </template>
            <template #links>
              <FeatureLink href="/docs/comparison"
                >Compare with other tools</FeatureLink
              >
            </template>
            <slot name="feature-protocols" />
          </FeatureCard>
        </div>
      </div>
    </Container>
  </section>

  <!-- Interception -->
  <section>
    <Container class="home-frame">
      <div
        class="home-frame-rails -mb-px border border-neutral-800 py-24 md:py-32"
      >
        <header class="px-6 pb-16 text-center md:pb-24">
          <h2 class="mb-6 capitalize max-w-lg mx-auto">
            API mocking that actually lets requests happen
          </h2>
          <PageHeaderSubtitle class="lg:w-3/6">
            A decade worth of research to bring you the network interception
            algorithm that combines the impossible: actually perform requests
            while giving you full control over them.
          </PageHeaderSubtitle>
        </header>

        <!-- Browser -->
        <div class="mx-8 mb-8 md:mx-12 md:mb-12 lg:mx-16 lg:mb-16">
          <div class="xl:mx-auto xl:max-w-5xl">
            <p
              class="mb-1.5 inline-block rounded-md bg-neutral-500/10 px-2 py-0.5 text-xs font-bold uppercase tracking-widest text-neutral-400"
            >
              Browser
            </p>
            <h3 class="text-xl font-bold text-white md:text-2xl">
              Service Worker API
            </h3>
            <p
              class="home-prose mt-4 max-w-lg text-lg leading-snug text-neutral-400"
            >
              In the browser, MSW leverages the standard Service Worker API to
              seamlessly intercept production requests.
            </p>
            <InterceptionDiagram
              class="mt-12 md:mt-20"
              :steps="[
                { label: 'fetch()', detail: 'Request client' },
                { label: 'Service Worker', detail: 'Browser API' },
                { label: 'Network', detail: 'Browser networking' },
              ]"
              :msw-reach="1"
              :boundaries="[{ after: 0, label: 'Your app' }]"
            />
          </div>
        </div>

        <hr />

        <!-- Node.js -->
        <div class="m-8 mb-0 md:m-12 md:mb-0 lg:m-16 lg:mb-0">
          <div class="xl:mx-auto xl:max-w-5xl">
            <p
              class="mb-1.5 inline-block rounded-md bg-neutral-500/10 px-2 py-0.5 text-xs font-bold uppercase tracking-widest text-neutral-400"
            >
              Node.js
            </p>
            <h3 class="text-xl font-bold text-white md:text-2xl">
              <a
                href="https://github.com/mswjs/interceptors"
                class="hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                @mswjs/interceptors
              </a>
            </h3>
            <p
              class="home-prose mt-4 max-w-lg text-lg leading-snug text-neutral-400"
            >
              In Node.js, MSW intercepts raw socket connections at the lowest
              possible level before they reach the actual network code written
              in C.
            </p>
            <InterceptionDiagram
              class="mt-12 lg:mt-20"
              :steps="[
                { label: 'fetch()', detail: 'Request client' },
                { label: 'net.connect()', detail: 'Node.js core' },
                { label: 'net.Socket', detail: 'Stream' },
                { label: 'TCP/TLS wraps', detail: 'JS bindings for C' },
                { label: 'Network', detail: 'Operating system' },
              ]"
              :msw-reach="3"
              :boundaries="[
                { after: 0, label: 'Your app' },
                { after: 3, label: 'Node.js C code' },
              ]"
            />
          </div>
        </div>
      </div>
    </Container>
  </section>

  <!-- Source of truth -->
  <section>
    <Container class="home-frame">
      <div
        class="home-frame-rails -mb-px overflow-hidden border border-neutral-800"
      >
        <SourceOfTruth :scenes="sourceOfTruthScenes">
          <template #heading>API mocking as a standalone layer for</template>
          <template
            v-for="scene in sourceOfTruthScenes"
            :key="scene.slot"
            #[scene.slot]
          >
            <slot :name="scene.slot" />
          </template>
        </SourceOfTruth>
      </div>
    </Container>
  </section>

  <!-- Testimonials -->
  <section>
    <Container class="home-frame">
      <div class="home-frame-rails -mb-px border border-neutral-800">
        <header class="px-6 pt-24 pb-16 text-center md:pt-32 md:pb-24">
          <h2 class="mb-0 capitalize max-w-lg mx-auto">
            API mocking beloved by all who ships quality apps.
          </h2>
        </header>

        <!-- Featured quotes -->
        <div class="grid lg:grid-cols-2">
          <FeaturedQuote
            author="Kent C. Dodds"
            position="Software Engineer and Educator"
            :avatar-url="kentCDoddsAvatar"
            class="border-b border-neutral-800 lg:border-r lg:border-fade-t"
          >
            I found MSW and was thrilled that not only could I still see the
            mocked responses in my DevTools, but that the mocks didn't have to
            be written in a Service Worker and could instead live alongside the
            rest of my app. This made it <em>silly easy to adopt</em>. The fact
            that I can use it for testing as well makes MSW a
            <em>huge productivity booster</em>.
          </FeaturedQuote>
          <FeaturedQuote
            author="Cory House"
            position="Software Architect"
            :avatar-url="coryHouseAvatar"
            class="border-b border-neutral-800"
          >
            Mock Service Worker has become a
            <em>fundamental part of my development and testing workflow</em>.
            With MSW I don't have to worry about endpoints or databases being
            down or slow. And I can forget about brittle tests due to changing
            data. I configure mocks that are 100% reliable and predictable. The
            result?
            <em>Faster development and rock-solid automated UI tests</em>.
          </FeaturedQuote>
        </div>

        <!-- Community reviews: one row scrolling right to left. The row
             holds every review once, followed by copies of the first few,
             enough to fill the viewport; a cycle moves exactly one full set,
             so the copies land where the originals restart: no jump. -->
        <div class="marquee overflow-hidden">
          <div
            class="marquee-track flex"
            :style="{
              '--marquee-count': communityReviews.length,
              '--marquee-item': 352,
            }"
          >
            <ReviewTile
              v-for="review in communityReviews"
              :key="review.author"
              :author="review.author"
              :position="review.position"
            >
              <span v-html="review.quote" />
            </ReviewTile>
            <ReviewTile
              v-for="review in communityReviews.slice(0, REPEATED_REVIEWS)"
              :key="`repeat-${review.author}`"
              :author="review.author"
              :position="review.position"
              aria-hidden="true"
            >
              <span v-html="review.quote" />
            </ReviewTile>
          </div>
        </div>
      </div>
    </Container>
  </section>

  <GetStarted
    title="Ship Better Products Today"
    :icon-url="mswLogo"
    icon-alt="Mock Service Worker logo"
    link-text="Get started in 5 minutes"
    link-url="/docs/quick-start"
  >
    <span class="text-white">Mock Service Worker</span> is the best way to
    integrate API mocking across your entire stack. Test, prototype, and debug
    without sacrificing your application's integrity. Give it a try, it's
    open-source and free!
  </GetStarted>
</template>
