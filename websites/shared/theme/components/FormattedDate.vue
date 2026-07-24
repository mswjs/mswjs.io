<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  date: string | number | Date
}>()

const dateObject = computed(() => {
  return new Date(props.date)
})

const formattedDate = computed(() => {
  return dateObject.value.toLocaleDateString('en-us', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
})
</script>

<template>
  <time :datetime="dateObject.toISOString()">{{ formattedDate }}</time>
</template>
