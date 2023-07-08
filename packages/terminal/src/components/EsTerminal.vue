<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useDark } from '@vueuse/core'
import { usarTerminal } from '../composables/usarTerminal'

const terminalElement = ref()

const terminal = usarTerminal()

onMounted(() => {
  terminal.setupTerminal(terminalElement.value, {
    theme: useDark().value ? 'dark' : 'light',
  })
})

onBeforeUnmount(() => {
  terminal.destroyTerminal()
})
</script>

<template>
  <div ref="terminalElement" style="width: 100%; height: 100%" />
</template>

<style>
@import '../style.css';
</style>
