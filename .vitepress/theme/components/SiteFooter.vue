<script setup lang="ts">
import { HeartIcon } from '@heroicons/vue/24/solid'
import Grid from './Grid.vue'
import SocialLinksList from './SocialLinksList.vue'

const currentYear = new Date().getFullYear()
</script>

<template>
  <!-- The footer sits inside the site frame, which draws the side rails;
       only the top border continues the sections above. -->
  <footer
    class="footer border-t border-neutral-800 px-6 py-20 text-sm font-medium text-neutral-400 md:px-10"
  >
    <Grid class="sm:grid-cols-6 gap-y-16">
      <div class="sm:col-span-6">
        <p class="text-neutral-200 font-medium">
          &copy; {{ currentYear }} Mock Service Worker
        </p>
        <p class="font-normal" aria-hidden="true">
          Created with <HeartIcon class="w-3.5 inline text-primary" />
          by
          <a href="https://twitter.com/kettanaito" target="_blank">
            kettanaito
          </a>
        </p>
        <SocialLinksList />
      </div>

      <slot name="sections" />
    </Grid>
  </footer>
</template>
