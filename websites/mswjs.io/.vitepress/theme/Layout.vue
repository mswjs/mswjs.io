<script setup lang="ts">
import { computed, onMounted, watchEffect } from 'vue'
import DefaultTheme from 'vitepress/theme'
import { useData, useRoute } from 'vitepress'
import SiteFooter from '@mswjs/shared/theme/components/SiteFooter.vue'
import FooterSection from '@mswjs/shared/theme/components/FooterSection.vue'
import ReactIsland from '@mswjs/shared/theme/components/ReactIsland.vue'
import DocsPageHeader from '@mswjs/shared/theme/docs/DocsPageHeader.vue'
import { useOutlineAutoScroll } from '@mswjs/shared/theme/composables/useOutlineAutoScroll'
import DocsSidebarPartners from '@mswjs/shared/theme/docs/DocsSidebarPartners.vue'
import Ads from '@mswjs/shared/theme/docs/Ads.vue'
import { FeedbackWidget } from '@mswjs/shared/theme/react/feedbackWidget'
import BlogPostHeader from './blog/BlogPostHeader.vue'
import { useSidebarAutoScroll } from '@mswjs/shared/theme/composables/useSidebarAutoScroll'

const { page, frontmatter, theme } = useData()
const route = useRoute()

useOutlineAutoScroll()
useSidebarAutoScroll()

const isDocsPage = computed(() => {
  return route.path.startsWith('/docs') && !page.value.isNotFound
})

const isBlogPost = computed(() => {
  return route.path.startsWith('/blog/') && !page.value.isNotFound
})

const feedbackPageTitle = computed(() => {
  return frontmatter.value.displayTitle || frontmatter.value.title
})

// Right-clicking the logo leads to the Branding page.
onMounted(() => {
  const logoLink = document.querySelector('.VPNavBarTitle a')

  logoLink?.addEventListener('contextmenu', (event) => {
    event.preventDefault()
    location.href = '/branding'
  })
})

// Offset the fixed navbar and sidebar by the height of the
// "MSW 1.x" banner, shown on docs pages only.
watchEffect(() => {
  if (typeof document !== 'undefined') {
    document.documentElement.style.setProperty(
      '--vp-layout-top-height',
      isDocsPage.value ? '36px' : '0px',
    )
  }
})
</script>

<template>
  <DefaultTheme.Layout>
    <template #layout-top>
      <aside
        v-if="isDocsPage"
        class="docs-version-banner fixed top-0 inset-x-0 z-[60] flex items-center justify-center h-[36px] px-5 border-b border-neutral-700 bg-neutral-950 text-neutral-200 text-sm text-center font-medium"
      >
        <p>
          You are viewing the docs for <strong>MSW 2.0</strong>. To access the
          1.x docs
          <a
            href="https://v1.mswjs.io/"
            class="text-primary hover:underline"
            target="_blank"
            rel="noopener noreferrer"
            >click here</a
          >.
        </p>
      </aside>
    </template>

    <template #doc-before>
      <template v-if="isDocsPage">
        <DocsPageHeader />
        <Ads v-if="theme.ads" publisher="mswjsio" />
      </template>
      <BlogPostHeader v-if="isBlogPost" />
    </template>

    <template #doc-after>
      <ClientOnly v-if="isDocsPage">
        <ReactIsland
          :component="FeedbackWidget"
          :component-props="{ pageTitle: feedbackPageTitle }"
        />
      </ClientOnly>
    </template>

    <template #aside-outline-after>
      <div class="aside-extras shrink-0 space-y-8 text-sm font-medium text-neutral-400">
        <div>
          <h4 class="mb-2 text-xs font-bold tracking-widest text-white uppercase">
            Partners
          </h4>
          <DocsSidebarPartners />
        </div>
      </div>
    </template>

    <template #layout-bottom>
      <div class="site-footer" :class="{ 'footer-with-sidebar': isDocsPage }">
        <SiteFooter>
          <template #sections>
            <div class="sm:col-span-2">
              <FooterSection title="Library">
                <li><a href="/docs">Documentation</a></li>
                <li><a href="/branding">Branding</a></li>
                <li><a href="/blog" target="_blank">Blog</a></li>
              </FooterSection>
            </div>

            <div class="sm:col-span-2">
              <FooterSection title="Resources">
                <li><a href="/docs/quick-start">Quick start</a></li>
                <li><a href="/docs/best-practices">Best practices</a></li>
                <li>
                  <a href="https://github.com/mswjs/examples" target="_blank"
                    >Examples</a
                  >
                </li>
              </FooterSection>
            </div>

            <div class="sm:col-span-2">
              <FooterSection title="Community">
                <li>
                  <a href="https://github.com/mswjs/msw" target="_blank"
                    >GitHub</a
                  >
                </li>
                <li>
                  <a href="https://twitter.com/ApiMocking" target="_blank"
                    >Twitter</a
                  >
                </li>
                <li>
                  <a href="https://kettanaito.com/discord" target="_blank"
                    >Discord</a
                  >
                </li>
              </FooterSection>
            </div>
          </template>
        </SiteFooter>
      </div>
    </template>
  </DefaultTheme.Layout>
</template>
