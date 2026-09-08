<script setup lang="ts">
import { computed } from 'vue'
import { useData, useRoute, useRouter } from 'vitepress'
import type { DefaultTheme } from 'vitepress/theme'
import { VPNavBarSearch, VPSocialLinks } from 'vitepress/theme-without-fonts'
import VPSwitchAppearance from 'vitepress/dist/client/theme-default/components/VPSwitchAppearance.vue'
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
const router = useRouter()

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

function navigateToBranding(): void {
  emit('closeMenu')
  router.go('/branding')
}

</script>

<template>
  <header
    class="top-0 z-50 w-full border-b border-neutral-800 bg-neutral-900 min-[960px]:fixed min-[960px]:top-[var(--site-layout-top-height)]"
    :class="stickyOnMobile ? 'sticky' : 'relative'"
  >
    <div
      class="mx-auto flex h-16 max-w-[var(--vp-layout-max-width)] items-center justify-between gap-6 px-6 md:px-8"
    >
      <div class="flex h-full shrink-0 items-center gap-8">
        <a
          href="/"
          class="site-header-logo flex shrink-0 items-center rounded-lg"
          aria-label="Mock Service Worker home"
          @contextmenu.prevent="navigateToBranding"
        >
          <img src="/logo.svg" alt="" class="h-9 w-9" />
        </a>

        <nav
          class="hidden h-full items-center gap-6 font-medium md:flex"
          aria-label="Main navigation"
        >
          <a
            v-for="item in navigationItems"
            :key="item.link"
            :href="item.link"
            :target="item.target"
            :rel="item.rel"
            class="flex h-full items-center hover:text-primary"
            :class="isActive(item) ? 'text-primary' : 'text-white'"
            :aria-current="isActive(item) ? 'page' : undefined"
          >
            {{ item.text }}
          </a>
        </nav>
      </div>

      <div class="flex min-w-0 items-center gap-4">
        <VPNavBarSearch class="!p-0" />
        <VPSwitchAppearance />
        <div class="hidden border-l border-neutral-800 pl-3 md:flex">
          <VPSocialLinks :links="theme.socialLinks" />
        </div>

        <button
          type="button"
          data-site-menu-trigger
          class="flex h-10 w-10 shrink-0 items-center justify-center text-white md:hidden"
          :aria-expanded="menuOpen"
          aria-controls="site-mobile-menu"
          :aria-label="menuOpen ? 'Close menu' : 'Open menu'"
          @click="emit('toggleMenu')"
        >
          <XMarkIcon v-if="menuOpen" class="h-6 w-6" />
          <Bars3Icon v-else class="h-6 w-6" />
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
        class="w-full border-b border-neutral-800 py-4 font-medium last:border-b-0 hover:text-primary"
        :class="isActive(item) ? 'text-primary' : 'text-white'"
        @click="emit('closeMenu')"
      >
        {{ item.text }}
      </a>
      <VPSocialLinks class="pt-4" :links="theme.socialLinks" />
    </nav>
  </header>
</template>

<style scoped>
header :deep(.VPSocialLink),
header :deep(.DocSearch-Button),
header :deep(.DocSearch-Button *),
header :deep(.VPSwitch) {
  transition: none !important;
}

header :deep(.VPSocialLink:hover) {
  color: var(--primary);
}
</style>
