<script setup lang="ts">
import type { DocsHeading } from './buildHeadings'

defineProps<{
  headings: Array<DocsHeading>
  isNested?: boolean
}>()
</script>

<template>
  <ul :class="{ 'ml-3': isNested }">
    <li v-for="heading of headings" :key="heading.link">
      <a
        :href="heading.link"
        class="inline-block text-neutral-400 py-1.5 leading-5 hover:text-white"
        >{{ heading.title }}</a
      >
      <DocsTableOfContents
        v-if="heading.children"
        :headings="heading.children"
        :is-nested="true"
      />
    </li>
  </ul>
</template>
