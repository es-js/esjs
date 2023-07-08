<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useDark, useToggle } from '@vueuse/core'
import { usarTerminal } from './main'

const Terminal = usarTerminal()

const showTerminal = ref(true)

const isDark = useDark()

const toggleDark = useToggle(isDark)

onMounted(async () => {
  await askName()
})

async function askName() {
  Terminal.limpiar()

  Terminal.escribir('Ingresa un valor:')

  const resultado = await Terminal.leer()

  Terminal.escribir({
    Resultado: resultado,
    Tipo: typeof resultado,
  })

  Terminal.escribir('Presiona ENTER para volver a iniciar')

  await Terminal.leerEnter()

  await askName()
}

function toggleTerminal() {
  showTerminal.value = !showTerminal.value

  setTimeout(async () => {
    if (showTerminal.value)
      await askName()
  }, 0)
}

function updateTheme(theme: 'dark' | 'light') {
  Terminal.setTheme(theme)
}

watch(isDark, (value) => {
  updateTheme(value ? 'dark' : 'light')
})
</script>

<template>
  <div style="width: 100%; height: 100%">
    <div style="display: flex; flex-direction: column; height: 100%">
      <div style="width: 100%; height: 2rem; padding: 1rem">
        <button @click="toggleTerminal">
          Toggle Terminal
        </button>

        <button @click="toggleDark()">
          Toggle Dark
        </button>

        <pre>Is Dark: {{ isDark }}</pre>
      </div>

      <div style="display: flex; flex-direction: column; flex-grow: 1; padding: 1rem">
        <es-terminal v-if="showTerminal" style="flex-grow: 1" />
      </div>
    </div>
  </div>
</template>

