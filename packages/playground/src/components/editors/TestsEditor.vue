<script setup lang="ts">
import { computed } from 'vue'
import { useEditor } from '@/composables/useEditor'
import MonacoEditor from '@/components/MonacoEditor.vue'
import { useSettings } from '@/composables/useSettings'

const editor = useEditor()

const readonly = computed(() => useSettings().settings.value.readonlyTests)
</script>

<template>
  <MonacoEditor
    element-id="monacoTestsEditor"
    name="tests"
    :value="editor.testsCode.value"
    :readonly="readonly"
    @update:value="editor.setTestsCode($event)"
  />
</template>
