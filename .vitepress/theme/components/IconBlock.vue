<script setup lang="ts">
defineProps<{
  imageUrl: string
  alt: string
}>()
</script>

<template>
  <div class="inline-block flex-shrink-0 border-2 border-neutral-800 bg-neutral-900 rounded-xl p-5 w-24 shadow-xl">
    <img :src="imageUrl" :alt="alt" class="flex select-none" />
  </div>
</template>
