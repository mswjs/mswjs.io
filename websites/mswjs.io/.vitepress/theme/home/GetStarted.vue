<script setup lang="ts">
import Container from '@mswjs/shared/theme/components/Container.vue'

defineProps<{
  iconUrl: string
  iconAlt: string
  title: string
  linkUrl: string
  linkText: string
}>()
</script>

<template>
  <Container class="home-frame">
    <div class="home-frame-rails -mb-px border border-neutral-800">
      <!-- Equal breathing room above the logo band and below the CTA row. -->
      <div class="h-14 bg-neutral-800/30" aria-hidden="true" />

      <!-- The logo's top and bottom borders stretch across the section. -->
      <div class="flex justify-center border-y border-neutral-800">
        <div
          class="w-24 flex-shrink-0 border-x-2 border-neutral-800 bg-neutral-900 p-5"
        >
          <img :src="iconUrl" :alt="iconAlt" class="flex select-none" />
        </div>
      </div>

      <div class="hero-gradient px-6 py-12 text-center md:py-16">
        <div class="mx-auto max-w-2xl">
          <h2 class="mb-8 capitalize">{{ title }}</h2>
          <p
            class="mx-auto text-left text-xl font-medium leading-8 text-neutral-400 text-balance md:text-center"
          >
            <slot />
          </p>
        </div>
      </div>

      <!-- The call to action: a centered "h-14" row, like the hero's. -->
      <div class="flex h-14 justify-center text-base font-semibold">
        <a
          :href="linkUrl"
          class="inline-flex items-center justify-center border border-primary px-8 font-bold text-primary transition-colors hover:bg-primary hover:text-neutral-900 md:px-10"
        >
          {{ linkText }}
        </a>
      </div>

      <div class="h-12 md:h-16" aria-hidden="true" />
    </div>
  </Container>
</template>
