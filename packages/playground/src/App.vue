<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useEventBus } from '@vueuse/core'
import { useEditor } from '@/composables/useEditor'
import { useShare } from '@/composables/useShare'
import { useSettings } from '@/composables/useSettings'
import AppNotifications from '@/components/AppNotifications.vue'

const bus = useEventBus('editor')

const share = useShare()

const settings = useSettings()

const editor = useEditor()

const loading = ref(true)

onMounted(async () => {
  window.addEventListener('beforeunload', handleWindowClose)
  window.addEventListener('keyup', handleWindowKeyup)

  setSettingsFromUrl()
  await setCodeFromUrl()
  await editor.execute()
  loading.value = false
})

onBeforeUnmount(() => {
  window.removeEventListener('beforeunload', handleWindowClose)
  window.removeEventListener('keyup', handleWindowKeyup)
})

function handleWindowKeyup($event: any) {
  if ($event.key === 'Escape')
    bus.emit('focus')
}

function handleWindowClose($event: any) {
  if (import.meta.env.MODE === 'development')
    return

  // Cancelar el cierre de la ventana
  $event.preventDefault()
  // Chrome requiere que se establezca la propiedad returnValue en una cadena vacía
  $event.returnValue = ''
}

async function setCodeFromUrl() {
  const { pathname, tests } = share.decodeSharedUrl()

  const code = await share.getCodeFromPathname(pathname)

  editor.setCode(code)

  if (tests)
    editor.setTestsCode(tests)
}

function setSettingsFromUrl() {
  if (window.location.pathname === '/')
    return

  const { layout, hideOptions, hideEditor, hidePreview, hideConsole, hideTests, tests } = share.decodeSharedUrl()

  settings.setLayout(layout === 'vertical' ? 'vertical' : 'horizontal')
  settings.setHideOptions(hideOptions === 'true')
  settings.setHideEditor(hideEditor === 'true')
  settings.setHidePreview(hidePreview === 'true')
  settings.setHideConsole(hideConsole === 'true')
  settings.setHideTests(hideTests === 'true' || tests === null)
}
</script>

<template>
  <div class="w-full h-screen flex flex-col bg-gray-900">
    <div class="h-[46px] bg-gray-900 text-gray-50 border-b border-gray-800">
      <AppBar />
    </div>

    <div class="flex flex-1">
      <Playground v-if="!loading" />
    </div>
  </div>

  <AppNotifications />
</template>

<style>
html {
  overflow: hidden !important;
}
</style>
