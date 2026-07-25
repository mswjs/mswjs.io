<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'
import type { DefaultTheme } from 'vitepress/theme'
import DocsPageHeader from '@mswjs/shared/theme/docs/DocsPageHeader.vue'
import DocsSidebarPartners from '@mswjs/shared/theme/docs/DocsSidebarPartners.vue'
import Ads from '@mswjs/shared/theme/docs/Ads.vue'
import ReactIsland from '@mswjs/shared/theme/components/ReactIsland.vue'
import { FeedbackWidget } from '@mswjs/shared/theme/react/feedbackWidget'
import BlogPostHeader from '../blog/BlogPostHeader.vue'
import type { DocumentOutlineItem } from '../composables/useDocumentOutline'
import DocumentFooter from './DocumentFooter.vue'
import DocumentOutline from './DocumentOutline.vue'

const props = defineProps<{
  documentationPage: boolean
  blogPost: boolean
  outlineItems: Array<DocumentOutlineItem>
  activeOutlineLink: string | null
}>()

const { frontmatter, theme } = useData<DefaultTheme.Config>()
const feedbackPageTitle = computed(() => {
  return frontmatter.value.displayTitle || frontmatter.value.title
})
</script>

<template>
  <div
    class="w-full px-6 pb-24 md:px-8 md:pb-32"
    :class="{
      'pt-2': blogPost,
      'pt-8 md:pt-12': !blogPost,
      'min-[960px]:pl-16 min-[960px]:pr-8': documentationPage,
    }"
  >
    <div
      class="mx-auto grid w-full min-w-0"
      :class="{
        'lg:grid-cols-[minmax(0,1fr)_14rem] lg:gap-16':
          documentationPage,
        'max-w-[1104px] min-[1280px]:grid-cols-[minmax(0,784px)_14rem] min-[1280px]:gap-16':
          !documentationPage,
      }"
    >
      <main
        id="main-content"
        class="min-w-0"
        :class="{
          'max-w-[784px]': !documentationPage,
        }"
      >
        <template v-if="documentationPage">
          <DocsPageHeader />
          <Ads v-if="theme.ads" publisher="mswjsio" />
        </template>
        <BlogPostHeader v-if="blogPost" />

        <Content
          data-document-content
          class="vp-doc"
          :class="{
            'external-link-icon-enabled': theme.externalLinkIcon,
          }"
        />

        <DocumentFooter />

        <ClientOnly v-if="documentationPage">
          <ReactIsland
            :component="FeedbackWidget"
            :component-props="{ pageTitle: feedbackPageTitle }"
          />
        </ClientOnly>
      </main>

      <aside
        v-if="documentationPage"
        class="hidden min-h-0 lg:block"
      >
        <div
          class="sticky top-[calc(var(--site-layout-top-height)+4rem+0.75rem)] grid max-h-[calc(100vh-var(--site-layout-top-height)-4rem-0.75rem)] min-h-0 grid-rows-[minmax(0,auto)_auto]"
        >
          <DocumentOutline
            class="hidden min-[1280px]:block"
            :items="outlineItems"
            :active-link="activeOutlineLink"
          />

          <div
            class="pt-8 text-sm font-medium text-neutral-400"
            :class="{
              'min-[1280px]:pt-8': outlineItems.length > 0,
            }"
          >
            <h2
              class="mb-2 text-xs font-bold uppercase tracking-widest text-white"
            >
              Partners
            </h2>
            <DocsSidebarPartners />
          </div>
        </div>
      </aside>
    </div>
  </div>
</template>
