<script setup lang="ts">
import { HeartIcon } from '@heroicons/vue/24/solid'
import Container from './Container.vue'
import Grid from './Grid.vue'
import SocialLinksList from './SocialLinksList.vue'

defineProps<{
  compact?: boolean
}>()

const currentYear = new Date().getFullYear()
</script>

<template>
  <footer
    class="footer py-10 text-sm font-medium text-neutral-400"
    :class="{ 'border-t border-neutral-800': !compact }"
  >
    <Container :compact="compact">
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
    </Container>
  </footer>
</template>
