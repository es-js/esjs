<script setup lang="ts">
import { useClipboard, useEventBus } from '@vueuse/core'
import { useGrid } from 'vue-screen'
import { useSettings } from '@/composables/useSettings'
import { useShare } from '@/composables/useShare'
import { useEditor } from '@/composables/useEditor'
import { useNotification } from '@/composables/useNotification'
import { isDark, toggleDark } from '@/composables/dark'
import AppSeparator from '@/components/shared/AppSeparator.vue'

const settings = useSettings()

const share = useShare()

const editor = useEditor()

const grid = useGrid('tailwind')

const notification = useNotification()

function shareCode() {
  const url = share.getSharedUrl(editor.code.value, editor.testsCode.value)

  window.history.replaceState('', '', url)

  const clipboard = useClipboard({
    source: window.location.href,
  })

  clipboard.copy()

  notification.success('Se copió la URL al portapapeles')
}

function obfuscateCode() {
  useEventBus('editor_code').emit('obfuscate')
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
  <div class="w-full h-full flex flex-col">
    <div class="flex flex-col items-center flex-1 py-2 space-y-2">
      <div class="flex flex-col items-center space-y-1">
        <img src="/favicon.ico" alt="EsJS Logo" class="w-8 h-8 rounded">
        <span class="text-xs uppercase font-medium text-indigo-800 dark:text-indigo-200">Editor</span>
      </div>

      <AppButton
        :icon="isDark ? 'mdi:weather-night' : 'mdi:weather-sunny'"
        icon-only
        :description="isDark ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'"
        tooltip-placement="right"
        @click="toggleDark()"
      />

      <AppButton
        icon="mdi:share"
        :text="grid.lg ? 'Compartir código' : 'Compartir'"
        description="Compartir código"
        tooltip-placement="right"
        icon-only
        color="teal"
        @click="shareCode"
      />

      <AppButton
        icon="mdi:play"
        text="Ejecutar"
        description="Ejecutar código"
        tooltip-placement="right"
        icon-only
        color="indigo"
        @click="editor.execute()"
      />

      <AppButton
        v-if="settings.settings.value.showAdvanced"
        icon="mdi:code-braces"
        text="Ofuscar código"
        description="Ofuscar código"
        tooltip-placement="right"
        icon-only
        color="stone"
        @click="obfuscateCode"
      />

      <AppButton
        v-if="settings.settings.value.showAdvanced"
        icon="mdi:code-braces"
        text="Ofuscar pruebas"
        description="Ofusca pruebas"
        tooltip-placement="right"
        icon-only
        color="stone"
        @click="obfuscateTestsCode"
      />

      <AppButton
        v-if="settings.settings.value.showAdvanced"
        :icon="settings.settings.value.readonlyTests ? 'mdi:test-tube-off' : 'mdi:test-tube'"
        text="Pruebas de solo lectura"
        description="Pruebas de solo lectura"
        tooltip-placement="right"
        icon-only
        color="stone"
        :active="settings.settings.value.readonlyTests"
        @click="settings.setReadonlyTests(!settings.settings.value.readonlyTests)"
      />

      <span class="flex-1" />

      <AppButton
        icon="mdi:code-braces"
        text="Formatear código"
        description="Formatear código"
        tooltip-placement="right"
        icon-only
        color="teal"
        @click="formatCode"
      />

      <div>
        <VMenu placement="right" theme="dark" :triggers="['hover', 'focus', 'click']">
          <AppButton
            icon="mdi:cog"
            icon-only
            color="gray"
          />

          <template #popper>
            <div class="flex flex-row items-center p-1 space-x-2">
              <AppButton
                icon="mdi:view-split-vertical"
                :active="'horizontal' === settings.settings.value.layout"
                description="Orientación vertical"
                @click="settings.setLayout('horizontal')"
              />

              <AppButton
                icon="mdi:view-split-horizontal"
                :active="'vertical' === settings.settings.value.layout"
                description="Orientación horizontal"
                @click="settings.setLayout('vertical')"
              />

              <AppSeparator />

              <AppButton
                icon="mdi:code"
                :active="!settings.settings.value.hideEditor"
                description="Mostrar editor"
                @click="settings.setHideEditor(!settings.settings.value.hideEditor)"
              />

              <AppButton
                icon="mdi:eye"
                :active="!settings.settings.value.hidePreview"
                description="Mostrar vista previa"
                @click="settings.setHidePreview(!settings.settings.value.hidePreview)"
              />

              <AppSeparator />

              <AppButton
                icon="mdi:autorenew"
                :active="settings.settings.value.autoCompile"
                description="Ejecutar automáticamente"
                @click="settings.setAutoCompile(!settings.settings.value.autoCompile)"
              />

              <AppButton
                icon="mdi:publish"
                :text="grid.lg ? 'Exportar módulo' : 'Exportar'"
                description="Genera una URL con el módulo actual y la copia al portapapeles"
                icon-only
                color="gray"
                @click="shareModule"
              />

              <AppSeparator />

              <AppButton
                icon="mdi:dots-horizontal"
                :active="!settings.settings.value.hideOptions"
                description="Mostrar opciones"
                @click="settings.setHideOptions(!settings.settings.value.hideOptions)"
              />

              <AppButton
                icon="mdi:cogs"
                :active="settings.settings.value.showAdvanced"
                description="Mostrar avanzado"
                @click="settings.setShowAdvanced(!settings.settings.value.showAdvanced)"
              />
            </div>
          </template>
        </VMenu>
      </div>

      <AppButton
        icon="mdi-github"
        href="https://github.com/es-js/esjs"
        description="GitHub"
        tooltip-placement="right"
      />
    </div>
  </div>
</template>

<style>
.dark .v-popper--theme-dark .v-popper__inner {
  @apply bg-gray-900 border-gray-800 text-white
}

.dark .v-popper--theme-dark .v-popper__arrow-outer {
  @apply border-gray-800
}

.dark .v-popper--theme-dark .v-popper__arrow-inner {
  @apply border-gray-800
}
</style>
