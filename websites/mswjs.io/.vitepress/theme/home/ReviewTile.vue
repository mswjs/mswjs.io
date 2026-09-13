<script setup lang="ts">
defineProps<{
  author: string
  position?: string
}>()
</script>

<template>
  <figure
    class="marquee-item flex shrink-0 flex-col border-r border-neutral-800 p-8"
  >
    <blockquote
      class="flex-1 text-base font-medium text-neutral-400 [&_em]:text-white"
    >
      <slot />
    </blockquote>
    <figcaption class="mt-6">
      <p class="font-semibold leading-5 text-white">{{ author }}</p>
      <p class="text-sm leading-5 text-neutral-400">
        {{ position || 'Software Engineer' }}
      </p>
    </figcaption>
  </figure>
</template>
