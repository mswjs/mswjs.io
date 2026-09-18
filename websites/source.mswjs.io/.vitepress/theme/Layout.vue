<script setup lang="ts">
import SiteLayout from '@mswjs/shared/theme/shell/SiteLayout.vue'
import FooterSection from '@mswjs/shared/theme/components/FooterSection.vue'
</script>

<template>
  <SiteLayout :documentation-roots="['/docs']" home-label="Source home">
    <template #footer-sections>
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
  </SiteLayout>
</template>
