<script setup lang="ts">
import { createSandbox } from '@es-js/sandbox/render'
import { onMounted, ref } from 'vue'

const props = defineProps({
  code: {
    type: String,
    default: '',
  },
  testsCode: {
    type: String,
    default: '',
  },
  hidePreview: {
    type: [Boolean, String],
    default: false,
  },
  hideConsole: {
    type: [Boolean, String],
    default: false,
  },
  height: {
    type: String,
    default: '30em',
  },
})

const sandboxElement = ref<HTMLDivElement | null>(null)

onMounted(() => {
  if (!sandboxElement.value)
    return

  createSandbox(sandboxElement.value, {
    theme: 'dark',
    hidePreview: String(props.hidePreview) === 'true',
    previewTab: String(props.hideConsole) === 'true' ? 'hidden' : 'console',
    code: props.code,
  })
})
</script>

<template>
  <div ref="sandboxElement" class="w-full relative" :style="{ height: props.height }" />
</template>
