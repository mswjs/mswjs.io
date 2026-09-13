<script setup lang="ts">
import ArrowNarrowRightIcon from '@mswjs/shared/theme/components/icons/arrow-narrow-right.vue'

defineProps<{
  href: string
  /**
   * A larger variant for links standing on their own, e.g. under a heading.
   */
  large?: boolean
}>()
</script>

<template>
  <a
    :href="href"
    class="group inline-flex items-center gap-1 font-semibold text-neutral-300 transition-colors hover:text-primary"
    :class="large ? 'text-base' : 'text-sm'"
  >
    <slot />
    <ArrowNarrowRightIcon
      class="transition-transform group-hover:translate-x-0.5"
      :class="large ? 'h-5 w-5' : 'h-4 w-4'"
      aria-hidden="true"
    />
  </a>
</template>
