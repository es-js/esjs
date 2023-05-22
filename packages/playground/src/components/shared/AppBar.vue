<script setup lang="ts">
import { useClipboard, useEventBus } from '@vueuse/core'
import { useGrid } from 'vue-screen'
import { useSettings } from '@/composables/useSettings'
import { useShare } from '@/composables/useShare'
import { useEditor } from '@/composables/useEditor'
import { useNotification } from '@/composables/useNotification'

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
</script>

<template>
  <div class="w-full h-full grid grid-cols-7">
    <div class="grid-col-span-3 flex">
      <div class="flex flex-row items-center space-x-2">
        <div class="flex flex-row items-center px-2 space-x-1">
          <img src="/favicon.ico" alt="EsJS Logo" class="w-8 h-8 rounded">
          <span class="text-md">EsJS</span>
          <span class="text-xs uppercase font-medium text-indigo-200">Editor</span>
        </div>

        <div class="w-px h-full bg-gray-800" />

        <div class="flex flex-row items-center px-2 space-x-2">
          <AppButton
            v-if="!settings.settings.value.hideOptions"
            icon="mdi:share"
            :text="grid.lg ? 'Compartir código' : 'Compartir'"
            description="Genera una URL con el código actual y la copia al portapapeles"
            :icon-only="!grid.sm"
            color="teal"
            @click="shareCode"
          />

          <AppButton
            v-if="settings.settings.value.showAdvanced"
            icon="mdi:code-braces"
            :text="grid.lg ? 'Ofuscar código' : 'Ofuscar'"
            description="Ofusca el código"
            :icon-only="!grid.sm"
            color="stone"
            @click="obfuscateCode"
          />
        </div>
      </div>
    </div>

    <div class="flex flex-row justify-center items-center px-2">
      <AppButton
        v-if="!settings.settings.value.hideOptions"
        icon="mdi:play"
        text="Ejecutar"
        :icon-only="!grid.sm"
        color="indigo"
        @click="editor.execute()"
      />
    </div>

    <div class="grid-col-span-3 flex flex-row justify-end items-center px-2 space-x-2">
      <div v-if="!settings.settings.value.hideOptions" class="flex flex-row items-center py-1.5 px-2 space-x-2 bg-gray-800 rounded">
        <AppButton
          icon="mdi:view-split-vertical"
          :active="'horizontal' === settings.settings.value.layout"
          description="Orientación horizontal"
          @click="settings.setLayout('horizontal')"
        />

        <AppButton
          icon="mdi:view-split-horizontal"
          :active="'vertical' === settings.settings.value.layout"
          description="Orientación vertical"
          @click="settings.setLayout('vertical')"
        />
      </div>

      <div v-if="grid.md && !settings.settings.value.hideOptions" class="flex flex-row items-center py-1.5 px-2 space-x-2 bg-gray-800 rounded">
        <AppButton
          icon="mdi:autorenew"
          :active="settings.settings.value.autoCompile"
          description="Ejecutar automáticamente"
          @click="settings.setAutoCompile(!settings.settings.value.autoCompile)"
        />

        <AppButton
          icon="mdi:code"
          :active="!settings.settings.value.hideEditor"
          description="Mostrar editor"
          @click="settings.setHideEditor(!settings.settings.value.hideEditor)"
        />
      </div>

      <AppButton
        v-if="grid.md"
        icon="mdi:dots-horizontal"
        :active="!settings.settings.value.hideOptions"
        description="Mostrar opciones"
        @click="settings.setHideOptions(!settings.settings.value.hideOptions)"
      />
    </div>
  </div>
</template>
