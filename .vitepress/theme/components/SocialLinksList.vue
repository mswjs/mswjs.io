<script setup lang="ts">
import GitHubIcon from './icons/github.svg?component'
import TwitterIcon from './icons/twitter.svg?component'
import YouTubeIcon from './icons/youtube.svg?component'
import DiscordIcon from './icons/discord.svg?component'
import OpenCollectiveIcon from './icons/opencollective.svg?component'
</script>

<template>
  <ul class="flex items-center gap-1 mt-5 -ml-2">
    <li>
      <a
        href="https://github.com/mswjs"
        aria-label="GitHub organization"
        class="flex p-2 hover:text-white"
        target="_blank"
        rel="noopener noreferrer"
      >
        <GitHubIcon class="w-[20px]" />
      </a>
    </li>
    <li>
      <a
        href="https://twitter.com/ApiMocking"
        aria-label="Twitter account"
        class="flex p-2 hover:text-white"
        target="_blank"
        rel="noopener noreferrer"
      >
        <TwitterIcon class="w-[20px]" />
      </a>
    </li>
    <li>
      <a
        href="https://youtube.com/c/MockServiceWorker"
        aria-label="YouTube channel"
        class="flex p-2 hover:text-white"
        target="_blank"
        rel="noopener noreferrer"
      >
        <YouTubeIcon class="w-[20px]" />
      </a>
    </li>
    <li>
      <a
        href="https://kettanaito.com/discord"
        aria-label="Discord server"
        class="flex p-2 hover:text-white"
        target="_blank"
        rel="noopener noreferrer"
      >
        <DiscordIcon class="w-[20px]" />
      </a>
    </li>
    <li>
      <a
        href="https://opencollective.com/mswjs"
        aria-label="Open Collective page"
        class="flex p-2 hover:text-white"
        rel="noopener noreferrer"
        target="_blank"
      >
        <OpenCollectiveIcon class="w-[20px]" />
      </a>
    </li>
  </ul>
</template>
