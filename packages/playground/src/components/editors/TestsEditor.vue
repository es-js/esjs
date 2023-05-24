<script setup lang="ts">
import { useEditor } from '@/composables/useEditor'
import MonacoEditor from '@/components/MonacoEditor.vue'

const editor = useEditor()
</script>

<template>
  <MonacoEditor
    element-id="monacoTestsEditor"
    name="tests"
    :value="editor.testsCode.value"
    @update:value="editor.setTestsCode($event)"
  />
</template>
