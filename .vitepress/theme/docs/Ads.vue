<script setup lang="ts">
import { onMounted, ref } from 'vue'

defineProps<{
  publisher: string
}>()

const isAdBlockerDetected = ref(false)

onMounted(() => {
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
      class="horizontal dark flat"
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
