<script setup lang="ts">
import { useEditor } from '~/composables/app/useEditor'
import { useLZShare } from '~/composables/app/useLZShare'
import { usePlayground } from '~/composables/app/usePlayground'
import { useSettings } from '~/composables/app/useSettings'

const settings = useSettings()

const editor = useEditor()

const playground = usePlayground()

const share = useLZShare()

onBeforeMount(async() => {
  if (process.client) {
    share.setSettingsFromUrl()
    await share.loadCodeFromUrl()
    editor.loading.value = false
  }
})

onMounted(() => {
  if (process.client) {
    window.addEventListener('beforeunload', playground.handleWindowClose)
    window.addEventListener('keyup', playground.handleWindowKeyup)
  }
})

onBeforeUnmount(() => {
  if (process.client) {
    window.removeEventListener('beforeunload', playground.handleWindowClose)
    window.removeEventListener('keyup', playground.handleWindowKeyup)
  }
})
</script>

<template>
  <ClientOnly>
    <PlaygroundPanes class="absolute inset-0 w-full h-full" />
  </ClientOnly>
</template>
