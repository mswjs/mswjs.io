<script setup lang="ts">
import Avatar from '../components/Avatar.vue'
import QuotesIcon from '@mswjs/shared/theme/components/icons/quotes.vue'

defineProps<{
  author: string
  position: string
  avatarUrl: string
}>()
</script>

<template>
  <blockquote class="relative flex flex-col max-w-2xl mx-auto">
    <QuotesIcon class="select-none lg:absolute mb-10 lg:mb-0 top-0 left-0 right-0 mx-auto lg:-ml-8 lg:mt-3 lg:-translate-x-full text-8xl fill-primary w-16 lg:w-24" />
    <p class="text-xl md:text-2xl leading-8 md:leading-9 font-medium"><slot /></p>
    <figcaption class="flex items-center md:self-center gap-4 mt-16">
      <Avatar :url="avatarUrl" :name="author" class-name="w-20">{{ position }}</Avatar>
    </figcaption>
  </blockquote>
</template>
