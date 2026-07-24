<script setup lang="ts">
import { computed, type Component } from 'vue'
import { iconRegistry } from './iconRegistry'

const props = defineProps<{
  url: string
  title: string
  description?: string
  /**
   * Name of an icon in the icon registry, e.g.
   * "CubeTransparentIcon" or "solid/ServerIcon".
   */
  icon?: string
}>()

const isExternal = computed(() => {
  return !props.url.startsWith('/')
})

const iconComponent = computed<Component | undefined>(() => {
  return props.icon ? iconRegistry[props.icon] : undefined
})
</script>

<template>
  <a
    :href="url"
    :target="isExternal ? '_blank' : undefined"
    :rel="isExternal ? 'noopener noreferrer' : undefined"
    class="page-card block my-5 px-5 py-4 border border-neutral-800 rounded-lg shadow-sm text-white no-underline bg-opacity-40 bg-neutral-800 hover:bg-opacity-70"
  >
    <article class="flex items-start gap-5">
      <div class="bg-primary bg-opacity-10 rounded-md p-2">
        <component
          :is="iconComponent"
          v-if="iconComponent"
          class="w-[24px] h-[24px] text-primary text-lg"
        />
      </div>
      <div>
        <p class="page-card-title mt-0 mb-1 text-base font-bold">{{ title }}</p>
        <p class="page-card-description mb-0 mt-0 text-sm leading-5 text-neutral-400">
          {{ description || url }}
        </p>
      </div>
    </article>
  </a>
</template>
