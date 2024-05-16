<script setup lang="ts">
import { setDark } from '~/composables/dark'
import { useLZShare } from '~/composables/useLZShare'
import { usePlayground } from '~/composables/usePlayground'

const playground = usePlayground()

const share = useLZShare()

const handleMessage = (event: MessageEvent) => {
  const { type, data } = event.data

  if (type === 'dark') {
    setDark(data.dark)
  }
}

onBeforeMount(async() => {
  share.setSettingsFromUrl()

  await share.loadCodeFromUrl()
})

onMounted(() => {
  window.addEventListener('beforeunload', playground.handleWindowClose)
  window.addEventListener('keyup', playground.handleWindowKeyup)
  window.addEventListener('message', handleMessage, false)
})

onBeforeUnmount(() => {
  window.removeEventListener('beforeunload', playground.handleWindowClose)
  window.removeEventListener('keyup', playground.handleWindowKeyup)
})
</script>

<template>
  <PlaygroundPanes class="absolute inset-0 w-full h-full" />
</template>
