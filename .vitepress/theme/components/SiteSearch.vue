<script setup lang="ts">
import { defineAsyncComponent, onMounted, onUnmounted, ref } from 'vue'
import { MagnifyingGlassIcon } from '@heroicons/vue/24/outline'

// The search box ships the search index, so it loads on first use.
const VPLocalSearchBox = defineAsyncComponent(() => {
  return import('vitepress/dist/client/theme-default/components/VPLocalSearchBox.vue')
})

const searchOpen = ref(false)

function isEditingContent(event: KeyboardEvent): boolean {
  if (!(event.target instanceof HTMLElement)) {
    return false
  }

  return (
    event.target.isContentEditable ||
    ['INPUT', 'SELECT', 'TEXTAREA'].includes(event.target.tagName)
  )
}

function handleSearchHotKey(event: KeyboardEvent): void {
  const isCommandPaletteKey =
    event.key.toLowerCase() === 'k' && (event.metaKey || event.ctrlKey)
  const isSlashKey = event.key === '/' && !isEditingContent(event)

  if (isCommandPaletteKey || isSlashKey) {
    event.preventDefault()
    searchOpen.value = true
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleSearchHotKey)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleSearchHotKey)
})
</script>

<template>
  <VPLocalSearchBox v-if="searchOpen" @close="searchOpen = false" />

  <button
    type="button"
    class="flex h-full items-center justify-between gap-2 px-5 text-[color:var(--vp-c-text-2)] focus-visible:-outline-offset-2"
    aria-label="Search"
    @click="searchOpen = true"
  >
    <span class="flex items-center gap-1.5">
      <MagnifyingGlassIcon class="size-3.5" />
      <span class="pr-3 text-[13px] font-medium leading-5">Search</span>
    </span>
    <!-- Key caps form one rounded pill sharing a single divider. The
         modifier key is drawn in CSS because the platform is only known
         on the client. -->
    <span
      class="flex items-center text-xs font-medium leading-none"
      dir="ltr"
    >
      <kbd
        class="flex h-5 min-w-5 items-center justify-center rounded-l bg-[var(--vp-c-bg-soft)] px-1.5 font-sans shadow-[inset_0_0_0_1px_var(--vp-c-border)] after:content-['Ctrl'] [.mac_&]:px-0 [.mac_&]:after:content-['⌘']"
      ></kbd>
      <kbd
        class="-ml-px flex h-5 min-w-5 items-center justify-center rounded-r bg-[var(--vp-c-bg-soft)] px-1.5 font-sans [.mac_&]:px-0 shadow-[inset_0_0_0_1px_var(--vp-c-border)]"
      >
        K
      </kbd>
    </span>
  </button>
</template>
