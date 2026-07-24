<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vitepress'
import { ChevronRightIcon as ArrowRightIcon } from '@heroicons/vue/24/solid'
import type { SidebarPageWithChildren } from '../../sidebar'
import { isPartiallyActiveUrl } from '../utils/isPartiallyActiveUrl'
import DocsMenuLink from './DocsMenuLink.vue'
import DocsNavTree from './DocsNavTree.vue'

const props = defineProps<{
  item: SidebarPageWithChildren
}>()

const route = useRoute()

const computeIsActive = () => {
  return isPartiallyActiveUrl(props.item.url, route.path, {
    standalone: props.item.standalone,
  })
}

const isOpen = ref(computeIsActive())

watch(
  () => route.path,
  () => {
    if (computeIsActive()) {
      isOpen.value = true
    }
  },
)

const handleToggle = (event: Event) => {
  isOpen.value = (event.target as HTMLDetailsElement).open
}
</script>

<template>
  <details class="docs-group-item" :open="isOpen" @toggle="handleToggle">
    <summary class="flex items-center justify-between gap-3">
      <DocsMenuLink :href="item.url" :standalone="item.standalone">
        {{ item.title }}
      </DocsMenuLink>
      <ArrowRightIcon class="icon" />
    </summary>
    <DocsNavTree :items="item.children" item-kind="group" />
  </details>
</template>
