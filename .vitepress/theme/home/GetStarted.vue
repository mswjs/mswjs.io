<script setup lang="ts">

defineProps<{
  iconUrl: string
  iconAlt: string
  title: string
  linkUrl: string
  linkText: string
}>()
</script>

<template>
  <div class="-mb-px border-y border-neutral-800">
    <div class="px-6 pt-24 pb-12 text-center md:pt-32 md:pb-16">
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

    <div class="h-24 md:h-32" aria-hidden="true" />

    <!-- The logo's top and bottom borders stretch across the section. -->
    <div class="flex justify-center border-y border-neutral-800">
      <a
        href="/sponsor"
        class="group w-24 flex-shrink-0 border-x-2 border-neutral-800 bg-neutral-900 p-5"
        aria-label="Sponsor Mock Service Worker"
      >
        <img
          :src="iconUrl"
          :alt="iconAlt"
          class="site-logo-ring flex rotate-6 select-none transition-transform duration-200 group-hover:rotate-0"
        />
      </a>
    </div>

    <!-- Separator between this section and the footer. -->
    <div class="h-14 bg-neutral-800/30" aria-hidden="true" />
  </div>
</template>
