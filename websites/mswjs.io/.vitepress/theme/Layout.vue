<script setup lang="ts">
import SiteLayout from '@mswjs/shared/theme/shell/SiteLayout.vue'
import FooterSection from '@mswjs/shared/theme/components/FooterSection.vue'
import BlogPostNav from './blog/BlogPostNav.vue'
import BlogPostHeader from './blog/BlogPostHeader.vue'
</script>

<template>
  <SiteLayout
    :documentation-roots="['/docs', '/guides', '/api']"
    blog-root="/blog"
    home-label="Mock Service Worker home"
    branding-url="/branding"
    ads-publisher="mswjsio"
  >
    <template #blog-post-nav>
      <BlogPostNav />
    </template>
    <template #blog-post-header>
      <BlogPostHeader />
    </template>

    <template #footer-sections>
      <div class="sm:col-span-2">
        <FooterSection title="Library">
          <li><a href="/docs">Documentation</a></li>
          <li><a href="/guides">Guides</a></li>
          <li><a href="/blog">Blog</a></li>
        </FooterSection>
      </div>

      <div class="sm:col-span-2">
        <FooterSection title="Resources">
          <li><a href="/docs/quick-start">Quick start</a></li>
          <li>
            <a href="/guides/best-practices"> Best practices </a>
          </li>
          <li>
            <a href="https://github.com/mswjs/examples" target="_blank">
              Examples
            </a>
          </li>
        </FooterSection>
      </div>

      <div class="sm:col-span-2">
        <FooterSection title="Community">
          <li>
            <a href="https://github.com/mswjs/msw" target="_blank">
              GitHub
            </a>
          </li>
          <li>
            <a href="https://twitter.com/ApiMocking" target="_blank">
              Twitter
            </a>
          </li>
          <li>
            <a href="https://kettanaito.com/discord" target="_blank">
              Discord
            </a>
          </li>
        </FooterSection>
      </div>
    </template>
  </SiteLayout>
</template>
