<script setup lang="ts">
import { onBeforeUnmount, onMounted } from 'vue'
import { useEventBus } from '@vueuse/core'
import { useEditor } from '@/composables/useEditor'
import { useSettings } from '@/composables/useSettings'
import AppNotifications from '@/components/shared/AppNotifications.vue'
import TopBar from '@/components/navigation/TopBar.vue'

const bus = useEventBus('editor_code')

const settings = useSettings()

const editor = useEditor()

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

onMounted(async () => {
  window.addEventListener('beforeunload', handleWindowClose)
  window.addEventListener('keyup', handleWindowKeyup)
})

onBeforeUnmount(() => {
  window.removeEventListener('beforeunload', handleWindowClose)
  window.removeEventListener('keyup', handleWindowKeyup)
})
</script>

<template>
  <div class="w-full h-screen bg-gray-50 dark:bg-gray-900 dark:text-gray-100 overflow-hidden">
    <div class="flex flex-col w-full h-full">
      <TopBar class="h-10" />

      <div class="flex flex-row flex-grow px-2 pb-2">
        <div class="relative flex flex-1">
          <PlaygroundView class="absolute inset-0 w-full h-full" />
        </div>
      </div>
    </div>
  </div>

  <AppNotifications />
</template>

<style>
html {
  overflow: hidden !important;
}
</style>
