<script setup lang="ts">
import { computed } from 'vue'
import { useData, useRoute } from 'vitepress'
import SiteHeader from '@mswjs/shared/theme/components/SiteHeader.vue'
import SiteFooter from '@mswjs/shared/theme/components/SiteFooter.vue'
import PageBanner from '@mswjs/shared/theme/components/PageBanner.vue'
import DocsLayout from '@mswjs/shared/theme/docs/DocsLayout.vue'
import FooterSection from '@mswjs/shared/theme/components/FooterSection.vue'
import mswLogo from '../../src/images/msw.svg'
import BlogPostLayout from './blog/BlogPostLayout.vue'
import BlogIndexPage from './blog/BlogIndexPage.vue'
import HomePage from './home/HomePage.vue'
import EcosystemPage from './pages/EcosystemPage.vue'
import BrandingPage from './pages/BrandingPage.vue'
import NotFoundPage from '@mswjs/shared/theme/pages/NotFoundPage.vue'

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

  if (frontmatter.value.layout === 'ecosystem') {
    return 'ecosystem'
  }

  if (frontmatter.value.layout === 'branding') {
    return 'branding'
  }

  if (frontmatter.value.layout === 'blog-index') {
    return 'blog-index'
  }

  if (route.path.startsWith('/blog/')) {
    return 'blog-post'
  }

  if (route.path.startsWith('/docs')) {
    return 'docs'
  }

  return 'page'
})
</script>

<template>
  <PageBanner v-if="isDocsPage">
    <p>
      You are viewing the docs for <strong>MSW 2.0</strong>. To access the 1.x
      docs
      <a
        href="https://v1.mswjs.io/"
        class="text-primary hover:underline"
        target="_blank"
        rel="noopener noreferrer"
        >click here</a
      >.
    </p>
  </PageBanner>

  <SiteHeader :logo="mswLogo" :compact="isDocsPage" />

  <main>
    <NotFoundPage v-if="pageKind === 'not-found'" />
    <HomePage v-else-if="pageKind === 'home'" />
    <EcosystemPage v-else-if="pageKind === 'ecosystem'" />
    <BrandingPage v-else-if="pageKind === 'branding'" />
    <BlogIndexPage v-else-if="pageKind === 'blog-index'" />
    <BlogPostLayout v-else-if="pageKind === 'blog-post'">
      <Content />
    </BlogPostLayout>
    <DocsLayout v-else-if="pageKind === 'docs'" />
    <Content v-else />
  </main>

  <SiteFooter :compact="isDocsPage">
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
            <a href="https://github.com/mswjs/msw" target="_blank">GitHub</a>
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
