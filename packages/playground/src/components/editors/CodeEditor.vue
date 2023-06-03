<script setup lang="ts">
import { computed } from 'vue'
import { useEditor } from '@/composables/useEditor'
import MonacoEditor from '@/components/MonacoEditor.vue'
import { useSettings } from '@/composables/useSettings'

const editor = useEditor()

const readonly = computed(() => useSettings().settings.value.readonlyCode)
</script>

<template>
  <MonacoEditor
    element-id="monacoCodeEditor"
    name="code"
    :value="editor.code.value"
    :readonly="readonly"
    @update:value="editor.setCode($event)"
  />
</template>
