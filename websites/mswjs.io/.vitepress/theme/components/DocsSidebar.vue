<script setup lang="ts">
import { nextTick, ref, watch } from 'vue'
import type { DefaultTheme } from 'vitepress/theme'
import SidebarItem from './SidebarItem.vue'

const props = defineProps<{
  items: Array<DefaultTheme.SidebarItem>
  open: boolean
}>()

defineEmits<{
  close: []
}>()

const navigation = ref<HTMLElement>()

watch(
  () => props.open,
  (open) => {
    if (!open) {
      return
    }

    nextTick(() => {
      navigation.value?.focus()
    })
  },
)
</script>

<template>
  <button
    v-if="open"
    type="button"
    class="fixed inset-0 z-40 bg-black/60 min-[960px]:hidden"
    aria-label="Close documentation navigation"
    @click="$emit('close')"
  />

  <aside
    v-if="items.length > 0"
    data-docs-sidebar
    class="fixed bottom-0 left-0 z-40 w-[calc(100vw-4rem)] max-w-80 -translate-x-full overflow-y-auto overscroll-contain border-r border bg-neutral-900 px-8 pb-24 pt-8 opacity-0 transition min-[960px]:top-[calc(var(--site-layout-top-height)+4rem)] min-[960px]:block min-[960px]:w-[var(--vp-sidebar-width)] min-[960px]:max-w-none min-[960px]:translate-x-0 min-[960px]:opacity-100 min-[1440px]:left-[calc((100vw-var(--vp-layout-max-width))/2)]"
    :class="{
      'top-[calc(var(--site-layout-top-height)+7rem)] translate-x-0 opacity-100':
        open,
      'top-[calc(var(--site-layout-top-height)+7rem)]': !open,
    }"
    @click.stop
  >
    <nav
      ref="navigation"
      id="docs-sidebar-navigation"
      aria-label="Documentation navigation"
      tabindex="-1"
    >
      <SidebarItem
        v-for="item in items"
        :key="`${item.text}-${item.link}`"
        :item="item"
        :depth="0"
      />
    </nav>
  </aside>
</template>
