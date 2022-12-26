<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { ResizeObserver } from 'vue-resize'
import 'xterm/css/xterm.css'
import 'vue-resize/dist/vue-resize.css'
import debounce from 'lodash.debounce'
import { usarTerminal } from '../composables/usarTerminal'

const terminalElement = ref()

const terminal = usarTerminal()

const onResizeDebounced = debounce(() => {
  terminal.fitTerminal()
}, 10)

onMounted(() => {
  terminal.setupTerminal(terminalElement.value)

  terminal.xterm.onData((data: any) => terminal.xterm.write(data))

  setTimeout(() => onResizeDebounced(), 10)
})
</script>

<template>
  <div ref="terminalElement" style="width: 100%; height: 100%; overflow: hidden;">
    <ResizeObserver @notify="onResizeDebounced" />
  </div>
</template>
