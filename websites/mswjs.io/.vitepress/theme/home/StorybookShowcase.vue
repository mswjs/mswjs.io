<script setup lang="ts">
import StorybookBookmarkIcon from './StorybookBookmarkIcon.vue'
import StorybookIcon from '@mswjs/shared/theme/components/icons/storybook.vue'
</script>

<template>
  <div class="flex flex-col md:flex-row border border-neutral-700 rounded-lg w-full select-none overflow-hidden">
    <div>
      <div class="flex-1 py-4">
        <ul>
          <li class="mt-1.5 mb-2 px-4 uppercase font-bold text-sm text-neutral-500 tracking-widest">Components</li>
          <li>
            <p class="flex items-center gap-2 px-4">
              <span class="inline-flex w-4 h-4 items-center justify-center text-xs border border-blue-500 rounded-sm text-blue-500">+</span>
              <span class="font-bold">ProductDetail</span>
            </p>
            <ul>
              <li class="px-8 py-0.5 bg-neutral-800 font-bold">
                <StorybookBookmarkIcon class="inline-block align-baseline text-[#37d5d3]" /> Idle</li>
              <li class="px-8 py-0.5">
                <StorybookBookmarkIcon class="inline-block align-baseline text-[#37d5d3]" /> Network error</li>
              <li class="px-8 py-0.5">
                <StorybookBookmarkIcon class="inline-block align-baseline text-[#37d5d3]" /> Added to cart</li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
    <div class="flex-1 flex items-center justify-center p-12 bg-neutral-800">
      <StorybookIcon class="fill-[#ff528c] w-12" />
    </div>
  </div>
</template>
