<script setup lang="ts">
import { computed, ref } from 'vue'
import { ArrowUpRightIcon } from '@heroicons/vue/24/outline'
import GitHubIcon from '@mswjs/shared/theme/components/icons/github.vue'
import Avatar from '../components/Avatar.vue'
import MicrosoftIcon from '@mswjs/shared/theme/components/icons/microsoft.vue'
import GoogleIcon from '@mswjs/shared/theme/components/icons/google.vue'
import VercelIcon from '@mswjs/shared/theme/components/icons/vercel.vue'
import CloudflareIcon from '@mswjs/shared/theme/components/icons/cloudflare.vue'
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
const firstMonth = stats.monthlyDownloads[0]
const lastMonth = stats.monthlyDownloads[stats.monthlyDownloads.length - 1]
const downloadGrowth = Math.round(
  (lastMonth.downloads / firstMonth.downloads - 1) * 100,
)
const graphDescription = `Monthly npm downloads, March–August 2026: ${graphPoints.map((point) => `${point.label}: ${point.downloads.toLocaleString('en')}`).join('; ')}.`
const companies = [
  { name: 'Google', icon: GoogleIcon },
  { name: 'Microsoft', icon: MicrosoftIcon },
  { name: 'Vercel', icon: VercelIcon },
  { name: 'Cloudflare', icon: CloudflareIcon },
]
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
  <div class="sponsor-page">
    <header class="sponsor-intro" aria-labelledby="sponsor-title">
      <h1 id="sponsor-title" class="text-balance">
        An open letter from MSW creator
      </h1>
      <p>
        Over the past decade, Mock Service Worker has evolved from a prototype I
        built over the weekend to the foundational testing infrastructure
        powering the entire web. Sadly, it remains severely underfunded and a
        few sponsor cancelations away from becoming abandonware.
      </p>
      <p>
        Most of you don't even know that. When you see a successful open-source
        project, you probably imagine a team of people behind it toiling day and
        night to make it better. It seldom crosses your mind it's a single guy
        who barely makes the ends meet.
      </p>
      <p>
        The scariest part about this: <strong>I don't know what to do</strong>.
      </p>
      <p>
        I tried so many things over the years. I reached out to companies,
        struck deals, and turned down opportunities that would likely set me up
        for like but sacrified the quality and integrity of the project in the
        process. Sorry little of that bore any fruits. Although I've been
        <em>immensely</em> lucky to win grants, get sponsored, and secure
        partnerships with a number of incredible companies, that's barely enough
        to fund my work on the project, let alone establish something like a
        team.
      </p>
      <p>As it stands now, I don't see MSW having a future.</p>
      <p>I want that to change.</p>
      <p>
        I created this page as a reminder of how absurdly influential MSW is
        while remaining a sad epitome of the "random maintainer from Nebraska"
        meme, in hopes that that contrast inspires you (or, better, your
        company), to support the project. Thank you for reading this.
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

    <section class="sponsor-section" aria-label="MSW project statistics">
      <h1>Stats for nerds</h1>
      <dl class="impact-stats tabular-nums">
        <div>
          <dt>Total npm downloads</dt>
          <dd :title="stats.totalDownloads.toLocaleString('en')">
            {{ totalDownloads }}
          </dd>
          <figure class="download-chart">
            <svg
              class="download-graph"
              viewBox="0 0 280 100"
              role="img"
              :aria-label="graphDescription"
            >
              <path d="M8 88H272 M8 50H272 M8 12H272" class="graph-grid" />
              <polygon
                :points="`8,88 ${graphLine} 272,88`"
                class="graph-area"
              />
              <polyline :points="graphLine" class="graph-line" />
              <circle
                v-for="point in graphPoints"
                :key="point.label"
                :cx="point.x"
                :cy="point.y"
                r="3"
                class="graph-point"
              >
                <title>
                  {{ point.label }}:
                  {{ point.downloads.toLocaleString('en') }} downloads
                </title>
              </circle>
            </svg>
            <figcaption class="graph-summary">
              {{ downloadGrowth }}% growth in the past six months
            </figcaption>
          </figure>
        </div>
        <div>
          <dt>GitHub stars</dt>
          <dd>{{ githubStars }}</dd>
          <p>
            Thank you to everyone who’s starred the project and helped others
            discover it.
          </p>
          <a
            class="text-link"
            href="https://github.com/mswjs/msw"
            target="_blank"
            rel="noopener noreferrer"
            >View on GitHub <ArrowUpRightIcon aria-hidden="true"
          /></a>
        </div>
        <div>
          <dt>Repositories depend on MSW</dt>
          <dd>200,000+</dd>
          <p>On GitHub alone.</p>
        </div>
      </dl>
      <p class="stats-note tabular-nums">
        npm &amp; GitHub · September 8, 2026. Downloads through September 7.
      </p>
    </section>

    <section class="sponsor-companies" aria-label="Companies using MSW">
      <div class="companies-inner">
        <p class="companies-heading">In good company.</p>
        <p class="companies-description">
          Part of the everyday work at teams like these.
        </p>
        <div class="company-logos">
          <component
            v-for="company in companies"
            :key="company.name"
            :is="company.icon"
            role="img"
            :aria-label="company.name"
          />
        </div>
        <p class="open-source-note">
          From a side project to a global team.<br /><strong
            >Free and open-source for everyone.</strong
          >
        </p>
      </div>
    </section>

    <section
      class="sponsor-section sponsor-history"
      aria-labelledby="history-title"
    >
      <h2 id="history-title">Revolutionizing API mocking since 2018</h2>
      <div class="reading-width">
        <p>
          Before MSW, API mocks were often brittle and tied to a specific
          request client. A test would replace <code>fetch</code> or spy on
          Axios, then imitate just enough of its response to pass. Change your
          client, and the mock breaks—even when the API hasn’t changed at all.
        </p>
        <p>
          MSW moved mocks into their own layer. Describe what the API returns,
          let your application make its requests, and reuse those handlers
          wherever you need them. Client-agnostic, reusable mocks. The way it’s
          supposed to be.
        </p>
      </div>
      <div class="code-comparison" :style="comparisonStyle">
        <div class="comparison-labels">
          <button type="button" @click="comparisonPosition = 100">
            Before · jest.spyOn
          </button>
          <button type="button" @click="comparisonPosition = 0">
            After · MSW
          </button>
        </div>
        <div class="comparison-stage">
          <div class="comparison-code comparison-after vp-doc">
            <slot name="after" />
          </div>
          <div
            class="comparison-code comparison-before vp-doc"
            :aria-hidden="comparisonPosition === 0"
          >
            <slot name="before" />
          </div>
          <div class="comparison-divider" aria-hidden="true">
            <span>↔</span>
          </div>
          <input
            v-model.number="comparisonPosition"
            class="comparison-slider"
            type="range"
            min="0"
            max="100"
            aria-label="Compare jest.spyOn with MSW"
            :aria-valuetext="`${comparisonPosition}% before, ${100 - comparisonPosition}% after`"
          />
        </div>
        <p class="comparison-hint">
          Drag to compare, or choose Before / After. Both return the same user
          from <code>/api/user</code>.
        </p>
      </div>
      <div class="reading-width history-conclusion">
        <p>
          <strong>The response stays the same. The coupling disappears.</strong>
          The MSW handler doesn’t need to know whether your application uses
          Fetch, Axios, or something else. It intercepts the request without
          replacing the code that makes it.
        </p>
        <p>
          Write it once. Use it in your tests, local development, and Storybook.
          That separation changed API mocking from something you work around
          into something you can rely on.
        </p>
      </div>
    </section>

    <section class="sponsor-section" aria-labelledby="innovation-title">
      <div class="reading-width">
        <h2 id="innovation-title">
          Nearly a decade of research, openly conducted and shared.
        </h2>
        <p>
          Since 2018, we’ve researched how to intercept requests without cutting
          corners in the network stack. We publish that research so anyone can
          build their own MSW. That’s the spirit of open source: sharing the
          knowledge, not just the finished tool.
        </p>
        <p>
          We share that work through
          <a
            class="research-link"
            href="https://github.com/mswjs/interceptors"
            target="_blank"
            rel="noopener noreferrer"
            ><code>@mswjs/interceptors</code></a
          >. It’s the low-level interception library behind MSW and other tools,
          including Nock. A better algorithm here makes mocking better for
          everyone using it.
        </p>
        <p>
          This work has earned grants from
          <a
            class="research-link"
            href="https://github.com/microsoft/foss-fund"
            target="_blank"
            rel="noopener noreferrer"
            >Microsoft’s FOSS Fund</a
          >
          and
          <a
            class="research-link"
            href="https://engineering.atspotify.com/2024/11/congratulations-to-the-recipients-of-the-2024-spotify-foss-fund"
            target="_blank"
            rel="noopener noreferrer"
            >Spotify’s FOSS Fund</a
          >. We’re grateful for that support, and for the time it gives us to
          keep researching the hard problems.
        </p>
      </div>
    </section>

    <section
      class="sponsor-section dependency-layout"
      aria-labelledby="ecosystem-title"
    >
      <figure class="dependency-manifest">
        <div class="manifest-code vp-doc"><slot name="dependencies" /></div>
      </figure>
      <div class="dependency-content">
        <div class="reading-width">
          <h2 id="ecosystem-title">A dependency of your dependencies.</h2>
          <p>
            You might be benefiting from MSW without knowing it. It’s used to
            build and test libraries throughout the JavaScript
            ecosystem—including tools you probably have open right now.
          </p>
        </div>
        <div class="ecosystem-list">
          <article v-for="tool in ecosystem" :key="tool.name">
            <h3>
              <a :href="tool.url" target="_blank" rel="noopener noreferrer"
                >{{ tool.name }} <ArrowUpRightIcon aria-hidden="true"
              /></a>
            </h3>
            <p>{{ tool.description }}</p>
          </article>
        </div>
        <p class="reading-width">
          MSW brings these tools onto shared ground. Instead of each project
          solving network interception alone, we can improve it together. Your
          support reaches everyone building on that work.
        </p>
      </div>
    </section>

    <section
      class="sponsor-section sponsor-independence"
      aria-labelledby="independence-title"
    >
      <div class="independence-layout">
        <div>
          <p class="section-label">Independent by choice</p>
          <h2 id="independence-title">
            Big impact.<br /><span>Still a personal project.</span>
          </h2>
          <p>
            MSW has reached a scale—and a standard of quality—that most startups
            never reach. It’s proof of what a focused open-source project can
            do.
          </p>
          <p>
            Sponsorship helps us stay accountable to the people using MSW, with
            the freedom to do the work properly.
          </p>
        </div>
      </div>
      <div class="independence-principles" aria-label="Our commitments">
        <span>Independent</span><span>Openly governed</span
        ><span>MIT-licensed</span>
      </div>
    </section>

    <section
      class="sponsor-section sponsor-closing"
      aria-labelledby="closing-title"
    >
      <div class="closing-layout">
        <div>
          <p class="section-label">What comes next</p>
          <h2 id="closing-title">
            You won't believe it,<br />but we can do <em>better.</em>
          </h2>
          <p>
            If you’ve ever finished a test with MSW and thought “that was
            easier,” we’d appreciate your support. And if your team relies on it
            every day, consider asking whether your company can sponsor.
          </p>
        </div>
        <div class="time-for-work">
          <p class="time-heading">
            Your support gives us <strong>time.</strong>
          </p>
          <ol>
            <li>
              <span>01</span>
              <div>
                <strong>To go deeper.</strong>
                <p>
                  Research the network behavior that other tools work around.
                </p>
              </div>
            </li>
            <li>
              <span>02</span>
              <div>
                <strong>To get it right.</strong>
                <p>
                  Work through the difficult bugs and make MSW more reliable.
                </p>
              </div>
            </li>
            <li>
              <span>03</span>
              <div>
                <strong>To share what we learn.</strong>
                <p>
                  Write docs and examples that make the next person’s work
                  easier.
                </p>
              </div>
            </li>
          </ol>
        </div>
      </div>
      <div class="closing-invitation">
        <div>
          <h3>Become a sponsor</h3>
          <p class="sponsor-note">
            Support the present and the future of API mocking on the web by
            becoming our GitHub sponsor. Every contribution counts. Thank you!
          </p>
        </div>
        <a
          :href="sponsorUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="sponsor-button"
          ><GitHubIcon aria-hidden="true" /> Sponsor on GitHub
          <ArrowUpRightIcon aria-hidden="true"
        /></a>
      </div>
    </section>
  </div>
</template>

<style scoped>
.sponsor-page {
  display: grid;
  grid-template-columns: minmax(24px, 1fr) minmax(0, 1080px) minmax(24px, 1fr);
  font-size: 1rem;
  line-height: 1.75;
}
.sponsor-page > * {
  grid-column: 2;
  min-width: 0;
}
.sponsor-intro {
  max-width: 720px;
  padding-block: 80px;
}
.section-label {
  font-size: 0.875rem;
  color: var(--primary);
  font-weight: 500;
}
.sponsor-page h1 {
  margin: 20px 0 24px;
  font-size: clamp(2.4rem, 4.5vw, 3.5rem);
  line-height: 1.12;
  letter-spacing: -0.045em;
}
.sponsor-page p {
  color: var(--vp-c-text-2);
}
.sponsor-page p + p {
  margin-top: 16px;
}
.sponsor-page .sponsor-intro p {
  font-size: 1.125rem;
  color: var(--vp-c-text-1);
}
.sponsor-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-top: 24px;
  padding: 12px 18px;
  border: 1px solid var(--primary);
  border-radius: 8px;
  background: var(--vp-c-bg-elv);
  color: var(--vp-c-text-1);
  font-weight: 600;
  line-height: 1.5;
}
.sponsor-button:hover {
  background: rgb(var(--site-accent) / 8%);
}
.sponsor-button svg {
  width: 20px;
  height: 20px;
  color: var(--primary);
}
.sponsor-page a:focus-visible {
  outline: 2px solid var(--primary);
  outline-offset: 5px;
}
.sponsor-page .sponsor-note {
  margin-top: 12px;
  font-size: 0.8125rem;
}
.sponsor-section {
  padding-block: 80px;
  border-top: 1px solid var(--vp-c-divider);
}
.sponsor-page h2 {
  margin: 0 0 24px;
  font-size: clamp(1.6rem, 3vw, 2rem);
  line-height: 1.25;
  letter-spacing: -0.03em;
}
.impact-stats {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 36px;
  margin-top: 0;
}
.impact-stats > div {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.impact-stats > div + div {
  padding-left: 36px;
  border-left: 1px solid var(--vp-c-divider);
}
.impact-stats dt {
  margin-bottom: 12px;
  font-size: 1.125rem;
  font-weight: 600;
  line-height: 1.4;
  color: var(--vp-c-text-1);
}
.impact-stats dd {
  order: -1;
  margin-bottom: 2px;
  font-size: clamp(2.6rem, 5vw, 4rem);
  line-height: 1.1;
  font-weight: 600;
  letter-spacing: -0.05em;
  white-space: nowrap;
}
.impact-stats dd span {
  font-size: 1.5rem;
  letter-spacing: -0.025em;
}
.impact-stats p {
  font-size: 0.875rem;
}
.impact-stats .billion-note {
  color: var(--primary);
  font-size: 1rem;
}
.impact-stats a:hover,
.ecosystem-list a:hover {
  color: var(--primary);
}
.text-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-top: 16px;
  font-size: 1rem;
  font-weight: 600;
}
.text-link svg,
.ecosystem-list svg {
  width: 16px;
  height: 16px;
}
.maturity-note {
  display: block;
  margin-top: 16px;
  font-size: 0.8125rem;
}
.download-chart {
  width: 100%;
  margin-top: 20px;
}
.download-graph {
  display: block;
  width: 100%;
  overflow: visible;
}
.graph-grid {
  fill: none;
  stroke: var(--vp-c-divider);
  stroke-width: 1;
}
.graph-area {
  fill: rgb(var(--site-accent) / 8%);
}
.graph-line {
  fill: none;
  stroke: var(--primary);
  stroke-width: 2;
  stroke-linejoin: round;
  stroke-linecap: round;
}
.graph-point {
  fill: var(--primary);
}
.impact-stats .graph-summary {
  margin-top: 10px;
  font-size: 0.8125rem;
  color: var(--vp-c-text-1);
}
.stats-note {
  margin-top: 24px;
  font-size: 0.6875rem;
}
.sponsor-page > .sponsor-companies {
  grid-column: 1 / -1;
  padding-block: 80px;
  border-block: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-elv);
}
.companies-inner {
  text-align: center;
  width: min(1080px, 100% - 48px);
  margin-inline: auto;
}
.sponsor-companies + .sponsor-section {
  border-top: 0;
}
.company-logos {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  align-items: center;
  gap: 48px;
  max-width: 920px;
  margin: 36px auto;
  color: var(--vp-c-text-2);
}
.company-logos svg {
  width: 100%;
  height: auto;
  fill: currentColor;
}
.sponsor-page .companies-heading {
  font-size: 1.5rem;
  font-weight: 600;
  letter-spacing: -0.025em;
  color: var(--vp-c-text-1);
}
.sponsor-page .companies-description {
  margin-top: 6px;
  font-size: 0.9375rem;
}
.open-source-note {
  font-size: 0.875rem;
  line-height: 1.75;
}
.open-source-note strong {
  font-weight: 500;
  color: var(--vp-c-text-1);
}
.sponsor-independence .section-label {
  margin-bottom: 12px;
  color: var(--primary);
}
.reading-width {
  max-width: 720px;
}
.code-comparison {
  margin-block: 32px;
  max-width: 760px;
}
.comparison-labels {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 12px;
}
.comparison-labels button {
  font-weight: 600;
  font-size: 0.875rem;
}
.comparison-labels button:hover {
  color: var(--primary);
}
.comparison-stage {
  position: relative;
  display: grid;
  border: 1px solid var(--vp-c-border);
  border-radius: 8px;
  overflow: hidden;
  background: var(--vp-code-block-bg);
}
.comparison-code {
  position: relative;
  z-index: 0;
  grid-area: 1 / 1;
  min-width: 0;
  background: var(--vp-code-block-bg);
}
.comparison-before {
  z-index: 1;
  clip-path: inset(0 calc(100% - var(--comparison-position)) 0 0);
}
.comparison-code :deep(div[class*='language-']) {
  height: 100%;
  margin: 0;
  border: 0;
  border-radius: 0;
}
.comparison-code :deep(pre),
.comparison-code :deep(pre code) {
  white-space: pre-wrap;
  overflow-wrap: anywhere;
}
.comparison-divider {
  position: absolute;
  z-index: 3;
  inset-block: 0;
  left: var(--comparison-position);
  width: 2px;
  background: var(--primary);
  transform: translateX(-50%);
  pointer-events: none;
}
.comparison-divider span {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: grid;
  place-items: center;
  width: 36px;
  height: 44px;
  border: 1px solid var(--primary);
  border-radius: 8px;
  background: var(--vp-c-bg-elv);
  color: var(--vp-c-text-1);
}
.comparison-slider {
  position: absolute;
  z-index: 2;
  inset: 0;
  width: 100%;
  height: 100%;
  margin: 0;
  opacity: 0;
  cursor: ew-resize;
  touch-action: pan-y;
}
.comparison-stage:focus-within {
  outline: 2px solid var(--primary);
  outline-offset: 3px;
}
.comparison-hint {
  margin-top: 12px;
  font-size: 0.8125rem;
}
.research-link {
  color: var(--primary);
  text-decoration: underline;
  text-underline-offset: 3px;
}
.research-link code {
  color: inherit;
}
.history-conclusion strong {
  color: var(--vp-c-text-1);
}
.ecosystem-list {
  margin-block: 28px;
}
.ecosystem-list article {
  display: grid;
  grid-template-columns: 140px 1fr;
  gap: 24px;
  padding-block: 24px;
  border-bottom: 1px solid var(--vp-c-divider);
}
.sponsor-page .ecosystem-list h3 {
  margin: 0;
  font-size: 1.125rem;
  line-height: 1.5;
}
.ecosystem-list a {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}
.ecosystem-list p {
  max-width: 650px;
}
.dependency-layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 2fr);
  align-items: center;
  gap: 48px;
}
.dependency-manifest {
  min-width: 0;
}
.manifest-code {
  --manifest-line-height: 2.25rem;
  --manifest-focus: calc(16px + 6.5 * var(--manifest-line-height));
  mask-image: linear-gradient(
    to bottom,
    transparent calc(var(--manifest-focus) - 2.5 * var(--manifest-line-height)),
    #000 calc(var(--manifest-focus) - 0.5 * var(--manifest-line-height)),
    #000 calc(var(--manifest-focus) + 0.5 * var(--manifest-line-height)),
    transparent calc(var(--manifest-focus) + 2.5 * var(--manifest-line-height))
  );
}
.manifest-code :deep(div[class*='language-']) {
  margin: 0;
  border: 0;
  background: transparent;
  --vp-code-font-size: 1.125rem;
}
.manifest-code :deep(pre) {
  padding: 16px 0;
  background: transparent !important;
}
.manifest-code :deep(pre code) {
  padding-inline: 20px;
  line-height: 2;
}
.manifest-code :deep(code .highlighted) {
  margin-inline: -20px;
  padding-inline: 19px 20px;
  width: calc(100% + 40px);
  background: var(--vp-code-line-highlight-color);
  border-left: 1px solid var(--primary);
}
.manifest-code :deep(.line-numbers-wrapper),
.manifest-code :deep(.lang) {
  display: none;
}
.dependency-content {
  min-width: 0;
}
.dependency-content .ecosystem-list article {
  grid-template-columns: 100px minmax(0, 1fr);
}
.sponsor-closing {
  padding-bottom: 96px;
}
.independence-layout,
.independence-layout {
  max-width: 720px;
}
.closing-layout {
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  align-items: center;
  gap: 72px;
}
.sponsor-page .independence-layout h2,
.sponsor-page .closing-layout h2 {
  font-size: clamp(2rem, 3.4vw, 2.8rem);
  line-height: 1.15;
  letter-spacing: -0.04em;
}
.independence-layout h2 span {
  color: var(--vp-c-text-2);
}
.sponsor-section.sponsor-independence {
  padding-bottom: 32px;
}
.independence-principles {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  margin-top: 40px;
  padding-block: 20px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  background: var(--vp-c-bg-elv);
  font-size: 1rem;
  font-weight: 500;
}
.independence-principles span {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding-inline: 16px;
}
.independence-principles span + span {
  border-left: 1px solid var(--vp-c-divider);
}
.independence-principles span::before {
  content: '';
  width: 5px;
  height: 5px;
  flex-shrink: 0;
  border-radius: 50%;
  background: var(--primary);
}
.closing-layout {
  align-items: start;
}
.closing-layout em {
  font-style: normal;
  color: var(--primary);
}
.sponsor-page .time-heading {
  color: var(--vp-c-text-1);
  font-size: 1rem;
  line-height: 1.3;
}
.time-heading strong {
  display: block;
  margin-top: 8px;
  font-size: 4rem;
  font-weight: 500;
  letter-spacing: -0.065em;
}
.time-for-work ol {
  margin-top: 24px;
  list-style: none;
}
.time-for-work li {
  display: flex;
  gap: 20px;
  padding-block: 18px;
  border-top: 1px solid var(--vp-c-divider);
}
.time-for-work li > span {
  padding-top: 4px;
  font-family: var(--vp-font-family-mono);
  color: var(--primary);
  font-size: 0.75rem;
}
.time-for-work li strong {
  font-weight: 600;
}
.time-for-work li p {
  margin-top: 4px;
  font-size: 0.875rem;
  line-height: 1.6;
}
.closing-invitation {
  display: grid;
  grid-template-columns: minmax(0, 52ch) auto;
  justify-content: space-between;
  align-items: center;
  gap: 64px;
  margin-top: 40px;
  padding: 40px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg-elv);
}
.sponsor-page .closing-invitation h3 {
  margin: 0;
  line-height: 1.25;
  color: var(--vp-c-text-1);
  font-size: 1.5rem;
  font-weight: 600;
}
.closing-invitation .sponsor-button {
  margin-top: 0;
  justify-self: end;
  white-space: nowrap;
}
.sponsor-page .closing-invitation .sponsor-note {
  margin-top: 12px;
  font-size: 1rem;
  line-height: 1.65;
  text-wrap: pretty;
}
@media (max-width: 800px) {
  .dependency-layout {
    grid-template-columns: 1fr;
    gap: 36px;
  }
  .dependency-manifest {
    width: min(400px, 100%);
    margin-inline: auto;
  }
  .independence-layout,
  .closing-layout {
    grid-template-columns: 1fr;
    gap: 36px;
  }

  .closing-invitation {
    grid-template-columns: 1fr;
    gap: 24px;
    padding: 28px;
  }
  .closing-invitation .sponsor-button {
    justify-self: start;
  }
  .impact-stats {
    gap: 20px;
  }
  .impact-stats > div + div {
    padding-left: 20px;
  }
  .impact-stats dd {
    font-size: 2.6rem;
  }
}
@media (max-width: 600px) {
  .independence-principles {
    grid-template-columns: 1fr;
    padding: 0 20px;
  }
  .independence-principles span {
    justify-content: flex-start;
    padding: 14px 0;
  }
  .independence-principles span + span {
    border-left: 0;
    border-top: 1px solid var(--vp-c-divider);
  }
  .sponsor-page {
    grid-template-columns: 20px minmax(0, 1fr) 20px;
  }
  .sponsor-intro {
    padding-block: 48px 56px;
  }
  .sponsor-section {
    padding-block: 56px;
  }
  .impact-stats {
    grid-template-columns: 1fr;
    gap: 28px;
  }
  .impact-stats > div + div {
    padding: 28px 0 0;
    border-left: 0;
    border-top: 1px solid var(--vp-c-divider);
  }
  .impact-stats dt {
    min-height: 0;
    margin-bottom: 12px;
  }
  .impact-stats dd {
    font-size: 3.5rem;
  }
  .download-chart {
    max-width: 240px;
  }
  .sponsor-page > .sponsor-companies {
    padding-block: 56px;
  }
  .company-logos {
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
    max-width: 400px;
    margin-block: 28px;
  }
  .ecosystem-list article,
  .dependency-content .ecosystem-list article {
    grid-template-columns: 1fr;
    gap: 12px;
  }
}
</style>
