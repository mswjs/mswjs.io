<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vitepress'
import { Bars3Icon as MenuIcon, XMarkIcon as CloseIcon } from '@heroicons/vue/24/solid'
import MobileMenuContainer from './MobileMenuContainer.vue'

const isOpen = ref(false)
const route = useRoute()

watch(
  () => route.path,
  () => {
    isOpen.value = false
  },
)
</script>

<template>
  <button
    class="px-2 py-1 hover:text-white transition-colors"
    aria-labelledby="Menu"
    @click="isOpen = !isOpen"
  >
    <CloseIcon v-if="isOpen" class="w-[22px] text-white" />
    <MenuIcon v-else class="w-[22px]" />
  </button>
  <MobileMenuContainer
    id="mobile-menu-container"
    :is-open="isOpen"
    @close="isOpen = false"
  >
    <slot />
  </MobileMenuContainer>
</template>
