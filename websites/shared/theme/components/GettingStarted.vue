<script setup lang="ts">
import { CommandLineIcon } from '@heroicons/vue/24/outline'
import Container from './Container.vue'
import PageHeaderSubtitle from './PageHeaderSubtitle.vue'
import IconBlock from './IconBlock.vue'

defineProps<{
  iconUrl: string
  iconAlt: string
  title: string
  linkUrl: string
  linkText: string
}>()
</script>

<template>
  <div class="hero-gradient items-center py-24 text-center bg-neutral-800 bg-opacity-40 border-t-neutral-800 border-y border-b-neutral-800 -mb-px">
    <Container>
      <IconBlock :image-url="iconUrl" :alt="iconAlt" />

      <div class="max-w-2xl mx-auto">
        <h2 class="mt-12 mb-8 capitalize">{{ title }}</h2>
        <PageHeaderSubtitle class="text-left md:text-center"><slot /></PageHeaderSubtitle>

        <a
          :href="linkUrl"
          class="button button-primary inline-flex items-center justify-center gap-2 text-lg mt-10 px-10 w-full md:w-auto"
        >
          <CommandLineIcon class="w-8 text-primary" />{{ linkText }}
        </a>
      </div>
    </Container>
  </div>
</template>
