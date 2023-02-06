<script setup lang="ts">
import { editor } from 'monaco-editor'
import { useEditor } from '@/composables/useEditor'
import MonacoEditor from '@/components/MonacoEditor.vue'

const editor = useEditor()
</script>

<template>
  <MonacoEditor element-id="monacoCodeEditor" :value="editor.code.value" @update:value="editor.setCode($event)" />
</template>
