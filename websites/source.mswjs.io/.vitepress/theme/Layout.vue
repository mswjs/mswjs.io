<script setup lang="ts">
import { computed } from 'vue'
import DefaultTheme from 'vitepress/theme'
import { useData, useRoute } from 'vitepress'
import SiteFooter from '@mswjs/shared/theme/components/SiteFooter.vue'
import FooterSection from '@mswjs/shared/theme/components/FooterSection.vue'
import DocsPageHeader from '@mswjs/shared/theme/docs/DocsPageHeader.vue'
import { useOutlineAutoScroll } from '@mswjs/shared/theme/composables/useOutlineAutoScroll'
import DocsSidebarLinks from '@mswjs/shared/theme/docs/DocsSidebarLinks.vue'
import DocsSidebarPartners from '@mswjs/shared/theme/docs/DocsSidebarPartners.vue'
import Ads from '@mswjs/shared/theme/docs/Ads.vue'

const { page, theme } = useData()
const route = useRoute()

useOutlineAutoScroll()

const isDocsPage = computed(() => {
  return route.path.startsWith('/docs') && !page.value.isNotFound
})
</script>

<template>
  <DefaultTheme.Layout>
    <template #doc-before>
      <template v-if="isDocsPage">
        <DocsPageHeader />
        <Ads v-if="theme.ads" publisher="mswjsio" />
      </template>
    </template>

    <template #aside-outline-after>
      <div class="aside-extras shrink-0 space-y-8 text-sm font-medium text-neutral-400">
        <DocsSidebarLinks
          :git-hub-url="theme.docsLinks.gitHubUrl"
          :blog-url="theme.docsLinks.blogUrl"
        />
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
                <li><a href="/">Home</a></li>
                <li><a href="/docs">Documentation</a></li>
                <li>
                  <a href="https://mswjs.io/blog" target="_blank">Blog</a>
                </li>
              </FooterSection>
            </div>

            <div class="sm:col-span-2">
              <FooterSection title="Resources">
                <li><a href="/docs/getting-started">Getting started</a></li>
                <li>
                  <a href="/docs/integrations/har">Network archive (HAR)</a>
                </li>
                <li>
                  <a href="/docs/integrations/open-api">OpenAPI (Swagger)</a>
                </li>
              </FooterSection>
            </div>

            <div class="sm:col-span-2">
              <FooterSection title="Community">
                <li>
                  <a href="https://github.com/mswjs/source" target="_blank"
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
