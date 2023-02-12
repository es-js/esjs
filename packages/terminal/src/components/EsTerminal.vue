<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import debounce from 'lodash.debounce'
import { usarTerminal } from '../composables/usarTerminal'

const terminalElement = ref()

const terminal = usarTerminal()

const onResizeDebounced = debounce(() => {
  terminal.fitTerminal()
}, 10)

onMounted(() => {
  terminal.setupTerminal(terminalElement.value)

  terminal.xterm.onData((data: any) => {
    if (data && data[0] === '\x7F')
      return

    terminal.xterm.write(data)
  })

  setTimeout(() => onResizeDebounced(), 10)

  window.addEventListener('resize', onResizeDebounced)
})

onUnmounted(() => {
  window.removeEventListener('resize', onResizeDebounced)
})
</script>

<template>
  <div ref="terminalElement" style="width: 100%; height: 100%; overflow: hidden;" />
</template>

<style>
@import 'xterm/css/xterm.css';
.xterm {
  padding: 4px;
}
</style>
