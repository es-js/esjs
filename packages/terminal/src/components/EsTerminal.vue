<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import debounce from 'lodash.debounce'
import { useDark } from '@vueuse/core'
import { usarTerminal } from '../composables/usarTerminal'

const terminalElement = ref()

const terminal = usarTerminal()

const onResizeDebounced = debounce(() => {
  terminal.fitTerminal()
}, 10)

onMounted(() => {
  terminal.setupTerminal(terminalElement.value, {
    theme: terminal.getThemeConfig(useDark().value ? 'dark' : 'light'),
  })

  setTimeout(() => onResizeDebounced(), 10)

  window.addEventListener('resize', onResizeDebounced)
})

onBeforeUnmount(() => {
  terminal.destroyTerminal()

  window.removeEventListener('resize', onResizeDebounced)
})
</script>

<template>
  <div ref="terminalElement" style="width: 100%; height: 100%" />
</template>

<style>
@import '../style.css';
</style>
