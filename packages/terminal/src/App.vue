<script setup lang="ts">
import { onMounted } from 'vue'
import { usarTerminal } from './main'

const Terminal = usarTerminal()

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
</script>

<template>
  <es-terminal />
</template>

