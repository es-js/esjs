<script setup lang="ts">
import { onMounted } from 'vue'
import { useEventBus } from '@vueuse/core'
import { useEditor } from '@/composables/useEditor'
import { useShare } from '@/composables/useShare'
import { useSettings } from '@/composables/useSettings'
import AppNotifications from '@/components/AppNotifications.vue'

const editor = useEditor()

const bus = useEventBus('editor')

const share = useShare()

const settings = useSettings()

onMounted(() => {
  window.addEventListener('keyup', handleWindowKeyup)

  initSharedUrl()

  editor.execute()
})

function handleWindowKeyup($event) {
  if ($event.key === 'Escape')
    bus.emit('focus')
}

function initSharedUrl() {
  if (window.location.pathname === '/')
    return

  const { layout, hideOptions, hideEditor, hidePreview, hideConsole } = share.decompressSharedUrl()

  settings.setLayout(layout === 'vertical' ? 'vertical' : 'horizontal')
  settings.setHideOptions(hideOptions === 'true')
  settings.setHideEditor(hideEditor === 'true')
  settings.setHidePreview(hidePreview === 'true')
  settings.setHideConsole(hideConsole === 'true')
}
</script>

<template>
  <div class="w-full h-screen flex flex-col">
    <div class="h-[46px] bg-gray-900 text-gray-50 border-b border-gray-800">
      <AppBar />
    </div>

    <div class="flex flex-1">
      <Playground />
    </div>
  </div>

  <AppNotifications />
</template>

<style>
html {
  overflow: hidden !important;
}
</style>
