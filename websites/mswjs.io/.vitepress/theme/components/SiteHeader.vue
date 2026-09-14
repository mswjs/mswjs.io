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
// Documentation pages draw the header's rails on the wider documentation
// layout, so the left rail continues into the sidebar border. Every other
// page draws them on the content container, like the homepage sections.
const documentationFramed = computed(() => {
  return ['/docs', '/guides', '/api'].some((rootPath) => {
    return route.path === rootPath || route.path.startsWith(`${rootPath}/`)
  })
})
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
    class="site-header top-0 z-50 w-full bg-neutral-900 text-sm min-[960px]:fixed min-[960px]:top-[var(--site-layout-top-height)]"
    :class="stickyOnMobile ? 'sticky' : 'relative'"
  >
    <!-- Documentation pages share the documentation layout box; every
         other page keeps the header inside the content container. The
         side rails are always drawn: below "lg" the container spans the
         viewport, so they sit on its edges. The header is fixed, so its
         full width is the viewport minus the scrollbar, and centering
         the box lines it up with the content below. -->
    <div :class="{ 'msw-container home-frame': !documentationFramed }">
      <div
        class="flex h-16 items-center justify-between gap-6 border-x border-b border-neutral-800 px-6"
        :class="
          documentationFramed
            ? 'mx-auto max-w-[var(--vp-layout-max-width)] md:px-8 min-[960px]:pl-[calc(2rem+1px)]'
            : 'md:px-10'
        "
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
              class="flex h-full items-center hover:text-primary focus-visible:-outline-offset-2"
              :class="isActive(item) ? 'text-primary' : 'text-white'"
              :aria-current="isActive(item) ? 'page' : undefined"
            >
              {{ item.text }}
            </a>
          </nav>
        </div>

        <div class="flex h-full min-w-0 items-center">
          <div
            class="site-header-search relative z-10 hidden h-[calc(100%+1px)] self-start border border-transparent border-x-neutral-800 hover:border-primary md:flex"
          >
            <VPNavBarSearch class="!p-0" />
          </div>
          <div
            class="-mr-2 hidden h-full items-center gap-3 pl-5 md:flex"
          >
            <VPSwitchAppearance />
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
        class="w-full border-b border-neutral-800 py-4 font-medium last:border-b-0 hover:text-primary focus-visible:-outline-offset-2"
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
