<script setup lang="ts">
import { computed } from 'vue'

type CodePlacement =
  | 'stack'
  | 'bottom-right'
  | 'bottom-left'
  | 'right'
  | 'right-bottom'

const props = defineProps<{
  title: string
  eyebrow?: string
  /**
   * Render as a cell of a bordered grid instead of a standalone card.
   */
  plain?: boolean
  /**
   * Where the code snippet sits relative to the copy. The corner and
   * side placements let the snippet bleed past the card edge.
   */
  codePlacement?: CodePlacement
}>()

const placement = computed<CodePlacement>(() => {
  return props.codePlacement ?? 'stack'
})

const layoutClass = computed(() => {
  return placement.value === 'right' || placement.value === 'right-bottom'
    ? 'md:grid md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-12'
    : 'flex flex-col'
})

// Bleeding panels pull themselves over the card padding so their
// edges merge with the card border (see ".home-code-bleed-*").
const codeClass = computed(() => {
  switch (placement.value) {
    case 'bottom-right': {
      return 'home-code-bleed-r home-code-bleed-b mt-10 flex-1 -mb-[var(--card-padding)] -mr-[var(--card-padding)]'
    }
    case 'bottom-left': {
      return 'home-code-bleed-l home-code-bleed-b mt-10 flex-1 -mb-[var(--card-padding)] -ml-[var(--card-padding)]'
    }
    case 'right': {
      return 'home-code-bleed-r home-code-bleed-b mt-10 -mb-[var(--card-padding)] -mr-[var(--card-padding)] md:mt-0 md:self-stretch'
    }
    case 'right-bottom': {
      // Beside the copy, bleeding only through the bottom edge.
      return 'home-code-bleed-b mt-10 -mb-[var(--card-padding)] md:mt-0 md:self-stretch'
    }
    default: {
      return 'mt-8'
    }
  }
})
</script>

<template>
  <article
    class="relative min-w-0 overflow-hidden"
    :class="[
      layoutClass,
      plain
        ? '[--card-padding:2rem] p-[var(--card-padding)] md:[--card-padding:3rem] lg:[--card-padding:3.5rem]'
        : '[--card-padding:1.5rem] rounded-2xl border border-neutral-800 bg-neutral-800/40 p-[var(--card-padding)] md:[--card-padding:2rem]',
    ]"
  >
    <div class="min-w-0 max-w-lg md:self-center">
      <p
        v-if="eyebrow"
        class="mb-2 text-sm font-bold uppercase tracking-widest text-primary"
      >
        {{ eyebrow }}
      </p>
      <h3 class="text-xl font-bold text-white md:text-2xl">{{ title }}</h3>
      <p class="home-prose mt-4 text-lg leading-snug text-neutral-400">
        <slot name="description" />
      </p>
      <div
        v-if="$slots.links"
        class="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2"
      >
        <slot name="links" />
      </div>
    </div>
    <div
      class="home-code home-code-compact home-code-panel vp-doc min-w-0"
      :class="codeClass"
    >
      <slot />
    </div>
  </article>
</template>
