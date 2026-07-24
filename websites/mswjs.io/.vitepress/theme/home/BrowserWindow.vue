<script setup lang="ts">
import AppTrayIcons from './AppTrayIcons.vue'
</script>

<template>
  <div class="bg-black border border-neutral-700 rounded-xl select-none max-w-full">
    <header class="px-5 py-2 flex items-center justify-between gap-5 border-b border-neutral-800">
      <AppTrayIcons />
      <div class="px-3 py-0.5 border border-neutral-800 rounded-lg text-neutral-400 text-sm md:text-base font-medium whitespace-nowrap text-ellipsis overflow-hidden">
        <span class="opacity-60">acme.com</span>
        <span>/product/abc-123</span>
      </div>
      <div />
    </header>
    <div><slot /></div>
  </div>
</template>
