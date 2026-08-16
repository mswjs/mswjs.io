<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useData, useRoute } from 'vitepress'
import type { DefaultTheme } from 'vitepress/theme'
import { VPNavBarSearch } from 'vitepress/theme-without-fonts'
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline'

defineProps<{
  menuOpen: boolean
  stickyOnMobile: boolean
}>()

const emit = defineEmits<{
  toggleMenu: []
  closeMenu: []
}>()

const { theme } = useData<DefaultTheme.Config>()
const route = useRoute()
const logoLink = ref<HTMLAnchorElement>()

const navigationItems = computed(() => {
  return (theme.value.nav ?? []).filter(
    (item): item is DefaultTheme.NavItemWithLink => {
      return 'link' in item
    },
  )
})

function isActive(item: DefaultTheme.NavItemWithLink): boolean {
  if (item.activeMatch) {
    return new RegExp(item.activeMatch).test(route.path)
  }

  return route.path === item.link
}

onMounted(() => {
  logoLink.value?.addEventListener('contextmenu', (event) => {
    event.preventDefault()
    location.href = '/branding'
  })
})
</script>

<template>
  <header
    class="z-50 w-full border-b border-neutral-800 bg-neutral-900 min-[960px]:fixed"
    :class="stickyOnMobile ? 'sticky' : 'relative'"
    :style="{ top: 'var(--site-layout-top-height)' }"
  >
    <div
      class="relative mx-auto grid h-16 border-x max-w-[var(--vp-layout-max-width)] grid-cols-[auto_minmax(0,1fr)] px-6 md:px-8 min-[960px]:grid-cols-[var(--vp-sidebar-width)_minmax(0,1fr)] min-[960px]:px-0"
    >
      <div class="flex items-center">
        <a
          ref="logoLink"
          href="/"
          class="px-4 border-r h-full flex items-center justify-center"
          aria-label="Mock Service Worker home"
        >
          <img src="/logo.svg" alt="" class="h-9 w-9" />
        </a>
      </div>

      <div class="grid min-w-0 grid-cols-[1fr_auto] items-center gap-4">
        <div
          class="justify-self-end md:justify-self-start border-x px-4 h-full flex items-center justify-center"
        >
          <VPNavBarSearch class="!p-0" />
        </div>

        <nav
          class="hidden grid-flow-col items-center gap-4 px-4 border-l text-sm font-medium md:grid"
          aria-label="Main navigation"
        >
          <a
            v-for="item in navigationItems"
            :key="item.link"
            :href="item.link"
            :target="item.target"
            :rel="item.rel"
            class="flex h-16 items-center px-3 text-white transition-colors hover:text-primary"
            :class="{ 'text-primary': isActive(item) }"
          >
            {{ item.text }}
          </a>
        </nav>

        <button
          type="button"
          data-site-menu-trigger
          class="flex h-12 w-12 items-center justify-center text-white md:hidden"
          :aria-expanded="menuOpen"
          aria-controls="site-mobile-menu"
          :aria-label="menuOpen ? 'Close menu' : 'Open menu'"
          @click="emit('toggleMenu')"
        >
          <XMarkIcon v-if="menuOpen" class="h-8 w-8" />
          <Bars3Icon v-else class="h-8 w-8" />
        </button>
      </div>
    </div>

    <nav
      v-if="menuOpen"
      id="site-mobile-menu"
      class="absolute inset-x-0 top-full grid gap-0 border-b border-neutral-800 bg-neutral-900 px-6 py-4 md:hidden"
      aria-label="Mobile navigation"
    >
      <a
        v-for="item in navigationItems"
        :key="item.link"
        :href="item.link"
        :target="item.target"
        :rel="item.rel"
        class="w-full border-b border-neutral-800 py-5 text-lg font-medium text-white last:border-b-0 hover:text-primary"
        :class="{ 'text-primary': isActive(item) }"
        @click="emit('closeMenu')"
      >
        {{ item.text }}
      </a>
    </nav>
  </header>
</template>
