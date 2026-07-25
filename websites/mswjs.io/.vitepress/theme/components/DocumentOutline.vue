<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'
import type { DefaultTheme } from 'vitepress/theme'
import type { DocumentOutlineItem } from '../composables/useDocumentOutline'
import OutlineTree from './OutlineTree.vue'

const props = defineProps<{
  items: Array<DocumentOutlineItem>
  activeLink: string | null
}>()

const { theme } = useData<DefaultTheme.Config>()
const title = computed(() => {
  if (
    typeof theme.value.outline === 'object' &&
    !Array.isArray(theme.value.outline)
  ) {
    return theme.value.outline.label ?? 'On this page'
  }

  return theme.value.outlineTitle ?? 'On this page'
})
</script>

<template>
  <nav
    v-if="props.items.length > 0"
    data-document-outline
    class="min-h-0 overflow-y-auto text-[13px] font-medium"
    :aria-label="title"
  >
    <h2 class="m-0 text-sm font-semibold leading-8 tracking-normal text-white">
      {{ title }}
    </h2>
    <OutlineTree :items="props.items" :active-link="activeLink" />
  </nav>
</template>
