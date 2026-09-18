<script setup lang="ts">
import { computed, ref } from 'vue'
import { ArrowUpRightIcon } from '@heroicons/vue/24/outline'
import GitHubIcon from '@mswjs/shared/theme/components/icons/github.vue'
import Avatar from '../components/Avatar.vue'
import stats from './sponsor-stats.json'

const sponsorUrl = 'https://github.com/sponsors/mswjs'
const totalDownloads = new Intl.NumberFormat('en', {
  notation: 'compact',
  maximumFractionDigits: 2,
}).format(stats.totalDownloads)
const githubStars = new Intl.NumberFormat('en').format(stats.githubStars)
const comparisonPosition = ref(50)
const comparisonStyle = computed(() => ({
  '--comparison-position': `${comparisonPosition.value}%`,
}))
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
const ecosystem = [
  {
    name: 'Nock',
    description:
      'Yes, Nock uses MSW’s interception layer. Two established mocking tools now share the same foundation, so improvements in network interception benefit both communities.',
    url: 'https://github.com/nock/nock',
  },
  {
    name: 'Vitest',
    description:
      'MSW powers browser module interception in Vitest’s mocker. It’s also the tool Vitest recommends for mocking network requests.',
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
      class="col-start-2 min-w-0 max-w-[720px] pb-14 pt-12 sm:py-20"
      aria-labelledby="sponsor-title"
    >
      <h1
        id="sponsor-title"
        class="mb-6 mt-5 text-[clamp(2.4rem,4.5vw,3.5rem)] leading-[1.12] tracking-[-0.045em] text-balance"
      >
        An open letter from MSW creator
      </h1>
      <p class="text-lg text-white">
        Over the past decade, Mock Service Worker has evolved from a prototype I
        built over the weekend to the foundational testing infrastructure
        powering the entire web. Sadly, it remains severely underfunded and a
        few sponsor cancelations away from becoming abandonware.
      </p>
      <p class="mt-4 text-lg text-white">
        Most of you probably don't know that. When you see a successful
        open-source project, you imagine a team of people toiling day and night
        to make it better. It seldom crosses your mind it might be a single guy
        who barely makes the ends meet.
      </p>
      <p class="mt-4 text-lg text-white">
        The scariest part about this: <strong>I don't know what to do</strong>.
      </p>
      <p class="mt-4 text-lg text-white">
        I tried so many things over the years. I reached out to companies,
        struck deals, and turned down opportunities that would likely set me up
        for life but sacrified the quality and integrity of the project in the
        process. Sorry little of that bore any fruits. Although I've been
        <em>immensely</em> lucky to win grants, get sponsored, and secure
        partnerships with a number of incredible companies, that's barely enough
        to fund my work on the project, let alone establish something akin to a
        team.
      </p>
      <p class="mt-4 text-lg text-white">
        As it stands now, I don't see MSW having a future.
      </p>
      <p class="mt-4 text-lg text-white">I want that to change.</p>
      <p class="mt-4 text-lg text-white">
        I created this page as a reminder of how absurdly influential MSW is
        while remaining a sad epitome of the "random maintainer from Nebraska"
        meme, in hopes that that contrast inspires you (or, better, your
        company), to support the project. Please read this, it won't take much
        of your time. Thank you.
      </p>
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
            href="https://twitter.com/kettanaito"
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
      <h1
        class="mb-6 mt-5 text-[clamp(2.4rem,4.5vw,3.5rem)] leading-[1.12] tracking-[-0.045em]"
      >
        Stats for nerds
      </h1>
      <p class="-mt-3 mb-8 text-sm text-neutral-400">As of {{ asOfDate }}</p>
      <dl
        class="grid grid-cols-1 gap-7 tabular-nums sm:grid-cols-3 sm:gap-5 md:gap-9"
      >
        <div class="flex flex-col items-start">
          <dt class="mb-3 text-lg font-semibold leading-[1.4] text-white">
            Total npm downloads
          </dt>
          <dd
            class="order-first mb-0.5 whitespace-nowrap text-[3.5rem] font-semibold leading-[1.1] tracking-[-0.05em] sm:text-[2.6rem] md:text-[clamp(2.6rem,5vw,4rem)]"
            :title="stats.totalDownloads.toLocaleString('en')"
          >
            {{ totalDownloads }}
          </dd>
          <figure class="mt-5 w-full max-w-[240px] sm:max-w-none">
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
          <p class="mt-5 text-sm text-neutral-400">
            That's more than Svelte, Angular, SolidJS, and Astro
            <strong>combined</strong>, every month.
          </p>
        </div>
        <div
          class="flex flex-col items-start border-t border-neutral-800 pt-7 sm:border-l sm:border-t-0 sm:pl-5 sm:pt-0 md:pl-9"
        >
          <dt class="mb-3 text-lg font-semibold leading-[1.4] text-white">
            GitHub stars
          </dt>
          <dd
            class="order-first mb-0.5 whitespace-nowrap text-[3.5rem] font-semibold leading-[1.1] tracking-[-0.05em] sm:text-[2.6rem] md:text-[clamp(2.6rem,5vw,4rem)]"
          >
            {{ githubStars }}
          </dd>
          <p class="text-sm text-neutral-400">
            That's an absurd number of developers who liked MSW and went to
            introduce it to their team.
          </p>
        </div>
        <div
          class="flex flex-col items-start border-t border-neutral-800 pt-7 sm:border-l sm:border-t-0 sm:pl-5 sm:pt-0 md:pl-9"
        >
          <dt class="mb-3 text-lg font-semibold leading-[1.4] text-white">
            Repositories depend on MSW
          </dt>
          <dd
            class="order-first mb-0.5 whitespace-nowrap text-[3.5rem] font-semibold leading-[1.1] tracking-[-0.05em] sm:text-[2.6rem] md:text-[clamp(2.6rem,5vw,4rem)]"
          >
            200,000+
          </dd>
          <p class="text-sm text-neutral-400">
            And that's only counting public repositories on GitHub. It's faster
            to point out who from the Fortune 500 companies doesn't use MSW than
            listing everyone who does.
          </p>
        </div>
      </dl>
      <div class="mt-10 max-w-[720px] tabular-nums"></div>
    </section>

    <section
      class="col-start-2 min-w-0 border-t border-neutral-800 py-14 sm:py-20"
      aria-labelledby="history-title"
    >
      <h2
        id="history-title"
        class="mb-6 mt-0 text-[clamp(1.6rem,3vw,2rem)] leading-[1.25] tracking-[-0.03em]"
      >
        Changing the game since 2018
      </h2>
      <div class="max-w-[720px] space-y-4">
        <p class="">
          Do you know when was the last day API mocking was tedious? It's
          November 17th, 2018. Because the very next day, the first version of
          MSW got released. And it nothing short of changed the game.
        </p>
        <p>
          Before that time, mocking was in a bad place. You spied on the request
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
            <span
              class="absolute left-1/2 top-1/2 grid h-11 w-9 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-lg border border-primary bg-[var(--vp-c-bg-elv)] text-white"
              >↔</span
            >
          </div>
          <input
            v-model.number="comparisonPosition"
            class="absolute inset-0 z-[2] m-0 h-full w-full cursor-ew-resize opacity-0 [touch-action:pan-y]"
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
          <strong>it showed you that mocking can be beautiful</strong>.
        </p>
      </div>
    </section>

    <section
      class="col-start-2 min-w-0 border-t border-neutral-800 py-14 sm:py-20"
      aria-labelledby="innovation-title"
    >
      <div class="max-w-[720px]">
        <h2
          id="innovation-title"
          class="mb-6 mt-0 text-[clamp(1.6rem,3vw,2rem)] leading-[1.25] tracking-[-0.03em]"
        >
          A decade of research for everyone's benefit.
        </h2>
        <p class="mt-4">
          <a
            class="text-primary underline underline-offset-[3px] [&_code]:text-[inherit]"
            href="https://github.com/mswjs/interceptors"
            target="_blank"
            rel="noopener noreferrer"
            ><code>@mswjs/interceptors</code></a
          >, which is the library powering the network interception in Node.js,
          remains my most challenging project to date. That difficulty is,
          mostly, self-inflicted because I want to achieve the impossible: let
          the requests happen while simultaneously giving you control over their
          resolution.
        </p>
        <p class="mt-4">
          That's not a contradictory statement, and I've spent the last decade
          proving that.
        </p>
        <p class="mt-4">
          My work on the interception algorithms has been recognized by grants
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
          >, as well as other API mocking libraries, like Nock, that have
          adopted those same algorithms so everyone has the best in class
          interception even if they don't use MSW directly.
        </p>
      </div>
    </section>

    <section
      class="col-start-2 grid min-w-0 grid-cols-1 items-center gap-9 border-t border-neutral-800 py-14 sm:py-20 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-12"
      aria-labelledby="ecosystem-title"
    >
      <figure class="mx-auto w-[min(400px,100%)] min-w-0 md:mx-0 md:w-auto">
        <div
          class="vp-doc [--manifest-focus:calc(16px_+_6.5_*_var(--manifest-line-height))] [--manifest-line-height:2.25rem] [mask-image:linear-gradient(to_bottom,transparent_calc(var(--manifest-focus)_-_2.5_*_var(--manifest-line-height)),#000_calc(var(--manifest-focus)_-_0.5_*_var(--manifest-line-height)),#000_calc(var(--manifest-focus)_+_0.5_*_var(--manifest-line-height)),transparent_calc(var(--manifest-focus)_+_2.5_*_var(--manifest-line-height)))] [&_.lang]:hidden [&_.language-json]:!m-0 [&_.language-json]:!border-0 [&_.language-json]:!bg-transparent [&_.language-json]:[--vp-code-font-size:1.125rem] [&_.line-numbers-wrapper]:hidden [&_code_.highlighted]:!-mx-5 [&_code_.highlighted]:!w-[calc(100%_+_40px)] [&_code_.highlighted]:!border-l [&_code_.highlighted]:!border-primary [&_code_.highlighted]:!bg-[var(--vp-code-line-highlight-color)] [&_code_.highlighted]:!pl-[19px] [&_code_.highlighted]:!pr-5 [&_pre]:!bg-transparent [&_pre]:!px-0 [&_pre]:!py-4 [&_pre_code]:!px-5 [&_pre_code]:!leading-[2]"
        >
          <slot name="dependencies" />
        </div>
      </figure>
      <div class="min-w-0">
        <div class="max-w-[720px]">
          <h2
            id="ecosystem-title"
            class="mb-6 mt-0 text-[clamp(1.6rem,3vw,2rem)] leading-[1.25] tracking-[-0.03em]"
          >
            A dependency of your dependencies.
          </h2>
          <p class="text-neutral-400">
            Speaking of not using MSW directly... You're likely benefitting from
            it, too, even if this the first time you hear about its existence.
            MSW widely adopted by countless open-source projects, both for
            internal testing and as as part of their public APIs.
          </p>
        </div>
        <div class="my-7">
          <article
            v-for="tool in ecosystem"
            :key="tool.name"
            class="grid grid-cols-1 gap-3 border-b border-neutral-800 py-6 sm:grid-cols-[100px_minmax(0,1fr)] sm:gap-6"
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
      class="col-start-2 min-w-0 border-t border-neutral-800 pb-8 pt-14 sm:pt-20"
      aria-labelledby="independence-title"
    >
      <div class="max-w-[720px]">
        <h2
          id="independence-title"
          class="mb-6 mt-0 text-[clamp(2rem,3.4vw,2.8rem)] leading-[1.15] tracking-[-0.04em]"
        >
          Hugely independent.
        </h2>
        <p class="mb-4">
          I've been offered funding to turn MSW into a startup. I've been
          offered life-changing money to have the project associated with
          certain companies. I've been given job opportunities that were,
          essentially, acquihires.
        </p>
        <p class="mb-4">
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
    </section>

    <section
      class="col-start-2 min-w-0 border-t border-neutral-800 pb-24 pt-14 sm:pt-20"
      aria-labelledby="closing-title"
    >
      <div
        class="grid grid-cols-1 items-start gap-9 md:grid-cols-[1.1fr_1fr] md:gap-[72px]"
      >
        <div>
          <p class="text-sm font-medium text-primary">What comes next</p>
          <h2
            id="closing-title"
            class="mb-6 mt-0 text-[clamp(2rem,3.4vw,2.8rem)] leading-[1.15] tracking-[-0.04em]"
          >
            You won't believe it,<br />but we can do
            <em class="not-italic text-primary">better.</em>
          </h2>
          <p class="text-neutral-400">
            If you’ve ever finished a test with MSW and thought “that was
            easier,” we’d appreciate your support. And if your team relies on it
            every day, consider asking whether your company can sponsor.
          </p>
        </div>
        <div>
          <p class="text-base leading-[1.3] text-white">
            Your support gives us
            <strong
              class="mt-2 block text-[4rem] font-medium tracking-[-0.065em]"
              >time.</strong
            >
          </p>
          <ol class="mt-6 list-none">
            <li class="flex gap-5 border-t border-neutral-800 py-[18px]">
              <span class="pt-1 font-mono text-xs text-primary">01</span>
              <div>
                <strong class="font-semibold">To go deeper.</strong>
                <p class="mt-1 text-sm leading-relaxed text-neutral-400">
                  Research the network behavior that other tools work around.
                </p>
              </div>
            </li>
            <li class="flex gap-5 border-t border-neutral-800 py-[18px]">
              <span class="pt-1 font-mono text-xs text-primary">02</span>
              <div>
                <strong class="font-semibold">To get it right.</strong>
                <p class="mt-1 text-sm leading-relaxed text-neutral-400">
                  Work through the difficult bugs and make MSW more reliable.
                </p>
              </div>
            </li>
            <li class="flex gap-5 border-t border-neutral-800 py-[18px]">
              <span class="pt-1 font-mono text-xs text-primary">03</span>
              <div>
                <strong class="font-semibold">To share what we learn.</strong>
                <p class="mt-1 text-sm leading-relaxed text-neutral-400">
                  Write docs and examples that make the next person’s work
                  easier.
                </p>
              </div>
            </li>
          </ol>
        </div>
      </div>
      <div
        class="mt-10 grid grid-cols-1 items-center gap-6 rounded-xl border border-neutral-800 bg-[var(--vp-c-bg-elv)] p-7 md:grid-cols-[minmax(0,52ch)_auto] md:justify-between md:gap-16 md:p-10"
      >
        <div>
          <h3 class="m-0 text-2xl font-semibold leading-[1.25] text-white">
            Become a sponsor
          </h3>
          <p class="mt-3 text-base leading-[1.65] text-neutral-400 text-pretty">
            Support the present and the future of API mocking on the web by
            becoming our GitHub sponsor. Every contribution counts. Thank you!
          </p>
        </div>
        <a
          :href="sponsorUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center justify-center gap-3 justify-self-start whitespace-nowrap rounded-lg border border-primary bg-[var(--vp-c-bg-elv)] px-[18px] py-3 font-semibold leading-6 text-white hover:bg-primary/[0.08] md:justify-self-end [&_svg]:h-5 [&_svg]:w-5 [&_svg]:text-primary"
          ><GitHubIcon aria-hidden="true" /> Sponsor on GitHub
          <ArrowUpRightIcon aria-hidden="true"
        /></a>
      </div>
    </section>
  </div>
</template>
