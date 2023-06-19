<script setup lang="ts">
import { useEventBus } from '@vueuse/core'
import { useEditor } from '@/composables/useEditor'
import AppSeparator from '@/components/shared/AppSeparator.vue'
import { useShare } from '@/composables/useShare'
import { isDark, toggleDark } from '@/composables/dark'
import { useSettings } from '@/composables/useSettings'

const editor = useEditor()

const share = useShare()

const settings = useSettings()
</script>

<template>
  <div class="w-full px-2">
    <div class="h-full grid grid-cols-3">
      <div class="flex flex-row items-center space-x-2">
        <div class="flex flex-row items-center space-x-1">
          <img src="/favicon.ico" alt="EsJS Logo" class="w-7 h-7 rounded">
          <span class="text-sm font-medium text-indigo-800 dark:text-indigo-200">EsJS</span>
          <span class="text-xs uppercase font-medium text-indigo-800 dark:text-indigo-200">Editor</span>
        </div>

        <AppButton
          :icon="isDark ? 'mdi:weather-night' : 'mdi:weather-sunny'"
          icon-only
          :description="isDark ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'"
          tooltip-placement="bottom"
          @click="toggleDark()"
        />

        <div
          v-if="!settings.settings.value.hideOptions"
          class="flex flex-row items-center space-x-2"
        >
          <AppSeparator />

          <AppButton
            icon="mdi:share"
            text="Compartir"
            description="Compartir código"
            tooltip-placement="bottom"
            color="teal"
            @click="share.shareCode()"
          />
        </div>
      </div>

      <div class="flex flex-row justify-center items-center">
        <AppToggle
          v-if="!settings.settings.value.hideOptions"
          :checked="editor.language.value === 'esjs'"
          label="EsJS"
          prepend-label="JS"
          :description="editor.language.value === 'esjs' ? 'Cambiar a JavaScript' : 'Cambiar a EsJS'"
          tooltip-placement="bottom"
          class="h-6 ml-3"
          @change="editor.toggleLanguage()"
        />
      </div>

      <div class="flex flex-row justify-end items-center space-x-3">
        <div>
          <VMenu placement="bottom" theme="menu" :triggers="['hover', 'focus', 'click']">
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
                  tooltip-placement="bottom"
                  @click="settings.setLayout('horizontal')"
                />

                <AppButton
                  icon="mdi:view-split-horizontal"
                  :active="'vertical' === settings.settings.value.layout"
                  description="Orientación horizontal"
                  tooltip-placement="bottom"
                  @click="settings.setLayout('vertical')"
                />

                <AppSeparator />

                <AppButton
                  icon="mdi:code"
                  :active="!settings.settings.value.hideEditor"
                  description="Mostrar editor"
                  tooltip-placement="bottom"
                  @click="settings.setHideEditor(!settings.settings.value.hideEditor)"
                />

                <AppButton
                  icon="mdi:eye"
                  :active="!settings.settings.value.hidePreview"
                  description="Mostrar vista previa"
                  tooltip-placement="bottom"
                  @click="settings.setHidePreview(!settings.settings.value.hidePreview)"
                />

                <AppSeparator />

                <AppButton
                  icon="mdi:autorenew"
                  :active="settings.settings.value.autoCompile"
                  description="Ejecutar automáticamente"
                  tooltip-placement="bottom"
                  @click="settings.setAutoCompile(!settings.settings.value.autoCompile)"
                />

                <AppButton
                  icon="mdi:publish"
                  text="Exportar módulo"
                  description="Genera una URL con el módulo actual y la copia al portapapeles"
                  tooltip-placement="bottom"
                  icon-only
                  color="gray"
                  @click="share.shareModule()"
                />

                <AppSeparator />

                <AppButton
                  icon="mdi:dots-horizontal"
                  :active="!settings.settings.value.hideOptions"
                  description="Mostrar opciones"
                  tooltip-placement="bottom"
                  @click="settings.setHideOptions(!settings.settings.value.hideOptions)"
                />

                <AppButton
                  icon="mdi:cogs"
                  :active="settings.settings.value.showAdvanced"
                  description="Mostrar avanzado"
                  tooltip-placement="bottom"
                  @click="settings.setShowAdvanced(!settings.settings.value.showAdvanced)"
                />
              </div>
            </template>
          </VMenu>
        </div>

        <div
          v-if="!settings.settings.value.hideOptions"
          class="flex flex-row justify-end items-center space-x-3"
        >
          <AppSeparator v-if="settings.settings.value.showAdvanced" />

          <AppButton
            v-if="settings.settings.value.showAdvanced"
            icon="mdi:code-braces"
            text="Ofuscar código"
            description="Ofuscar código"
            tooltip-placement="bottom"
            icon-only
            color="stone"
            @click="useEventBus('editor_code').emit('obfuscate')"
          />

          <AppButton
            v-if="settings.settings.value.showAdvanced"
            icon="mdi:code-braces"
            text="Ofuscar pruebas"
            description="Ofuscar pruebas"
            tooltip-placement="bottom"
            icon-only
            color="stone"
            @click="useEventBus('editor_tests').emit('obfuscate')"
          />

          <AppSeparator v-if="settings.settings.value.showAdvanced" />

          <AppButton
            v-if="settings.settings.value.showAdvanced"
            :icon="settings.settings.value.readonlyCode ? 'mdi:pen-off' : 'mdi:pen'"
            text="Código de solo lectura"
            description="Código de solo lectura"
            tooltip-placement="bottom"
            icon-only
            color="stone"
            :active="settings.settings.value.readonlyCode"
            @click="settings.setReadonlyCode(!settings.settings.value.readonlyCode)"
          />

          <AppButton
            v-if="settings.settings.value.showAdvanced"
            :icon="settings.settings.value.readonlyTests ? 'mdi:test-tube-off' : 'mdi:test-tube'"
            text="Pruebas de solo lectura"
            description="Pruebas de solo lectura"
            tooltip-placement="bottom"
            icon-only
            color="stone"
            :active="settings.settings.value.readonlyTests"
            @click="settings.setReadonlyTests(!settings.settings.value.readonlyTests)"
          />

          <AppSeparator v-if="settings.settings.value.showAdvanced" />

          <AppButton
            icon="mdi:code-braces"
            text="Formatear código"
            description="Formatear código"
            tooltip-placement="bottom"
            icon-only
            @click="useEventBus('editor_code').emit('format')"
          />

          <AppButton
            icon="mdi-github"
            href="https://github.com/es-js/esjs"
            description="GitHub"
            tooltip-placement="bottom"
          />
        </div>
      </div>
    </div>
  </div>
</template>
