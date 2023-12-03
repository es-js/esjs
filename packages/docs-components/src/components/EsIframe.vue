<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { EDITOR_BASE_URL } from '../constants/Constants'

const props = defineProps({
  src: {
    type: [String, URL],
    default: EDITOR_BASE_URL,
  },
})

const iframe = ref<HTMLIFrameElement | null>(null)

onMounted(() => {
  iframe.value?.contentWindow?.postMessage({
    type: 'code',
    data: 'test',
  }, '*')
})

const checkDark = () => document.documentElement.classList.contains('dark')
const isDark = ref(checkDark())
const observer = new MutationObserver(() => {
  isDark.value = checkDark()
})

observer.observe(document.documentElement, {
  attributes: true,
  attributeFilter: ['class'],
})

onBeforeUnmount(() => {
  observer.disconnect()
})

watch(isDark, (value) => {
  iframe.value?.contentWindow?.postMessage({
    type: 'dark',
    data: {
      dark: value,
    },
  }, '*')
})
</script>

<template>
  <iframe
    ref="iframe"
    :src="String(props.src)"
    allow="clipboard-read; clipboard-write"
    frameborder="0"
    title="Previsualización en EsJS Editor"
    loading="lazy"
  />
</template>

<style scoped>

</style>
