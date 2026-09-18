<script setup lang="ts">
import Container from '../components/Container.vue'

defineProps<{
  repoUrl: string
  gettingStartedUrl: string
}>()
</script>

<template>
  <Container class="home-frame">
    <section
      class="home-frame-rails -mb-px -mt-px grid border border-neutral-800 lg:grid-cols-2"
    >
      <div
        class="flex flex-col pb-12 md:pb-16 lg:border-r lg:border-neutral-800 lg:pb-20"
      >
        <div
          v-if="$slots.headnote"
          class="flex items-center gap-3 border-b border-neutral-800 px-6 py-3 text-sm font-medium md:px-10"
        >
          <slot name="headnote" />
        </div>
        <div class="px-6 py-12 md:px-10 md:py-16 lg:py-20">
          <h1 class="mb-6 font-black text-pretty md:text-5xl">
            <slot name="title" />
          </h1>
          <p
            class="text-lg leading-relaxed tracking-tight text-neutral-400 text-pretty md:text-xl"
          >
            <slot name="subtitle" />
          </p>
        </div>
        <footer
          class="flex h-14 border-y border-neutral-800 pl-6 text-base font-semibold md:pl-10"
        >
          <a
            :href="gettingStartedUrl"
            class="relative z-10 -my-px inline-flex items-center justify-center border border-primary px-8 font-bold text-primary transition-colors hover:bg-primary hover:text-neutral-900 md:px-10"
          >
            Get started
          </a>
          <a
            :href="repoUrl"
            class="inline-flex items-center border-r border-neutral-800 px-6 text-neutral-300 hover:text-white md:px-8"
            target="_blank"
            rel="noopener noreferrer"
          >
            View on GitHub
          </a>
        </footer>
      </div>
      <div
        class="home-code home-code-flush vp-doc flex min-w-0 items-center border-t border-neutral-800 bg-neutral-800/30 px-2 py-4 md:px-6 md:py-8 lg:border-t-0"
      >
        <div class="min-w-0 flex-1">
          <slot name="code" />
        </div>
      </div>
    </section>
  </Container>
</template>
