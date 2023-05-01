<script setup lang="ts">
import { editor } from 'monaco-editor'
import { useEventBus } from '@vueuse/core'
import { useGrid } from 'vue-screen'
import { useEditor } from '@/composables/useEditor'
import MonacoEditor from '@/components/MonacoEditor.vue'
import { useSettings } from '@/composables/useSettings'
import ExportModuleButton from '@/components/shared/ExportModuleButton.vue'

const editor = useEditor()

const settings = useSettings()

const grid = useGrid('tailwind')

function toggleTestsEditor() {
  settings.setHideTests(!settings.settings.value.hideTests)

  useEventBus('editor_code').emit('fit')
}

function formatCode() {
  useEventBus('editor_code').emit('format')
}

function obfuscateTestsCode() {
  useEventBus('editor_tests').emit('obfuscate')
}
</script>

<template>
  <div class="flex flex-col">
    <div
      v-if="!settings.settings.value.hideOptions || !settings.settings.value.hideTests"
      class="flex flex-row items-center px-2 py-1 space-x-2"
      :class="{ 'flex-grow': settings.settings.value.hideTests }"
    >
      <AppButton
        text="Pruebas" icon="mdi:test-tube" color="teal" @click="toggleTestsEditor"
      />

      <ExportModuleButton />

      <div class="flex flex-grow" />

      <AppButton
        v-if="settings.settings.value.showAdvanced"
        icon="mdi:code-braces"
        :text="grid.lg ? 'Ofuscar pruebas' : 'Ofuscar'"
        description="Ofusca el código de pruebas"
        :icon-only="!grid.sm"
        color="stone"
        @click="obfuscateTestsCode"
      />

      <AppButton
        icon="mdi:code-braces"
        :text="grid.lg ? 'Formatear código' : 'Formatear'"
        description="Formatea el código actual"
        :icon-only="!grid.sm"
        color="teal"
        @click="formatCode"
      />
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
