<script setup lang="ts">
import { onMounted, ref, watchEffect } from 'vue'
import { useData } from 'vitepress'

defineProps<{
  publisher: string
}>()

const { isDark } = useData()
const adElement = ref<HTMLDivElement>()
const isAdBlockerDetected = ref(false)

onMounted(() => {
  // Toggle the class directly since the ad client
  // adds its own classes to this element.
  watchEffect(() => {
    adElement.value?.classList.toggle('dark', isDark.value)
  })

  const script = document.createElement('script')
  script.async = true
  script.src = 'https://media.ethicalads.io/media/client/ethicalads.min.js'
  script.onerror = () => {
    isAdBlockerDetected.value = true
  }
  document.head.appendChild(script)
})
</script>

<template>
  <div id="ethical-container">
    <div
      ref="adElement"
      class="horizontal flat"
      :data-ea-publisher="publisher"
      data-ea-type="text"
    />
    <div v-if="isAdBlockerDetected" id="adblocker-warning">
      <div class="warning custom-block">
        <p>
          <strong>Please consider disabling AdBlocker for this site.</strong>
          Thank you for supporting the project.
        </p>
      </div>
    </div>
  </div>
</template>
