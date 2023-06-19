<script setup lang="ts">
import { computed, watch } from 'vue'
import { useEventBus } from '@vueuse/core'
import { useEditor } from '@/composables/useEditor'
import { useSettings } from '@/composables/useSettings'
import MonacoEditor from '@/components/MonacoEditor.vue'

const editor = useEditor()

const readonly = computed(() => useSettings().settings.value.readonlyTests)

watch(
  editor.language,
  () => {
    useEventBus('editor_tests').emit('change-language', editor.language.value)
  },
  { immediate: true },
)
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
