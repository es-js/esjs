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
  share.setSettingsFromUrl()
  await share.loadCodeFromUrl()
  editor.loading.value = false
})

onMounted(() => {
  window.addEventListener('beforeunload', playground.handleWindowClose)
  window.addEventListener('keyup', playground.handleWindowKeyup)
})

onBeforeUnmount(() => {
  window.removeEventListener('beforeunload', playground.handleWindowClose)
  window.removeEventListener('keyup', playground.handleWindowKeyup)
})
</script>

<template>
  <PlaygroundPanes class="absolute inset-0 w-full h-full" />
</template>
