<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vitepress'
import { isPartiallyActiveUrl } from '../utils/isPartiallyActiveUrl'

const props = defineProps<{
  href: string
  standalone?: boolean
}>()

const route = useRoute()

const isActive = computed(() => {
  return isPartiallyActiveUrl(props.href, route.path, {
    standalone: props.standalone,
  })
})
</script>

<template>
  <a
    :href="href"
    class="inline-block py-1.5 leading-5 hover:text-white"
    :class="{
      'text-neutral-400': !isActive,
      'docs-link-active': isActive,
      'text-white font-bold': isActive,
    }"
    :aria-current="isActive"
  >
    <slot />
  </a>
</template>
