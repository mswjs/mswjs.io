<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>

<template>
  <h4 class="mb-8 font-bold tracking-widest uppercase text-md whitespace-nowrap">
    {{ title }}
  </h4>
  <nav>
    <ul class="space-y-3 list-none text-white whitespace-nowrap">
      <slot />
    </ul>
  </nav>
</template>
