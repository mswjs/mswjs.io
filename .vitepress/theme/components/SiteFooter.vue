<script setup lang="ts">
import { HeartIcon } from '@heroicons/vue/24/solid'
import Container from './Container.vue'
import Grid from './Grid.vue'
import SocialLinksList from './SocialLinksList.vue'

defineProps<{
  compact?: boolean
  /**
   * Frame the footer like the page sections: side rails and the top border
   * drawn on the content box instead of across the whole viewport.
   */
  framed?: boolean
}>()

const currentYear = new Date().getFullYear()
</script>

<template>
  <footer
    class="footer text-sm font-medium text-neutral-400"
    :class="{ 'border-t border-neutral-800': !compact && !framed }"
  >
    <Container :compact="compact" :class="{ 'home-frame': framed }">
      <!-- When framed, the rails and top border sit on the content box,
           continuing the sections above; the content moves inside them. -->
      <div
        class="py-20"
        :class="{
          'home-frame-rails border-x border-t border-neutral-800 px-6 md:px-10':
            framed,
        }"
      >
      <Grid v-if="compact">
        <div
          class="pb-12 border-t col-span-full xl:col-span-10 xl:col-start-4 border-neutral-800"
        />
      </Grid>

      <Grid class="sm:grid-cols-6 gap-y-16">
        <div
          :class="{
            'xl:col-span-3 xl:col-start-4': compact,
            'sm:col-span-6': !compact,
          }"
        >
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
      </div>
    </Container>
  </footer>
</template>
