<script setup lang="ts">
import type { SidebarItem } from '../../sidebar'
import DocsRootSection from './DocsRootSection.vue'
import DocsNavGroup from './DocsNavGroup.vue'
import DocsMenuLink from './DocsMenuLink.vue'

defineProps<{
  items: Array<SidebarItem>
  itemKind?: SidebarItem['kind']
}>()
</script>

<template>
  <ul
    class="text-sm font-medium"
    :class="{ 'pl-3 ml-1 border-l border-neutral-700': itemKind === 'group' }"
  >
    <li v-for="item of items" :key="item.kind === 'group' ? item.title : item.url">
      <DocsRootSection
        v-if="item.kind === 'group'"
        :title="item.title"
        :items="item.children"
      />
      <DocsNavGroup v-else-if="item.kind === 'page-with-children'" :item="item" />
      <DocsMenuLink v-else :href="item.url" :standalone="item.standalone">
        {{ item.title }}
      </DocsMenuLink>
    </li>
  </ul>
</template>
