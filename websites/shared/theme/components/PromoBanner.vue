<script setup lang="ts">
defineProps<{
  actionText?: string
  actionUrl?: string
}>()
</script>

<template>
  <aside
    class="relative text-sm leading-4 font-bold rounded-lg bg-slate-500 bg-opacity-20 border border-slate-700 px-4 py-1.5 flex flex-col sm:inline-flex sm:flex-row items-center gap-2 mb-8"
  >
    <slot />
    <a
      v-if="actionText"
      :href="actionUrl"
      class="text-primary ml-[1ch] flex-shrink-0 hover:underline"
      target="_blank"
      rel="noopener noreferrer"
    >
      {{ actionText }}
    </a>
  </aside>
</template>
