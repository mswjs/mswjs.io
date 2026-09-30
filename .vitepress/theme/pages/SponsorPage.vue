<script setup lang="ts">
import { computed, ref } from 'vue'
import { ArrowUpRightIcon } from '@heroicons/vue/24/outline'
import GitHubIcon from '../components/icons/github.svg?component'
import Avatar from '../components/Avatar.vue'
import stats from './sponsor-stats.json'

const sponsorUrl = 'https://github.com/sponsors/mswjs'
const totalDownloads = new Intl.NumberFormat('en', {
  notation: 'compact',
  maximumFractionDigits: 2,
}).format(stats.totalDownloads)
const exactGithubStars = new Intl.NumberFormat('en').format(stats.githubStars)
const roundedGithubStars = Math.floor(stats.githubStars / 100) * 100
const githubStars = `${new Intl.NumberFormat('en').format(roundedGithubStars)}${stats.githubStars > roundedGithubStars ? '+' : ''}`
const comparisonPosition = ref(50)
const comparisonStyle = computed(() => ({
  '--comparison-position': `${comparisonPosition.value}%`,
}))

/**
 * Dragging the comparison handle. The invisible range input underneath
 * keeps the comparison keyboard-accessible, but mobile browsers only let
 * you drag a range input by its (invisible, differently positioned) thumb.
 * The handle is therefore draggable on its own via pointer events.
 */
const DOUBLE_TAP_MS = 300
/**
 * How far (in pixels) the pointer travels before a press becomes a drag.
 * Touch screens report tiny movements even for a still finger.
 */
const DRAG_THRESHOLD = 4
const comparisonTrack = ref<HTMLElement>()
/**
 * Resetting moves the handle from under the pointer, so the click that
 * follows the second tap would land on the range input and move the handle
 * right back. The input ignores the pointer for that brief moment.
 */
const isComparisonInputInert = ref(false)
let isDraggingComparison = false
let hasMovedComparison = false
let comparisonPointerStart = 0
let lastComparisonTap = 0

function setComparisonPositionFromPointer(event: PointerEvent): void {
  const track = comparisonTrack.value

  if (!track) {
    return
  }

  const rect = track.getBoundingClientRect()
  const ratio = (event.clientX - rect.left) / rect.width
  comparisonPosition.value = Math.round(Math.min(Math.max(ratio, 0), 1) * 100)
}

function handleComparisonPointerDown(event: PointerEvent): void {
  if (event.currentTarget instanceof HTMLElement) {
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  isDraggingComparison = true
  hasMovedComparison = false
  comparisonPointerStart = event.clientX
}

function handleComparisonPointerMove(event: PointerEvent): void {
  if (!isDraggingComparison) {
    return
  }

  if (
    !hasMovedComparison &&
    Math.abs(event.clientX - comparisonPointerStart) < DRAG_THRESHOLD
  ) {
    return
  }

  hasMovedComparison = true
  setComparisonPositionFromPointer(event)
}

function handleComparisonPointerUp(event: PointerEvent): void {
  if (!isDraggingComparison) {
    return
  }

  isDraggingComparison = false

  if (hasMovedComparison) {
    return
  }

  // Two taps (or clicks) in a row reset the handle to the middle.
  if (event.timeStamp - lastComparisonTap < DOUBLE_TAP_MS) {
    comparisonPosition.value = 50
    lastComparisonTap = 0
    isComparisonInputInert.value = true
    setTimeout(() => {
      isComparisonInputInert.value = false
    }, DOUBLE_TAP_MS)
    return
  }

  lastComparisonTap = event.timeStamp
}

function handleComparisonPointerCancel(): void {
  isDraggingComparison = false
}
const maximumDownloads = Math.max(
  ...stats.monthlyDownloads.map((entry) => entry.downloads),
)
const graphPoints = stats.monthlyDownloads.map((entry, index) => ({
  x: 8 + (index * 264) / (stats.monthlyDownloads.length - 1),
  y: 88 - (entry.downloads / maximumDownloads) * 76,
  label: new Date(`${entry.month}-01T00:00:00Z`).toLocaleDateString('en', {
    month: 'short',
    timeZone: 'UTC',
  }),
  downloads: entry.downloads,
}))
const graphLine = graphPoints.map((point) => `${point.x},${point.y}`).join(' ')
const asOfDate = new Date(`${stats.asOf}T00:00:00Z`).toLocaleDateString('en', {
  month: 'long',
  day: 'numeric',
  year: 'numeric',
  timeZone: 'UTC',
})
const compact = new Intl.NumberFormat('en', {
  notation: 'compact',
  maximumFractionDigits: 1,
})
const downloadsByPackage = Object.fromEntries(
  stats.comparisons.packages.map((entry) => [entry.name, entry.downloads]),
)
const starsByRepository = Object.fromEntries(
  stats.comparisons.repositories.map((entry) => [entry.name, entry.stars]),
)
const mswMonthlyDownloads = downloadsByPackage['msw']
const starComparisons = [
  { name: 'Svelte', repository: 'sveltejs/svelte', pkg: 'svelte' },
  { name: 'Cypress', repository: 'cypress-io/cypress', pkg: 'cypress' },
  { name: 'Vue', repository: 'vuejs/core', pkg: 'vue' },
].map((project) => ({
  name: project.name,
  starsRatio: (
    starsByRepository[project.repository] / stats.githubStars
  ).toFixed(1),
  stars: compact.format(starsByRepository[project.repository]),
  downloadsRatio: (
    downloadsByPackage[project.pkg] / mswMonthlyDownloads
  ).toFixed(2),
  downloads: compact.format(downloadsByPackage[project.pkg]),
}))
const graphDescription = `Monthly npm downloads, March–August 2026: ${graphPoints.map((point) => `${point.label}: ${point.downloads.toLocaleString('en')}`).join('; ')}.`
const dependents = [
  { name: 'Google', avatarUrl: '/users/orgs/google.png' },
  { name: 'Microsoft', avatarUrl: '/users/orgs/microsoft.png' },
  { name: 'Amazon', avatarUrl: '/users/orgs/amazon.png' },
  { name: 'Spotify', avatarUrl: '/users/orgs/spotify.png' },
  { name: 'Meta', avatarUrl: '/users/orgs/meta.png' },
]
// The sponsors are repeated to fill the background collage on any screen.
const sponsorCollage = Array.from({ length: 6 }).flatMap(() => {
  return stats.sponsors
})
const ecosystem = [
  {
    name: 'Nock',
    description: `Nock uses MSW to intercept the network. Two established mocking tools now share the same foundation so that everyone can enjoy the quality interception with their own preferred API experience.`,
    url: 'https://github.com/nock/nock',
  },
  {
    name: 'Vitest',
    description:
      'MSW powers browser module interception in Vitest’s mocker. Vitest recommends MSW as the go-to approach to API mocking as well.',
    url: 'https://github.com/vitest-dev/vitest/tree/main/packages/mocker',
  },
  {
    name: 'shadcn/ui',
    description:
      'shadcn/ui uses MSW to test its registry. The tools you use to bring components into your app rely on dependable API mocks, too.',
    url: 'https://github.com/shadcn-ui/ui',
  },
]
</script>

<template>
  <div
    class="grid grid-cols-[20px_minmax(0,1fr)_20px] text-base leading-7 sm:grid-cols-[minmax(24px,1fr)_minmax(0,1080px)_minmax(24px,1fr)] [&_a:focus-visible]:outline [&_a:focus-visible]:outline-2 [&_a:focus-visible]:outline-offset-[5px] [&_a:focus-visible]:outline-primary"
  >
    <header
      class="col-start-2 min-w-0 max-w-[720px] py-14 sm:py-20"
      aria-labelledby="sponsor-title"
    >
      <h1 id="sponsor-title" class="text-balance">
        An open letter from the MSW creator
      </h1>
      <div class="space-y-4">
        <p class="text-lg text-white">
          Over the past decade, Mock Service Worker has evolved from a prototype
          I built over the weekend to the foundational testing infrastructure
          powering the entire web. Sadly, it remains severely underfunded and a
          few sponsor cancelations away from becoming abandonware.
        </p>
        <p class="text-lg text-white">
          Most of you probably don't know that. When you see a successful
          open-source project, you imagine a team of people toiling day and
          night to make it better. It seldom crosses your mind it might be a
          single guy who barely makes the ends meet.
        </p>
        <p class="text-lg text-white">
          The scariest part about this:
          <strong>I don't know what to do</strong>.
        </p>
        <p class="text-lg text-white">
          I tried so many things over the years. I reached out to companies,
          struck deals, and turned down opportunities that would likely set me
          up for life but sacrified the quality and integrity of the project in
          the process. Sorry little of that bore any fruits. Although I've been
          <em>immensely</em> lucky to win grants, get sponsored, and secure
          partnerships with a number of incredible companies, that's barely
          enough to fund my work on the project, let alone establish something
          akin to a team.
        </p>
        <p class="text-lg text-white">
          As it stands now, I don't see MSW having a future.
        </p>
        <p class="text-lg text-white">I want that to change.</p>
        <p class="text-lg text-white">
          I created this page as a reminder of how absurdly influential MSW is
          while remaining a sad epitome of the "random maintainer from Nebraska"
          meme, in hopes that that contrast inspires you (or, better, your
          company), to support the project. Please read this, it won't take much
          of your time. Thank you.
        </p>
      </div>
      <footer
        class="mt-12 flex pb-4 text-left sm:mt-16"
        aria-label="Letter signature"
      >
        <Avatar
          url="/users/kettanaito.jpg"
          name="Artem Zakharchenko"
          class-name="flex-shrink-0 w-16 h-16"
        >
          <a
            href="https://x.com/kettanaito"
            class="text-left text-primary hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            @kettanaito
          </a>
        </Avatar>
      </footer>
    </header>

    <section
      class="col-start-2 min-w-0 border-t border-neutral-800 py-14 sm:py-20"
      aria-label="MSW project statistics"
    >
      <h2>Where we are</h2>
      <p class="-mt-3 mb-8 text-sm text-neutral-400">As of {{ asOfDate }}</p>
      <dl class="grid grid-cols-1 gap-7 tabular-nums lg:grid-cols-3 lg:gap-9">
        <div class="flex flex-col items-start">
          <dt class="mb-3 text-lg font-semibold leading-[1.4] text-white">
            Total npm downloads
          </dt>
          <p>
            That's more than Svelte, Angular, SolidJS, and Astro
            <strong>combined</strong>, every month.
          </p>
          <dd
            class="order-first mb-0.5 whitespace-nowrap text-6xl font-semibold leading-tight tracking-tighter lg:text-5xl xl:text-6xl"
            :title="stats.totalDownloads.toLocaleString('en')"
          >
            {{ totalDownloads }}
          </dd>
          <figure class="mt-5 w-full max-w-sm lg:max-w-none">
            <svg
              class="block w-full overflow-visible"
              viewBox="0 0 280 100"
              role="img"
              :aria-label="graphDescription"
            >
              <path
                d="M8 88H272 M8 50H272 M8 12H272"
                class="fill-none stroke-neutral-800 stroke-1"
              />
              <polygon
                :points="`8,88 ${graphLine} 272,88`"
                class="fill-primary/[0.08]"
              />
              <polyline
                :points="graphLine"
                class="fill-none stroke-primary stroke-2 [stroke-linecap:round] [stroke-linejoin:round]"
              />
              <circle
                v-for="point in graphPoints"
                :key="point.label"
                :cx="point.x"
                :cy="point.y"
                r="3"
                class="fill-primary"
              >
                <title>
                  {{ point.label }}:
                  {{ point.downloads.toLocaleString('en') }} downloads
                </title>
              </circle>
            </svg>
          </figure>
        </div>
        <div
          class="flex flex-col items-start border-t border-neutral-800 pt-7 lg:border-l lg:border-t-0 lg:pl-9 lg:pt-0"
        >
          <dt class="mb-3 text-lg font-semibold leading-[1.4] text-white">
            GitHub stargazers
          </dt>
          <dd
            class="order-first mb-0.5 whitespace-nowrap text-6xl font-semibold leading-tight tracking-tighter lg:text-5xl xl:text-6xl"
          >
            {{ githubStars }}
          </dd>
          <p>
            A, frankly, insane number of developers like MSW, give talks, shoot
            videos, and even write books about it.
          </p>
          <!-- GitHub's "Star" button, scaled up. Colors are GitHub's own. -->
          <a
            href="https://github.com/mswjs/msw/stargazers"
            target="_blank"
            rel="noopener noreferrer"
            class="mt-5 inline-flex h-10 select-none items-center gap-2 rounded-lg border border-[#d1d9e0] bg-[#f6f8fa] px-4 text-base font-medium leading-none text-[#25292e] no-underline transition-colors duration-75 [font-family:-apple-system,BlinkMacSystemFont,'Segoe_UI','Noto_Sans',Helvetica,Arial,sans-serif] hover:border-[#d1d9e0] hover:bg-[#eff2f5] [.dark_&]:border-[#3d444d] [.dark_&]:bg-[#212830] [.dark_&]:text-[#f0f6fc] [.dark_&]:hover:bg-[#262c36]"
          >
            <svg
              class="size-5 shrink-0 fill-[#59636e] [.dark_&]:fill-[#9198a1]"
              viewBox="0 0 16 16"
              aria-hidden="true"
            >
              <path
                d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Zm0 2.445L6.615 5.5a.75.75 0 0 1-.564.41l-3.097.45 2.24 2.184a.75.75 0 0 1 .216.664l-.528 3.084 2.769-1.456a.75.75 0 0 1 .698 0l2.77 1.456-.53-3.084a.75.75 0 0 1 .216-.664l2.24-2.183-3.096-.45a.75.75 0 0 1-.564-.41L8 2.694Z"
              />
            </svg>
            <span>Star</span>
            <span
              class="rounded-full bg-[#818b981f] px-2 text-sm font-medium leading-6 tabular-nums [.dark_&]:bg-[#2f3742]"
            >
              {{ exactGithubStars }}
            </span>
          </a>
        </div>
        <div
          class="flex flex-col items-start border-t border-neutral-800 pt-7 lg:border-l lg:border-t-0 lg:pl-9 lg:pt-0"
        >
          <dt class="mb-3 text-lg font-semibold leading-[1.4] text-white">
            Repositories depend on MSW
          </dt>
          <dd
            class="order-first mb-0.5 whitespace-nowrap text-6xl font-semibold leading-tight tracking-tighter lg:text-5xl xl:text-6xl"
          >
            200,000+
          </dd>
          <p>
            Publicly, on GitHub alone. It's easier to point out the Fortune 500
            companies that don't use MSW than those who do.
          </p>
          <ul class="mt-5 flex list-none -space-x-3 p-0">
            <li
              v-for="(dependent, index) in dependents"
              :key="dependent.name"
              class="relative"
              :style="{ zIndex: dependents.length - index }"
            >
              <img
                :src="dependent.avatarUrl"
                :alt="dependent.name"
                :title="dependent.name"
                width="48"
                height="48"
                loading="lazy"
                class="size-12 rounded-full border border-neutral-800 bg-[#fff] object-cover ring-2 ring-[var(--vp-c-bg)]"
              />
            </li>
            <li
              class="relative flex size-12 select-none items-center justify-center rounded-full border border-neutral-800 bg-[#fff] font-semibold leading-none text-[#a3a3a3] ring-2 ring-[var(--vp-c-bg)]"
              aria-label="And many more"
            >
              <!-- The dots sit on the baseline: lift them to the optical center. -->
              <span class="relative -top-[0.25em]" aria-hidden="true">...</span>
            </li>
          </ul>
        </div>
      </dl>
    </section>

    <section
      class="col-start-2 min-w-0 border-t border-neutral-800 py-14 sm:py-20"
      aria-labelledby="history-title"
    >
      <h2 id="history-title">A new take on API mocking</h2>
      <div class="max-w-[720px] space-y-4">
        <p class="">
          Do you know when was the last day API mocking was tedious? It's
          November 17th, 2018. Because the very next day, the first version of
          MSW got released. And it did nothing short of changing the game.
        </p>
        <p>
          Before it, mocking was in a bad place. You spied on the request
          client, praying its APIs stay the same between updates. You repeated
          the same mocks over and over between your component and end-to-end
          tests. Mock-first development? That'd be one more dependency and an
          extra day of work on your end.
        </p>
        <p>
          Every test runner and every tool saw API mocking as its feature.
          Divided, different in both the syntax and capabilities. MSW recognized
          it as its own layer.
        </p>
      </div>
      <div class="my-8 max-w-[760px]" :style="comparisonStyle">
        <div class="mb-3 flex justify-between gap-4">
          <button
            type="button"
            class="text-sm font-semibold hover:text-primary"
            @click="comparisonPosition = 100"
          >
            Before (jest.spyOn)
          </button>
          <button
            type="button"
            class="text-sm font-semibold hover:text-primary"
            @click="comparisonPosition = 0"
          >
            After (MSW)
          </button>
        </div>
        <div
          ref="comparisonTrack"
          class="relative grid overflow-hidden rounded-lg border border-neutral-700 bg-[var(--vp-code-block-bg)] focus-within:outline focus-within:outline-2 focus-within:outline-offset-[3px] focus-within:outline-primary"
        >
          <div
            class="vp-doc relative z-0 min-w-0 bg-[var(--vp-code-block-bg)] [grid-area:1/1] [&_.language-js]:!m-0 [&_.language-js]:!h-full [&_.language-js]:!rounded-none [&_.language-js]:!border-0 [&_pre]:!whitespace-pre-wrap [&_pre]:![overflow-wrap:anywhere] [&_pre_code]:!whitespace-pre-wrap [&_pre_code]:![overflow-wrap:anywhere]"
          >
            <slot name="after" />
          </div>
          <div
            class="vp-doc relative z-[1] min-w-0 bg-[var(--vp-code-block-bg)] [clip-path:inset(0_calc(100%_-_var(--comparison-position))_0_0)] [grid-area:1/1] [&_.language-js]:!m-0 [&_.language-js]:!h-full [&_.language-js]:!rounded-none [&_.language-js]:!border-0 [&_pre]:!whitespace-pre-wrap [&_pre]:![overflow-wrap:anywhere] [&_pre_code]:!whitespace-pre-wrap [&_pre_code]:![overflow-wrap:anywhere]"
            :aria-hidden="comparisonPosition === 0"
          >
            <slot name="before" />
          </div>
          <div
            class="pointer-events-none absolute inset-y-0 left-[var(--comparison-position)] z-[3] w-0.5 -translate-x-1/2 bg-primary"
            aria-hidden="true"
          >
            <!-- The pseudo-element enlarges the touch target around the handle. -->
            <span
              class="pointer-events-auto absolute left-1/2 top-1/2 grid h-11 w-9 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize touch-none select-none place-items-center rounded-lg border border-primary bg-[var(--vp-c-bg-elv)] text-white before:absolute before:-inset-3 before:content-['']"
              @pointerdown="handleComparisonPointerDown"
              @pointermove="handleComparisonPointerMove"
              @pointerup="handleComparisonPointerUp"
              @pointercancel="handleComparisonPointerCancel"
              >↔</span
            >
          </div>
          <input
            v-model.number="comparisonPosition"
            class="absolute inset-0 z-[2] m-0 h-full w-full cursor-ew-resize opacity-0 [touch-action:pan-y]"
            :class="{ 'pointer-events-none': isComparisonInputInert }"
            type="range"
            min="0"
            max="100"
            aria-label="Compare jest.spyOn with MSW"
            :aria-valuetext="`${comparisonPosition}% before, ${100 - comparisonPosition}% after`"
          />
        </div>
        <p class="mt-3 text-[0.8125rem] text-neutral-400">
          Drag to compare, or choose Before / After. Both return the same user
          from <code>/api/user</code>.
        </p>
      </div>
      <div class="max-w-[720px] space-y-4">
        <p>
          Unified network definition, as revolutionary as it was, was just the
          beginning. In years that followed, MSW has brought web standards to
          your mocks so they become more powerful than ever and you have no
          proprietary APIs to learn. It iterated on the interception algorithm
          to keep the difference between the test and production as small as
          possible. It brought you the means to mock anything: from HTTP streams
          to GraphQL subscriptions.
        </p>
        <p>
          But, most importantly,
          <strong>it showed you that mocking can be ✨ beautiful ✨</strong>.
        </p>
      </div>
    </section>

    <section
      class="col-start-2 min-w-0 border-t border-neutral-800 py-14 sm:py-20"
      aria-labelledby="innovation-title"
    >
      <div class="max-w-[720px]">
        <h2 id="innovation-title">The network interception algorithms</h2>
        <div class="mt-4 space-y-4">
          <p>
            While MSW relies on the Service Worker API in the browser, Node.js
            needs a different approach. I spent the last eight years researching
            and developing the network interception algorithms that aim to
            achieve the impossible: let the requests actually happen while
            giving you control over their resolution. Something no other API
            mocking library has dared to do before or since.
          </p>
          <p>
            The result of my work is the
            <a
              class="text-primary underline underline-offset-[3px] [&_code]:text-[inherit]"
              href="https://github.com/mswjs/interceptors"
              target="_blank"
              rel="noopener noreferrer"
              ><code>@mswjs/interceptors</code></a
            >
            library that powers MSW, Nock, and many custom network mocking
            solutions in Node.js. This remains the most challenging project I've
            ever worked on and I'm glad to be able to share my hard work with
            the ecosystem in the open as well as see it recognized by grants
            from
            <a
              class="text-primary underline underline-offset-[3px]"
              href="https://github.com/microsoft/foss-fund"
              target="_blank"
              rel="noopener noreferrer"
              >Microsoft</a
            >
            and
            <a
              class="text-primary underline underline-offset-[3px]"
              href="https://engineering.atspotify.com/2024/11/congratulations-to-the-recipients-of-the-2024-spotify-foss-fund"
              target="_blank"
              rel="noopener noreferrer"
              >Spotify</a
            >.
          </p>
        </div>
      </div>
    </section>

    <section
      class="col-start-2 grid min-w-0 grid-cols-1 items-center gap-9 border-t border-neutral-800 py-14 sm:py-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-12"
      aria-labelledby="ecosystem-title"
    >
      <figure
        class="mx-auto w-[min(400px,100%)] min-w-0 -mb-16 -mt-32 lg:mx-0 lg:my-0 lg:w-auto"
      >
        <div
          class="vp-doc [--manifest-focus:calc(16px_+_6.5_*_var(--manifest-line-height))] [--manifest-line-height:2.25rem] [mask-image:linear-gradient(to_bottom,transparent_calc(var(--manifest-focus)_-_2.5_*_var(--manifest-line-height)),#000_calc(var(--manifest-focus)_-_0.5_*_var(--manifest-line-height)),#000_calc(var(--manifest-focus)_+_0.5_*_var(--manifest-line-height)),transparent_calc(var(--manifest-focus)_+_2.5_*_var(--manifest-line-height)))] [&_.lang]:hidden [&_.language-json]:!m-0 [&_.language-json]:!border-0 [&_.language-json]:!bg-transparent [&_.language-json]:[--vp-code-font-size:1.125rem] [&_.line-numbers-wrapper]:hidden [&_code_.highlighted]:!-mx-5 [&_code_.highlighted]:!w-[calc(100%_+_40px)] [&_code_.highlighted]:!border-l [&_code_.highlighted]:!border-primary [&_code_.highlighted]:!bg-[var(--vp-code-line-highlight-color)] [&_code_.highlighted]:!pl-[19px] [&_code_.highlighted]:!pr-5 [&_pre]:!bg-transparent [&_pre]:!px-0 [&_pre]:!py-4 [&_pre_code]:!px-5 [&_pre_code]:!leading-[2]"
        >
          <slot name="dependencies" />
        </div>
      </figure>
      <div class="min-w-0">
        <div class="max-w-[720px]">
          <h2 id="ecosystem-title">A dependency of your dependencies</h2>
          <p>
            You are benefiting from MSW even if it's not in your package.json.
            Countless open-source projects have adopted it for testing purposes
            as well as a part of their public APIs.
          </p>
        </div>
        <div class="mt-7">
          <article
            v-for="tool in ecosystem"
            :key="tool.name"
            class="grid grid-cols-1 gap-3 border-b border-neutral-800 py-6 last:border-b-0 last:pb-0 sm:grid-cols-[100px_minmax(0,1fr)] sm:gap-6"
          >
            <h3 class="m-0 text-lg leading-6">
              <a
                :href="tool.url"
                class="inline-flex items-center gap-2 hover:text-primary [&_svg]:h-4 [&_svg]:w-4"
                target="_blank"
                rel="noopener noreferrer"
                >{{ tool.name }} <ArrowUpRightIcon aria-hidden="true"
              /></a>
            </h3>
            <p class="max-w-[650px] text-neutral-400">{{ tool.description }}</p>
          </article>
        </div>
      </div>
    </section>

    <section
      class="col-start-2 min-w-0 border-t border-neutral-800 py-14 sm:py-20"
      aria-labelledby="independence-title"
    >
      <div class="max-w-[720px]">
        <h2 id="independence-title">Hugely independent</h2>
        <div class="space-y-4">
          <p>
            I've been offered funding to turn MSW into a startup. I've been
            offered life-changing money to have the project associated with
            certain companies. I've been given job opportunities that were,
            essentially, acquihires.
          </p>
          <p>
            This isn't bragging. Neither is this a cautionary tale of all the
            chances I've squandered.
          </p>
          <p>
            I just don't like talking about these things. One doesn't need to
            scream about his principles to have them. Mine are reflected in my
            work, which remains independent so I can always make decisions that
            are in the best interest of the developers relying on it.
          </p>
        </div>
      </div>
    </section>

    <section
      class="col-start-2 min-w-0 border-t border-neutral-800 py-14 sm:py-20"
      aria-labelledby="independence-title"
    >
      <div class="max-w-[720px]">
        <h2 id="independence-title">But, most importantly...</h2>
        <div class="space-y-4">
          <p>
            <strong>I genuinely love what I do</strong>. I've been working on
            MSW on weekends and holidays for years because I have the vision of
            what I want API mocking to be without the time to fully realize it.
          </p>

          <p>
            Since 2023, I began working on the project full-time. I believe my
            open-source work is the best way for me to make positive impact on
            the world. It wasn't an easy decision. I lose money every month, but
            I want to believe MSW will become susintable one day so I can pave
            the future of API mocking without worrying about rent or food.
          </p>
          <p>
            This is what I sincerely wish upon any open-source creator. This is
            what I want open-source to be: independent, sustainable, and
            infectiously inspiring.
          </p>
          <p>Thank you.</p>
        </div>
      </div>
    </section>

    <!-- The padding of the outer block frames the collage in the inner one. -->
    <section
      class="col-start-2 mb-14 min-w-0 rounded-2xl border border-black/20 p-4 shadow-2xl sm:p-10 sm:mb-20 [.dark_&]:border-[#fff]/10"
      aria-labelledby="closing-title"
    >
      <div
        class="relative overflow-hidden rounded-lg px-2 py-16 text-center sm:px-6 sm:py-32"
      >
        <!-- A collage of the current sponsors, faded out behind the content. -->
        <ul
          class="pointer-events-none absolute inset-0 m-0 grid list-none grid-cols-[repeat(auto-fill,minmax(2.5rem,1fr))] content-center gap-3 sm:grid-cols-[repeat(auto-fill,minmax(4rem,1fr))] sm:gap-4 p-0 [mask-image:radial-gradient(ellipse_at_center,transparent_50%,#000_110%)] sm:[mask-image:radial-gradient(ellipse_at_center,transparent_35%,#000_90%)]"
          aria-hidden="true"
        >
          <li v-for="(sponsor, index) in sponsorCollage" :key="index">
            <img
              :src="`/users/sponsors/${sponsor.login}.png`"
              alt=""
              width="64"
              height="64"
              loading="lazy"
              class="aspect-square w-full rounded-lg object-cover opacity-30 sm:rounded-xl"
            />
          </li>
        </ul>

        <div class="relative">
          <h2 id="closing-title">Become a sponsor</h2>
          <p class="mx-auto max-w-[36ch] text-lg text-neutral-400 text-balance">
            Contribute to the present and the future of API mocking on the web.
          </p>
          <div class="mt-10 flex justify-center">
            <a
              :href="sponsorUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="button inline-flex items-center justify-center gap-3 whitespace-nowrap bg-primary px-8 py-4 text-lg text-[#fff] hover:bg-primary/90 [&_svg]:h-6 [&_svg]:w-6"
              ><GitHubIcon aria-hidden="true" /> Sponsor on GitHub</a
            >
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
