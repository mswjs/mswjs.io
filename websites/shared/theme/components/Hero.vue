<script setup lang="ts">
import { CommandLineIcon } from '@heroicons/vue/24/outline'
import Container from './Container.vue'

defineProps<{
  repoUrl: string
  gettingStartedUrl: string
}>()
</script>

<template>
  <Container>
    <section
      class="max-w-screen-md py-16 mx-auto hero-gradient md:py-24 md:text-center lg:py-48"
    >
      <slot name="headnote" />
      <h1 class="mb-8 font-black text-balance md:text-6xl">
        <slot name="title" />
      </h1>
      <p
        class="text-xl tracking-tight text-neutral-400 text-balance md:text-2xl md:leading-9"
      >
        <slot name="subtitle" />
      </p>
      <footer
        class="flex flex-col items-center justify-center gap-6 text-lg font-semibold mt-14 md:flex-row md:gap-10"
      >
        <a
          :href="gettingStartedUrl"
          class="inline-flex items-center justify-center w-full gap-2 button button-primary md:w-auto md:px-8"
        >
          <CommandLineIcon class="text-primary w-[24px]" />
          Getting started
        </a>
        <a
          :href="repoUrl"
          class="inline-block w-full text-center text-neutral-300 hover:text-white md:w-auto"
          target="_blank"
          rel="noopener noreferrer"
        >
          View on GitHub
        </a>
      </footer>
    </section>

    <slot />
  </Container>
</template>
