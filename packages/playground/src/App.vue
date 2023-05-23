<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useEventBus } from '@vueuse/core'
import { useEditor } from '@/composables/useEditor'
import { useShare } from '@/composables/useShare'
import { useSettings } from '@/composables/useSettings'
import AppNotifications from '@/components/shared/AppNotifications.vue'

const bus = useEventBus('editor_code')

const share = useShare()

const settings = useSettings()

const editor = useEditor()

const loading = ref(true)

onMounted(async () => {
  window.addEventListener('beforeunload', handleWindowClose)
  window.addEventListener('keyup', handleWindowKeyup)

  share.setSettingsFromUrl()
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
</script>

<template>
  <div class="w-full h-screen flex flex-col bg-gray-900">
    <AppBar />

    <PlaygroundView v-if="!loading" class="flex flex-1" />
  </div>

  <AppNotifications />
</template>

<style>
html {
  overflow: hidden !important;
}
</style>
