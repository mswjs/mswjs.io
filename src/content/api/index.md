---
title: API
layout: false
search: false
---

<script setup lang="ts">
import { onMounted } from 'vue'
import { useData } from 'vitepress'

const { frontmatter } = useData()

onMounted(() => {
  const destination = frontmatter.value.redirect

  if (typeof destination === 'string') {
    window.location.replace(destination)
  }
})
</script>

<a :href="frontmatter.redirect">Open API reference</a>
