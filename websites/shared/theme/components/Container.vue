<script setup lang="ts">
defineProps<{
  compact?: boolean
}>()
</script>

<template>
  <div :class="compact ? 'px-5' : 'container'">
    <slot />
  </div>
</template>
