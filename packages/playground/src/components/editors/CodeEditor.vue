<script setup lang="ts">
import { computed, watch } from 'vue'
import { useEventBus } from '@vueuse/core'
import { useSettings } from '@/composables/useSettings'
import { useEditor } from '@/composables/useEditor'
import MonacoEditor from '@/components/MonacoEditor.vue'

const editor = useEditor()

const readonly = computed(() => useSettings().settings.value.readonlyCode)

watch(
  editor.language,
  () => {
    useEventBus('editor_code').emit('change-language', editor.language.value)
  },
  { immediate: true },
)
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
