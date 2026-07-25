<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import { onContentUpdated, useData } from 'vitepress'
import type { DefaultTheme } from 'vitepress/theme'
import {
  ChevronRightIcon,
  ListBulletIcon,
} from '@heroicons/vue/20/solid'
import type { DocumentOutlineItem } from '../composables/useDocumentOutline'
import OutlineTree from './OutlineTree.vue'

const props = defineProps<{
  hasSidebar: boolean
  sidebarOpen: boolean
  outlineItems: Array<DocumentOutlineItem>
  activeOutlineLink: string | null
}>()

const emit = defineEmits<{
  openSidebar: []
}>()

const { theme } = useData<DefaultTheme.Config>()
const outlineOpen = ref(false)
const root = ref<HTMLDivElement>()

function toggleOutline(): void {
  outlineOpen.value = !outlineOpen.value
}

function closeOutline(): void {
  outlineOpen.value = false
}

function scrollToTop(): void {
  closeOutline()
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth',
  })
}

function handleDocumentClick(event: MouseEvent): void {
  if (
    outlineOpen.value &&
    event.target instanceof Node &&
    !root.value?.contains(event.target)
  ) {
    closeOutline()
  }
}

function handleEscape(event: KeyboardEvent): void {
  if (event.key === 'Escape') {
    closeOutline()
  }
}

function handleOutlineNavigation(): void {
  nextTick(closeOutline)
}

onMounted(() => {
  document.addEventListener('click', handleDocumentClick)
  window.addEventListener('keydown', handleEscape)
})

onContentUpdated(closeOutline)

onBeforeUnmount(() => {
  document.removeEventListener('click', handleDocumentClick)
  window.removeEventListener('keydown', handleEscape)
})
</script>

<template>
  <div
    v-if="hasSidebar || outlineItems.length > 0"
    class="sticky top-[var(--site-layout-top-height)] z-30 w-full border-b border-neutral-800 bg-neutral-900 min-[960px]:top-[calc(var(--site-layout-top-height)+4rem)] min-[960px]:pl-[var(--vp-sidebar-width)] min-[1280px]:hidden min-[1440px]:mx-auto min-[1440px]:max-w-[var(--vp-layout-max-width)]"
  >
    <div
      class="grid min-h-12 grid-cols-[1fr_auto] items-center px-6 md:px-8 min-[960px]:justify-items-end min-[960px]:pr-8"
    >
      <button
        v-if="hasSidebar"
        type="button"
        data-sidebar-trigger
        class="inline-flex items-center gap-2 py-3 text-sm font-medium text-neutral-400 hover:text-white min-[960px]:hidden"
        :aria-expanded="sidebarOpen"
        aria-controls="docs-sidebar-navigation"
        @click="emit('openSidebar')"
      >
        <ListBulletIcon class="h-5 w-5" />
        {{ theme.sidebarMenuLabel ?? 'Menu' }}
      </button>

      <div
        ref="root"
        class="relative col-start-2 justify-self-end"
      >
        <button
          v-if="outlineItems.length > 0"
          type="button"
          class="inline-flex items-center gap-1 py-3 text-sm font-medium text-neutral-400 hover:text-white"
          :aria-expanded="outlineOpen"
          aria-controls="local-outline-menu"
          @click="toggleOutline"
        >
          {{
            typeof theme.outline === 'object' &&
            !Array.isArray(theme.outline)
              ? (theme.outline.label ?? 'Contents')
              : 'Contents'
          }}
          <ChevronRightIcon
            class="h-4 w-4 transition-transform"
            :class="{ 'rotate-90': outlineOpen }"
          />
        </button>

        <button
          v-else
          type="button"
          class="py-3 text-sm font-medium text-neutral-400 hover:text-white"
          @click="scrollToTop"
        >
          {{ theme.returnToTopLabel ?? 'Return to top' }}
        </button>

        <Transition
          enter-active-class="transition duration-200 ease-out"
          enter-from-class="-translate-y-4 opacity-0"
          leave-active-class="transition duration-150 ease-in"
          leave-to-class="-translate-y-4 opacity-0"
        >
          <div
            v-if="outlineOpen"
            id="local-outline-menu"
            class="absolute right-0 top-full z-40 grid max-h-[calc(100vh-7rem)] w-[min(20rem,calc(100vw-3rem))] gap-px overflow-y-auto rounded-lg border border-neutral-700 bg-neutral-700 shadow-xl"
          >
            <a
              href="#"
              class="bg-neutral-800 px-4 leading-[48px] text-sm font-medium text-primary"
              @click.prevent="scrollToTop"
            >
              {{ theme.returnToTopLabel ?? 'Return to top' }}
            </a>
            <div class="bg-neutral-800 px-4 py-2 text-[13px] font-medium">
              <OutlineTree
                :items="outlineItems"
                :active-link="activeOutlineLink"
                @navigate="handleOutlineNavigation"
              />
            </div>
          </div>
        </Transition>
      </div>
    </div>
  </div>
</template>
