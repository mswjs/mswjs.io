<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'

const { frontmatter } = useData()

const pageTitle = computed(() => {
  return frontmatter.value.displayTitle || frontmatter.value.title
})
</script>

<template>
  <header class="mb-8">
    <h1 class="docs-page-title mb-3">{{ pageTitle }}</h1>
    <p
      v-if="frontmatter.description"
      class="mb-6 text-lg font-medium text-neutral-400"
    >
      {{ frontmatter.description }}
    </p>
  </header>
</template>

<style scoped>
.docs-page-title {
  font-size: 2.25rem;
  line-height: 2.5rem;
  font-weight: 800;
  letter-spacing: -0.025em;
}

@media (min-width: 768px) {
  .docs-page-title {
    font-size: 3rem;
    line-height: 1;
  }
}
</style>
