<script setup lang="ts">
import { ArrowLeftIcon } from '@heroicons/vue/24/solid'
</script>

<template>
  <!-- Sits under the site header while the post scrolls. The header is
       sticky on small screens and fixed under the top banner from "960". -->
  <nav
    class="sticky top-16 z-30 flex items-center border-b border-neutral-800 bg-neutral-900 px-6 py-3 text-sm font-medium min-[960px]:top-[calc(var(--site-layout-top-height)+4rem)] md:px-10"
    aria-label="Blog navigation"
  >
    <a
      href="/blog/"
      class="inline-flex items-center gap-2 text-neutral-400 hover:text-white"
    >
      <ArrowLeftIcon class="w-3" />
      Back to Blog
    </a>
  </nav>
</template>
