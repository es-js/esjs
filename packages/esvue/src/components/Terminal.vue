<script setup lang="ts">
import 'xterm/css/xterm.css'
import { onMounted, ref } from 'vue'
import { usarConsola } from '../composables/usarConsola'

const terminalElement = ref()

const consola = usarConsola()

onMounted(() => {
  consola.setupTerminal()
  consola.terminal.value.open(terminalElement.value)
  consola.fitAddon.fit()
  consola.terminal.value.onData((data: any) => consola.terminal.value.write(data))
})
</script>

<template>
  <div ref="terminalElement" class="w-full min-h-full overflow-hidden" />
</template>
