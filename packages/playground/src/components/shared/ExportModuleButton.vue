<script setup lang="ts">
import { useClipboard } from '@vueuse/core'
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

function shareModule() {
  const url = share.getSharedModuleUrl(editor.code.value)

  const clipboard = useClipboard({
    source: url,
  })

  clipboard.copy()

  notification.success('Se copió la URL al portapapeles')
}
</script>

<template>
  <NavButton
    icon="mdi:publish"
    text="Exportar módulo"
    :icon-only="!grid.sm"
    color="gray"
    @click="shareModule"
  />
</template>
