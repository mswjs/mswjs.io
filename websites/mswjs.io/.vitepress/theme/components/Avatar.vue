<script setup lang="ts">
defineProps<{
  url: string
  name: string
  className?: string
}>()
</script>

<template>
  <div class="inline-flex items-center gap-3">
    <img
      :src="url"
      :alt="name"
      :class="['p-1 border-4 border-stone-700 rounded-full', className]"
    />
    <div>
      <p class="font-semibold leading-5 mb-1.5 text-white">{{ name }}</p>
      <p class="text-neutral-400 leading-5"><slot /></p>
    </div>
  </div>
</template>
