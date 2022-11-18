<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useEditor } from '@/composables/useEditor'

const editor = useEditor()

onMounted(() => {
  editor.code.value = `
const fecha = crear Fecha();

consola.escribir("Hola Mundo, desde EsJs!", fecha);
`
})
</script>

<template>
  <AppWrapper>
    <template #esjs>
      <pre>{{ editor.code.value }}</pre>
    </template>

    <template #js>
      <pre>{{ editor.output.value }}</pre>
    </template>
  </AppWrapper>
</template>
