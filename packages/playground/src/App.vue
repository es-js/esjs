<script setup lang="ts">
import { onMounted } from 'vue'
import { useEventBus } from '@vueuse/core'
import { useEditor } from '@/composables/useEditor'
import { useShare } from '@/composables/useShare'
import { useSettings } from '@/composables/useSettings'
import AppNotifications from '@/components/AppNotifications.vue'

const bus = useEventBus('editor')

const share = useShare()

const settings = useSettings()

const editor = useEditor()

onMounted(async () => {
  window.addEventListener('keyup', handleWindowKeyup)

  setSettingsFromUrl()
  await setCodeFromUrl()
  await editor.execute()
})

function handleWindowKeyup($event) {
  if ($event.key === 'Escape')
    bus.emit('focus')
}

async function setCodeFromUrl() {
  const { pathname } = share.decodeSharedUrl()

  const code = await share.getCodeFromPathname(pathname)

  editor.setCode(code)
}

function setSettingsFromUrl() {
  if (window.location.pathname === '/')
    return

  const { layout, hideOptions, hideEditor, hidePreview, hideConsole } = share.decodeSharedUrl()

  settings.setLayout(layout === 'vertical' ? 'vertical' : 'horizontal')
  settings.setHideOptions(hideOptions === 'true')
  settings.setHideEditor(hideEditor === 'true')
  settings.setHidePreview(hidePreview === 'true')
  settings.setHideConsole(hideConsole === 'true')
}
</script>

<template>
  <div class="w-full h-screen flex flex-col bg-gray-900">
    <div class="h-[46px] bg-gray-900 text-gray-50 border-b border-gray-800">
      <AppBar />
    </div>

    <div class="flex flex-1">
      <Playground v-if="editor.code.value" />
    </div>
  </div>

  <AppNotifications />
</template>

<style>
html {
  overflow: hidden !important;
}
</style>
