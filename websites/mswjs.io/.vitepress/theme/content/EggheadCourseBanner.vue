<script setup lang="ts">
defineProps<{
  courseUrl: string
  thumbnailUrl: string
  title: string
  description: string
}>()
</script>

<template>
  <div class="@container">
    <a
      :href="courseUrl"
      target="_blank"
      rel="noopener noreferrer"
      class="relative group my-10 px-5 py-5 min-h-[125px] grid grid-rows-[160px,1fr] @lg:grid-rows-1 @lg:grid-cols-[150px_1fr] gap-5 @lg:gap-8 items-center bg-neutral-800 bg-opacity-40 border border-neutral-800 rounded-lg no-underline hover:bg-opacity-70"
    >
      <img
        :src="thumbnailUrl"
        class="mx-auto w-[200px] -translate-y-5 group-hover:-translate-y-[35px] transition-transform duration-500 @lg:absolute @lg:top-0 @lg:w-[170px] @lg:-translate-y-[25px] @lg:left-3 @lg:m-0"
      />
      <div class="@lg:col-start-2">
        <h4 class="mt-0">{{ title }}</h4>
        <p class="mb-0 text-neutral-400 leading-6">{{ description }}</p>
      </div>
    </a>
  </div>
</template>
