<script setup lang="ts">
import Avatar from '../components/Avatar.vue'
import QuotesIcon from '../components/icons/quotes.vue'

defineProps<{
  author: string
  position: string
  avatarUrl: string
}>()
</script>

<template>
  <figure class="flex flex-col px-6 py-8 md:px-10 md:py-12 lg:py-14">
    <QuotesIcon class="mb-8 w-10 select-none fill-primary" aria-hidden="true" />
    <blockquote
      class="flex-1 text-xl font-medium leading-8 md:text-2xl md:leading-9"
    >
      <slot />
    </blockquote>
    <figcaption class="mt-10 flex items-center">
      <Avatar :url="avatarUrl" :name="author" class-name="w-16 h-16">
        {{ position }}
      </Avatar>
    </figcaption>
  </figure>
</template>
