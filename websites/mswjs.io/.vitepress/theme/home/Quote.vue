<script setup lang="ts">
import Avatar from '../components/Avatar.vue'

defineProps<{
  author: string
  position?: string
  imageUrl: string
}>()
</script>

<template>
  <figure class="p-5 md:p-10 border rounded-md border-neutral-800">
    <blockquote class="font-medium"><slot /></blockquote>
    <figcaption class="relative flex items-center gap-3 mt-8">
      <Avatar :name="author" :url="imageUrl" class-name="w-14 h-14">{{ position || 'Software Engineer' }}</Avatar>
    </figcaption>
  </figure>
</template>
