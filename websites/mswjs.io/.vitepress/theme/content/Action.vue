<script setup lang="ts">
import { ArrowRightCircleIcon } from '@heroicons/vue/24/solid'
</script>

<template>
  <p class="action font-semibold text-primary">
    <ArrowRightCircleIcon
      class="inline -mt-[0.25ch] mr-[0.5ch] w-5 align-middle"
    />
    <slot />
  </p>
</template>
