<script setup lang="ts">
import { NewspaperIcon } from '@heroicons/vue/24/solid'
import GitHubIcon from '../components/icons/github.vue'
import DiscordIcon from '../components/icons/discord.vue'

defineProps<{
  gitHubUrl: string
  blogUrl: string
}>()

const DISCORD_URL = 'https://kettanaito.com/discord'
</script>

<template>
  <section>
    <h4 class="text-xs mb-2 font-bold tracking-widest text-white uppercase">
      Community
    </h4>
    <ul>
      <li>
        <a
          :href="gitHubUrl"
          class="py-1.5 inline-flex items-center gap-1.5 leading-5 text-neutral-400 hover:text-white"
          target="_blank"
          rel="noopener noreferrer"
        >
          <GitHubIcon class="text-lg w-5" />
          <span>GitHub</span>
        </a>
      </li>
      <li>
        <a
          :href="DISCORD_URL"
          class="py-1.5 inline-flex items-center gap-1.5 leading-5 text-neutral-400 hover:text-white"
          target="_blank"
          rel="noopener noreferrer"
        >
          <DiscordIcon class="text-lg w-5" />
          <span>Discord</span>
        </a>
      </li>
      <li>
        <a
          :href="blogUrl"
          class="py-1.5 inline-flex items-center gap-1.5 leading-5 text-neutral-400 hover:text-white"
          target="_blank"
        >
          <NewspaperIcon class="w-5" />
          <span>Blog</span>
        </a>
      </li>
    </ul>
  </section>
</template>
