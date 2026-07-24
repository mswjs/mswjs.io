<script setup lang="ts">
import { computed } from 'vue'
import { useData, useRoute } from 'vitepress'
import SiteHeader from '@mswjs/shared/theme/components/SiteHeader.vue'
import SiteFooter from '@mswjs/shared/theme/components/SiteFooter.vue'
import FooterSection from '@mswjs/shared/theme/components/FooterSection.vue'
import DocsLayout from '@mswjs/shared/theme/docs/DocsLayout.vue'
import NotFoundPage from '@mswjs/shared/theme/pages/NotFoundPage.vue'
import HomePage from './home/HomePage.vue'
import sourceLogo from '../../src/images/source.svg'

const { page, frontmatter } = useData()
const route = useRoute()

const isDocsPage = computed(() => {
  return route.path.startsWith('/docs') && !page.value.isNotFound
})

const pageKind = computed(() => {
  if (page.value.isNotFound) {
    return 'not-found'
  }

  if (frontmatter.value.layout === 'home') {
    return 'home'
  }

  if (route.path.startsWith('/docs')) {
    return 'docs'
  }

  return 'page'
})
</script>

<template>
  <SiteHeader :logo="sourceLogo" :compact="isDocsPage" />

  <main>
    <NotFoundPage v-if="pageKind === 'not-found'" />
    <HomePage v-else-if="pageKind === 'home'" />
    <DocsLayout v-else-if="pageKind === 'docs'" />
    <Content v-else />
  </main>

  <SiteFooter :compact="isDocsPage">
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
            <a href="https://github.com/mswjs/source" target="_blank">GitHub</a>
          </li>
          <li>
            <a href="https://twitter.com/ApiMocking" target="_blank">Twitter</a>
          </li>
          <li>
            <a href="https://kettanaito.com/discord" target="_blank">Discord</a>
          </li>
        </FooterSection>
      </div>
    </template>
  </SiteFooter>
</template>
