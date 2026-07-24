<script setup lang="ts">
import { nextTick, ref } from 'vue'
import {
  Bars2Icon as MenuIcon,
  XMarkIcon as CloseIcon,
} from '@heroicons/vue/24/solid'
import MobileMenuContainer from '../components/MobileMenuContainer.vue'

const isOpen = ref(false)
const menuRef = ref<InstanceType<typeof MobileMenuContainer> | null>(null)

const handleMenuButtonClick = async () => {
  isOpen.value = !isOpen.value

  if (!isOpen.value) {
    return
  }

  await nextTick()

  const menuElement = menuRef.value?.scrollTrapRef

  if (!menuElement) {
    return
  }

  const activeLinks =
    menuElement.querySelectorAll<HTMLElement>('.docs-link-active')
  // Grab the last active link to scroll into view the child page
  // instead of the first parent page (which will also be active).
  const lastActiveLink = activeLinks[activeLinks.length - 1]

  if (lastActiveLink) {
    lastActiveLink.scrollIntoView({
      block: 'center',
      behavior: 'instant',
    })
    lastActiveLink.focus()
  } else {
    const firstNavLink = menuElement.querySelector('a')
    firstNavLink?.focus()
  }
}
</script>

<template>
  <div>
    <button
      class="fixed z-[6] flex items-center justify-center w-16 h-16 text-black bg-white border-4 border-black rounded-full bottom-5 right-5 xl:hidden"
      tabindex="2"
      aria-label="Docs menu"
      @click="handleMenuButtonClick"
    >
      <CloseIcon v-if="isOpen" class="w-5" />
      <MenuIcon v-else class="w-5" />
    </button>
    <MobileMenuContainer
      ref="menuRef"
      :is-open="isOpen"
      @close="isOpen = false"
    >
      <slot />
    </MobileMenuContainer>
  </div>
</template>
