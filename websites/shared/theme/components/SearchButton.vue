<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'
import { MagnifyingGlassIcon as SearchIcon } from '@heroicons/vue/24/outline'
import ReactIsland from './ReactIsland.vue'
import { DocSearch } from '../react/docSearch'

const { theme } = useData()

const algoliaProps = computed(() => {
  return {
    appId: theme.value.algolia?.appId || '',
    apiKey: theme.value.algolia?.apiKey || '',
    indexName: theme.value.algolia?.indexName || '',
  }
})
</script>

<template>
  <button
    id="docsearch-search-button"
    class="DocSearch DocSearch-Button flex items-center gap-1.5 w-full px-2.5 py-1.5 font-medium border border-neutral-700 rounded-md text-neutral-400 hover:border-neutral-600 hover:bg-neutral-800"
    tabindex="1"
  >
    <div class="DocSearch-Button-Container">
      <SearchIcon class="mr-1.5 w-[18px] text-neutral-500" aria-label="Search" />
      Search
    </div>
    <kbd class="DocSearch-Button-Key" aria-hidden="true">/</kbd>
  </button>
  <ClientOnly>
    <ReactIsland :component="DocSearch" :component-props="algoliaProps" />
  </ClientOnly>
</template>
