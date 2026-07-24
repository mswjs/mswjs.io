<script setup lang="ts">
import { HeartIcon } from '@heroicons/vue/24/solid'
</script>

<template>
  <a
    href="https://github.com/sponsors/mswjs"
    class="sponsor-link inline-flex items-center px-3 py-1 h-[36px] space-x-1 border rounded-md border-primary text-primary hover:bg-primary hover:text-black"
    target="_blank"
    rel="noopener noreferrer"
  >
    <span class="self-center">
      <HeartIcon class="absolute w-3 motion-safe:animate-ping duration-long" />
      <HeartIcon class="w-3" />
    </span>
    <span class="inline">Sponsor</span>
  </a>
</template>
