<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { ResizeObserver } from 'vue-resize'
import { usarConsola } from '../composables/usarConsola'
import 'xterm/css/xterm.css'
import 'vue-resize/dist/vue-resize.css'
import debounce from 'lodash.debounce'

const terminalElement = ref()

const consola = usarConsola()

const onResizeDebounced = debounce(() => {
  consola.fitTerminal()
}, 10)

onMounted(() => {
  consola.setupTerminal(terminalElement.value)

  consola.terminal.onData((data: any) => consola.terminal.write(data))

  setTimeout(() => onResizeDebounced(), 10)
})
</script>

<template>
  <div ref="terminalElement" class="w-full min-h-full overflow-hidden">
    <ResizeObserver @notify="onResizeDebounced" />
  </div>
</template>
