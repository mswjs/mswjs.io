<script setup lang="ts">
import ArrowNarrowRightIcon from '../components/icons/arrow-narrow-right.svg?component'

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
    class="group inline-flex items-center gap-1.5 bg-neutral-800/50 font-semibold text-neutral-300 transition-colors hover:bg-neutral-700/50 hover:text-white"
    :class="large ? 'px-5 py-2.5 text-base' : 'px-4 py-2 text-sm'"
  >
    <slot />
    <ArrowNarrowRightIcon
      class="transition-transform group-hover:translate-x-0.5"
      :class="large ? 'h-5 w-5' : 'h-4 w-4'"
      aria-hidden="true"
    />
  </a>
</template>
