<script setup lang="ts">
import ArrowNarrowRightIcon from '@mswjs/shared/theme/components/icons/arrow-narrow-right.vue'

defineProps<{
  href: string
}>()
</script>

<template>
  <a
    :href="href"
    class="group inline-flex items-center gap-1 text-sm font-semibold text-neutral-300 transition-colors hover:text-primary"
  >
    <slot />
    <ArrowNarrowRightIcon
      class="h-4 w-4 transition-transform group-hover:translate-x-0.5"
      aria-hidden="true"
    />
  </a>
</template>
