<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue'
import { useData, useRoute } from 'vitepress'
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
const { theme } = useData<DefaultTheme.Config & { apiReleaseTag?: string }>()
const route = useRoute()
const releaseTag = computed(() => {
  if (route.path === '/api' || route.path.startsWith('/api/')) {
    return theme.value.apiReleaseTag
  }
})

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
    class="docs-sidebar-mask fixed inset-0 z-40 bg-black/60 min-[960px]:hidden"
    aria-label="Close documentation navigation"
    @click="$emit('close')"
  />

  <aside
    v-if="items.length > 0"
    class="fixed flex flex-col bottom-0 left-0 z-40 w-[calc(100vw-4rem)] max-w-80 -translate-x-full overflow-hidden border-r border bg-neutral-900 opacity-0 transition min-[960px]:top-[calc(var(--site-layout-top-height)+4rem)] min-[960px]:flex min-[960px]:w-[var(--vp-sidebar-width)] min-[960px]:max-w-none min-[960px]:translate-x-0 min-[960px]:opacity-100 min-[1440px]:left-[calc((100vw-var(--vp-layout-max-width))/2)]"
    :class="{
      'top-[calc(var(--site-layout-top-height)+7rem)] translate-x-0 opacity-100':
        open,
      'top-[calc(var(--site-layout-top-height)+7rem)]': !open,
    }"
    @click.stop
  >
    <nav
      ref="navigation"
      data-docs-sidebar
      id="docs-sidebar-navigation"
      class="min-h-0 flex-1 overflow-y-auto overscroll-contain px-8 pb-24 pt-8 text-sm min-[960px]:pt-[60px] min-[1280px]:pt-3"
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
    <div
      v-if="releaseTag"
      class="shrink-0 border-t py-2 pl-8 pr-3 text-sm text-neutral-500 dark:text-neutral-400"
    >
      <a
        :href="`https://github.com/mswjs/msw/releases/tag/${encodeURIComponent(releaseTag)}`"
        target="_blank"
        rel="noopener noreferrer"
        class="tabular-nums text-inherit hover:text-inherit hover:underline"
      >{{ releaseTag }}</a>
    </div>
  </aside>
</template>
