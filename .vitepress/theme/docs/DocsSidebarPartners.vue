<script setup lang="ts">
import CodeRabbitIcon from '../components/icons/coderabbit.vue'
import ChromaticIcon from '../components/icons/chromatic.vue'
import WorkleapIcon from '../components/icons/workleap.vue'
</script>

<template>
  <ul class="rounded-md overflow-hidden space-y-1">
    <li>
      <a
        href="https://coderabbit.link/mswjs"
        class="inline-flex flex-col items-center justify-center py-4 px-5 w-full grayscale hover:grayscale-0 bg-neutral-800 hover:bg-neutral-700 hover:bg-opacity-50"
        target="_blank"
        rel="noopener noreferer"
        aria-label="CodeRabbit"
      >
        <CodeRabbitIcon class="max-w-[140px] max-h-[32px] fill-current" />
      </a>
    </li>
    <li>
      <a
        href="https://www.chromatic.com/?ref=mswjs"
        class="inline-flex flex-col items-center justify-center py-3 px-5 w-full grayscale hover:grayscale-0 bg-neutral-800 hover:bg-neutral-700 hover:bg-opacity-50"
        target="_blank"
        rel="noopener noreferer"
        aria-label="Chromatic"
      >
        <ChromaticIcon class="max-w-[120px] max-h-[32px] fill-current" />
      </a>
    </li>
    <li>
      <a
        href="https://workleap.com/?ref=mswjs"
        class="inline-flex flex-col items-center justify-center py-3 px-5 w-full grayscale hover:grayscale-0 bg-neutral-800 hover:bg-neutral-700 hover:bg-opacity-50"
        target="_blank"
        rel="noopener noreferer"
        aria-label="Workleap"
      >
        <WorkleapIcon class="max-w-[120px] max-h-[32px] fill-current" />
      </a>
    </li>
  </ul>
</template>
