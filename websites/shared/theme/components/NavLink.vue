<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vitepress'
import { normalizePathname } from '../utils/isPartiallyActiveUrl'

const props = defineProps<{
  href: string
  strict?: boolean
}>()

const route = useRoute()

const isActive = computed(() => {
  const pathname = normalizePathname(route.path)

  if (props.strict) {
    return (
      props.href === pathname || props.href === pathname.replace(/\/$/, '')
    )
  }

  return pathname.startsWith(props.href)
})
</script>

<template>
  <a
    :href="href"
    class="nav-link px-3 py-[19px] font-bold hover:text-white"
    :class="{
      'menu-link-active text-white -mb-px border-b border-primary': isActive,
    }"
  >
    <slot />
  </a>
</template>

<style scoped>
a {
  display: inline-block;
  text-decoration: none;
}
</style>
