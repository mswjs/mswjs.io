<script setup lang="ts">
import Container from './Container.vue'
</script>

<template>
  <aside
    class="py-1.5 border-b border-neutral-700 bg-neutral-950 text-neutral-200 text-sm text-center font-medium"
  >
    <Container :compact="true">
      <slot />
    </Container>
  </aside>
</template>
