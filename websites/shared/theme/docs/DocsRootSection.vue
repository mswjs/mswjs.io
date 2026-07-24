<script setup lang="ts">
import { computed, type Component } from 'vue'
import {
  Bars2Icon as MenuIcon,
  NewspaperIcon,
  CubeTransparentIcon as CubeIcon,
  BeakerIcon,
  GlobeAltIcon as GlobeIcon,
  TrophyIcon,
  CommandLineIcon,
  ServerIcon,
  ChatBubbleBottomCenterIcon,
  CloudArrowDownIcon as ServerSentEventsIcon,
} from '@heroicons/vue/24/solid'
import type { SidebarItem } from '../../sidebar'
import GraphQLIcon from '../components/icons/graphql.vue'
import DocsNavTree from './DocsNavTree.vue'

const props = defineProps<{
  title: string
  items: Array<SidebarItem>
}>()

const rootSectionIcons: Record<string, Component> = {
  'Mocking HTTP': ServerIcon,
  'Mocking SSE': ServerSentEventsIcon,
  'Mocking GraphQL': GraphQLIcon,
  'Mocking WebSocket': ChatBubbleBottomCenterIcon,

  Basics: NewspaperIcon,
  'Network behavior': GlobeIcon,
  Integrations: MenuIcon,
  Concepts: MenuIcon,
  'Best practices': TrophyIcon,
  API: CubeIcon,
  CLI: CommandLineIcon,
  Recipes: BeakerIcon,
}

const iconComponent = computed(() => {
  return rootSectionIcons[props.title] || MenuIcon
})
</script>

<template>
  <span
    class="block pt-10 mt-10 mb-3 text-sm font-bold tracking-widest uppercase border-t border-neutral-800"
  >
    <span
      class="inline-flex items-center justify-center mr-2 w-5 h-5 rounded-sm align-top bg-primary bg-opacity-10"
    >
      <component :is="iconComponent" class="w-4 text-primary" />
    </span>
    {{ title }}
  </span>
  <DocsNavTree :items="items" item-kind="page" />
</template>
