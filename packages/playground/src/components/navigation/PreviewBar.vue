<script setup lang="ts">
import { useSettings } from '@/composables/useSettings'
import { useEditor } from '@/composables/useEditor'
import { useNotification } from '@/composables/useNotification'

const settings = useSettings()

const editor = useEditor()

const notification = useNotification()

function setActivePreview(preview: 'terminal' | 'flowchart' | 'html') {
  settings.setHidePreview(false)
  settings.setActivePreview(preview)
}
</script>

<template>
  <div class="h-full flex flex-row items-center px-2 space-x-2">
    <div class="py-1.5">
      <AppButton
        icon="mdi:console"
        :active="!settings.settings.value.hideConsole"
        description="Mostrar consola"
        @click="settings.setHideConsole(!settings.settings.value.hideConsole)"
      />
    </div>

    <div class="h-full flex flex-row space-x-1">
      <AppTabButton
        text="Terminal"
        icon="mdi:eye"
        :active="!settings.settings.value.hidePreview && settings.settings.value.preview.terminal"
        @click="setActivePreview('terminal')"
      />

      <AppTabButton
        text="Diagrama de flujo"
        icon="mdi:sitemap"
        :active="!settings.settings.value.hidePreview && settings.settings.value.preview.flowchart"
        @click="setActivePreview('flowchart')"
      />
    </div>

    <!--      <AppTabButton -->
    <!--        text="HTML" -->
    <!--        icon="mdi:language-html5" -->
    <!--        :active="settings.settings.value.preview.html" -->
    <!--        @click="setActivePreview('html')" -->
    <!--      /> -->

    <div class="flex flex-1" />

    <AppButton
      icon="mdi:eye"
      :active="!settings.settings.value.hidePreview"
      description="Mostrar vista previa"
      @click="settings.setHidePreview(!settings.settings.value.hidePreview)"
    />
  </div>
</template>
