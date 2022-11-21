<script setup lang="ts">
import 'xterm/css/xterm.css'
import { onMounted, ref } from 'vue'
import { usarConsola } from '../composables/usarConsola'

const terminalDocument = ref()

const consola = usarConsola()

onMounted(() => {
  consola.setupTerminal()
  consola.terminal.value.open(terminalDocument.value)
  consola.fitAddon.fit()
  consola.terminal.value.onData((data: any) => consola.terminal.value.write(data))
})
</script>

<template>
  <div id="terminalDocument" ref="terminalDocument" class="resize relative w-full h-full overflow-hidden" />
</template>
