<script setup lang="ts">
import { editor } from 'monaco-editor'
import { useEventBus } from '@vueuse/core'
import { useEditor } from '@/composables/useEditor'
import MonacoEditor from '@/components/MonacoEditor.vue'
import { useSettings } from '@/composables/useSettings'
import NavButton from '@/components/NavButton.vue'
import ExportModuleButton from '@/components/shared/ExportModuleButton.vue'

const editor = useEditor()

const settings = useSettings()

function toggleTestsEditor() {
  settings.setHideTests(!settings.settings.value.hideTests)

  useEventBus('editor_code').emit('fit')
}
</script>

<template>
  <div class="flex flex-col">
    <div
      v-if="!settings.settings.value.hideOptions || !settings.settings.value.hideTests"
      class="flex flex-row items-center px-2 py-1 space-x-2"
      :class="{ 'flex-grow': settings.settings.value.hideTests }"
    >
      <NavButton
        text="Pruebas" icon="mdi:test-tube" color="teal" @click="toggleTestsEditor"
      />

      <ExportModuleButton />
    </div>
    <div v-if="!settings.settings.value.hideTests" class="flex flex-grow">
      <MonacoEditor
        element-id="monacoTestsEditor"
        name="tests"
        :value="editor.testsCode.value"
        class="w-full h-full overflow-hidden"
        @update:value="editor.setTestsCode($event)"
      />
    </div>
  </div>
</template>
