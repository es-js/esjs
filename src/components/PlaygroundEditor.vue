<script setup lang="ts">
import * as monaco from 'monaco-editor'
import { onMounted, ref } from 'vue'
import esjsSyntax from '@/assets/esjs_syntax'
import { useEditor } from '@/composables/useEditor'

const editor = useEditor()

const INITIAL_CODE = `mientras (verdadero) {
  consola.escribir("Ingresa tu edad:");

  const edad = esperar consola.leer();

  si (edad >= 18) {
      consola.escribir("Eres mayor de edad");
      romper;
  } sino {
      consola.escribir("No eres mayor de edad");
  }
}

consola.escribir("--- Fin ---")`

monaco.languages.register({ id: 'esjs' })

monaco.languages.setMonarchTokensProvider('esjs', esjsSyntax)

onMounted(() => {
  const monacoEditor = monaco.editor.create(document.getElementById('monacoEditor'), {
    value: INITIAL_CODE,
    automaticLayout: true,
    vertical: 'visible',
    horizontal: 'visible',
    theme: 'vs-dark',
    fontFamily: 'Fira Code',
    fontSize: 16,
    language: 'esjs',
    renderWhitespace: 'all',
    roundedSelection: true,
  })

  editor.setCode(monacoEditor.getValue())
  editor.execute()

  monacoEditor.onDidChangeModelContent(() => {
    editor.setCode(monacoEditor.getValue())
  })
})
</script>

<template>
  <div id="monacoEditor" ref="monacoEditor" class="w-full h-full overflow-hidden" />
</template>
