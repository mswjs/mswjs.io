<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue'
import { useRoute } from 'vitepress'
import type { DefaultTheme } from 'vitepress/theme'
import { ChevronRightIcon } from '@heroicons/vue/20/solid'

const props = defineProps<{
  item: DefaultTheme.SidebarItem
  depth: number
}>()

const route = useRoute()
const collapsed = ref(Boolean(props.item.collapsed))
const hasChildren = computed(() => {
  return Boolean(props.item.items?.length)
})
const collapsible = computed(() => {
  return props.item.collapsed != null && hasChildren.value
})

function normalizePath(path: string): string {
  const cleanPath = path.split(/[?#]/)[0].replace(/\/$/, '')
  return cleanPath || '/'
}

const active = computed(() => {
  if (!props.item.link) {
    return false
  }

  return normalizePath(route.path) === normalizePath(props.item.link)
})

function containsActiveItem(item: DefaultTheme.SidebarItem): boolean {
  if (
    item.link &&
    normalizePath(route.path) === normalizePath(item.link)
  ) {
    return true
  }

  return Boolean(item.items?.some(containsActiveItem))
}

const containsActive = computed(() => {
  return containsActiveItem(props.item)
})

watchEffect(() => {
  if (containsActive.value) {
    collapsed.value = false
  }
})

function toggle(): void {
  if (!collapsible.value) {
    return
  }

  collapsed.value = !collapsed.value
}
</script>

<template>
  <section
    class="min-w-0"
    :class="{
      'pb-6': depth === 0 && !collapsed,
      'pb-2.5': depth === 0 && collapsed,
    }"
  >
    <div class="relative flex min-h-8 w-full items-start">
      <a
        v-if="item.link"
        :href="item.link"
        :rel="item.rel"
        :target="item.target"
        class="min-w-0 flex-1 py-1 leading-6 transition-colors hover:text-primary"
        :class="{
          'font-bold text-white': depth === 0,
          'font-medium text-neutral-400': depth > 0,
          'text-primary': active,
          'text-white': containsActive && !active,
        }"
        :data-sidebar-active="active || undefined"
        v-html="item.text"
      />

      <button
        v-else
        type="button"
        class="min-w-0 flex-1 py-1 text-left leading-6"
        :class="{
          'cursor-pointer': collapsible,
          'font-bold text-white': depth === 0,
          'font-medium text-neutral-400': depth > 0,
          'text-white': containsActive,
        }"
        :disabled="!collapsible"
        @click="toggle"
        v-html="item.text"
      />

      <button
        v-if="collapsible"
        type="button"
        class="flex h-8 w-8 shrink-0 items-center justify-center text-neutral-500 hover:text-white"
        :aria-expanded="!collapsed"
        aria-label="Toggle section"
        @click="toggle"
      >
        <ChevronRightIcon
          class="h-4 w-4 transition-transform"
          :class="{ 'rotate-90': !collapsed }"
        />
      </button>
    </div>

    <div
      v-if="hasChildren && !collapsed"
      class="min-w-0"
      :class="{
        'border-l border-neutral-800 pl-4': depth > 0,
      }"
    >
      <SidebarItem
        v-for="child in item.items"
        :key="`${child.text}-${child.link}`"
        :item="child"
        :depth="depth + 1"
      />
    </div>
  </section>
</template>
