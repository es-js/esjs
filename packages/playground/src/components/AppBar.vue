<script setup lang="ts">
import { useClipboard } from '@vueuse/core'
import { useGrid } from 'vue-screen'
import { useSettings } from '@/composables/useSettings'
import { useShare } from '@/composables/useShare'
import { useEditor } from '@/composables/useEditor'
import NavCircleButton from '@/components/NavCircleButton.vue'
import { useNotification } from '@/composables/useNotification'

const settings = useSettings()

const share = useShare()

const editor = useEditor()

const grid = useGrid('tailwind')

const notification = useNotification()

function shareCode() {
  const url = share.getSharedUrl(editor.code.value)

  window.history.replaceState('', '', url)

  const clipboard = useClipboard({
    source: window.location.href,
  })

  clipboard.copy()

  notification.success('Se copió la URL al portapapeles')
}
</script>

<template>
  <div class="w-full h-full grid grid-cols-3">
    <div class="flex flex-shrink">
      <div class="flex flex-row items-center space-x-2">
        <div class="flex flex-row items-center px-2 space-x-1">
          <div class="flex flex-shrink">
            <img src="/favicon.ico" alt="EsJS Logo" class="w-8 h-8 rounded">
          </div>
          <span class="text-md">EsJS</span>
          <span class="text-xs uppercase font-medium text-indigo-200">Editor</span>
        </div>

        <div class="w-px h-full bg-gray-800" />

        <div class="flex flex-row items-center px-2">
          <NavButton
            v-if="!settings.settings.value.hideOptions"
            icon="mdi:share"
            :text="grid.lg ? 'Compartir código' : 'Compartir'"
            :icon-only="!grid.sm"
            color="teal"
            @click="shareCode"
          />
        </div>
      </div>
    </div>

    <div class="flex flex-row justify-center items-center px-2">
      <NavButton
        v-if="!settings.settings.value.hideOptions"
        icon="mdi:play"
        text="Ejecutar"
        :icon-only="!grid.sm"
        @click="editor.execute()"
      />
    </div>

    <div class="flex flex-row justify-end items-center px-2 space-x-2">
      <div v-if="!settings.settings.value.hideOptions" class="flex flex-row items-center py-1.5 px-2 space-x-2 bg-gray-800 rounded">
        <NavCircleButton icon="mdi:view-split-vertical" :active="'horizontal' === settings.settings.value.layout" @click="settings.setLayout('horizontal')" />

        <NavCircleButton icon="mdi:view-split-horizontal" :active="'vertical' === settings.settings.value.layout" @click="settings.setLayout('vertical')" />
      </div>

      <div v-if="grid.md && !settings.settings.value.hideOptions" class="flex flex-row items-center py-1.5 px-2 space-x-2 bg-gray-800 rounded">
        <NavCircleButton icon="mdi:autorenew" :active="settings.settings.value.autoCompile" @click="settings.setAutoCompile(!settings.settings.value.autoCompile)" />

        <NavCircleButton icon="mdi:code" :active="!settings.settings.value.hideEditor" @click="settings.setHideEditor(!settings.settings.value.hideEditor)" />

        <NavCircleButton icon="mdi:eye" :active="!settings.settings.value.hidePreview" @click="settings.setHidePreview(!settings.settings.value.hidePreview)" />

        <NavCircleButton icon="mdi:console" :active="!settings.settings.value.hideConsole" @click="settings.setHideConsole(!settings.settings.value.hideConsole)" />
      </div>

      <NavCircleButton v-if="grid.md" icon="mdi:dots-horizontal" :active="!settings.settings.value.hideOptions" @click="settings.setHideOptions(!settings.settings.value.hideOptions)" />
    </div>
  </div>
</template>
