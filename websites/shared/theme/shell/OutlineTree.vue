<script setup lang="ts">
import type { DocumentOutlineItem } from '../composables/useDocumentOutline'

defineProps<{
  items: Array<DocumentOutlineItem>
  activeLink: string | null
  depth?: number
}>()

defineEmits<{
  navigate: []
}>()
</script>

<template>
  <ul class="grid grid-cols-[2px_minmax(0,1fr)]">
    <li
      v-for="item in items"
      :key="item.link"
      class="col-span-2 grid grid-cols-subgrid"
    >
      <span
        aria-hidden="true"
        class="h-full w-px bg-neutral-800"
        :class="{
          'w-0.5 bg-primary': activeLink === item.link,
        }"
      />
      <div class="min-w-0 pl-4">
        <a
          :href="item.link"
          class="block py-1 leading-5 text-neutral-400 transition-colors hover:text-white"
          :class="{
            'text-primary': activeLink === item.link,
          }"
          :data-outline-active="activeLink === item.link || undefined"
          @click="$emit('navigate')"
        >
          {{ item.title }}
        </a>
        <OutlineTree
          v-if="item.children.length > 0"
          :items="item.children"
          :active-link="activeLink"
          :depth="(depth ?? 0) + 1"
          @navigate="$emit('navigate')"
        />
      </div>
    </li>
  </ul>
</template>
