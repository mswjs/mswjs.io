<script setup lang="ts">
import { useData } from 'vitepress'
import Container from './Container.vue'
import NavLink from './NavLink.vue'
import SearchButton from './SearchButton.vue'
import SponsorLink from './SponsorLink.vue'
import MobileMenu from './MobileMenu.vue'

defineProps<{
  logo: string
  compact?: boolean
}>()

const { theme } = useData()

const handleLogoContextMenu = (event: MouseEvent) => {
  const brandingUrl = theme.value.brandingUrl

  if (brandingUrl) {
    event.preventDefault()
    location.href = brandingUrl
  }
}
</script>

<template>
  <header
    class="header sticky top-0 z-10 text-sm h-[60px] font-semibold bg-neutral-900 border-b h-15 border-neutral-800"
  >
    <Container :compact="compact" class="h-full">
      <div
        class="grid items-center h-full xl:grid-cols-12 gap-6 md:gap-16 grid-cols-[auto_1fr_auto]"
      >
        <div class="xl:col-span-2 flex">
          <a
            href="/"
            title="Mock Service Worker"
            class="hover:opacity-70 inline-flex"
            @contextmenu="handleLogoContextMenu"
          >
            <img :src="logo" class="w-9 h-9" />
          </a>
        </div>
        <div
          class="xl:col-span-3 pl-3 xl:p-0"
          :class="{ 'xl:col-start-4': compact }"
        >
          <SearchButton />
        </div>
        <nav
          aria-label="Main navigation"
          class="-mb-px text-neutral-400 justify-self-end"
          :class="{
            'xl:col-span-7': !compact,
            'xl:col-span-6': compact,
          }"
        >
          <ul class="flex items-center gap-4 list-none">
            <li
              v-for="(link, index) of theme.links"
              :key="link.href"
              class="hidden md:block"
              :class="{ 'lg:block': index === 1 }"
            >
              <NavLink :href="link.href" :target="link.target">
                {{ link.label }}
              </NavLink>
            </li>
            <li>
              <SponsorLink />
            </li>
            <li class="flex w-[38px] lg:hidden items-center -mr-2">
              <MobileMenu>
                <nav id="mobile-menu">
                  <ul>
                    <li v-for="link of theme.links" :key="link.href">
                      <NavLink :href="link.href" :target="link.target">
                        {{ link.label }}
                      </NavLink>
                    </li>
                  </ul>
                </nav>
              </MobileMenu>
            </li>
          </ul>
        </nav>
      </div>
    </Container>
  </header>
</template>
