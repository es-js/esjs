<script setup lang="ts">
import { useGrid } from 'vue-screen'
import { useClipboard, useEventBus } from '@vueuse/core'
import { useSettings } from '@/composables/useSettings'
import { useShare } from '@/composables/useShare'
import { useEditor } from '@/composables/useEditor'
import { useNotification } from '@/composables/useNotification'

const settings = useSettings()

const grid = useGrid('tailwind')

const share = useShare()

const editor = useEditor()

const notification = useNotification()

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

function shareModule() {
  const url = share.getSharedModuleUrl(editor.code.value)

  const clipboard = useClipboard({
    source: url.toString(),
  })

  clipboard.copy()

  notification.success('Se copió la URL al portapapeles')
}
</script>

<template>
  <div class="flex flex-row items-center py-1 space-x-2">
    <AppButton
      text="Pruebas" icon="mdi:test-tube" color="teal" @click="toggleTestsEditor"
    />

    <AppButton
      icon="mdi:publish"
      :text="grid.lg ? 'Exportar módulo' : 'Exportar'"
      :icon-only="!grid.sm"
      color="gray"
      @click="shareModule"
    />

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
</template>

<style scoped>

</style>
