<script setup lang="ts">
import AppTrayIcons from './AppTrayIcons.vue'
</script>

<template>
  <div class="border border-neutral-700 rounded-lg p-4 font-mono select-none text-sm">
    <header class="pb-4">
      <AppTrayIcons />
    </header>
    <p><span class="opacity-50">$</span> vitest</p>
    <p>
      <span class="text-yellow-500">❯</span> <span class="text-neutral-400">components/<span class="text-white">ProductDetail</span>.test.ts</span>
    </p>
    <p class="pl-[2ch] text-ellipsis overflow-hidden whitespace-nowrap">
      <span class="text-green-600">✓</span> <span>displays product name</span>
    </p>
    <p class="pl-[2ch] text-ellipsis overflow-hidden whitespace-nowrap">
      <span class="text-green-600">✓</span> <span>displays net price</span>
    </p>
    <p class="pl-[2ch] text-ellipsis overflow-hidden whitespace-nowrap">
      <span class="text-green-600">✓</span> <span>handles network errors</span>
    </p>
    <br />
    <p class="ml-[5ch] text-neutral-400">
      <span>Tests</span> <span class="text-green-500 font-bold">3 passed</span> (3)</p>
    <p class="ml-[2ch] text-neutral-400"><span>Duration</span> <span class="text-white">100ms</span></p>
  </div>
</template>
