<script setup lang="ts">
import { setDark } from '~/composables/dark'
import { useLZShare } from '~/composables/useLZShare'
import { usePlayground } from '~/composables/usePlayground'

const playground = usePlayground()

const share = useLZShare()

const settings = useSettings().settings

const handleMessage = (event: MessageEvent) => {
  const { type, data } = event.data

  if (type === 'dark') {
    setDark(data.dark)
  }
}

function shouldPreventClose() {
  return import.meta.env.MODE !== 'development' && !settings.value.embed
}

onBeforeMount(async() => {
  share.setSettingsFromUrl()

  await share.loadCodeFromUrl()
})

onMounted(() => {
  if (shouldPreventClose()) {
    window.addEventListener('beforeunload', playground.handleWindowClose)
  }
  window.addEventListener('keyup', playground.handleWindowKeyup)
  window.addEventListener('message', handleMessage, false)
})

onBeforeUnmount(() => {
  if (shouldPreventClose()) {
    window.removeEventListener('beforeunload', playground.handleWindowClose)
  }
  window.removeEventListener('keyup', playground.handleWindowKeyup)
})
</script>

<template>
  <ClientOnly>
    <PlaygroundPanes class="absolute inset-0 w-full h-full" />

    <template #fallback>
      <div class="w-full grid grid-cols-2 gap-2 px-2 pb-2">
        <div class="w-full flex flex-col justify-center items-center text-center rounded border dark:border-gray-800">
          <span>Cargando editor...</span>
        </div>

        <div class="w-full flex flex-col justify-center items-center text-center rounded border dark:border-gray-800">
          <span>Cargando resultado...</span>
        </div>
      </div>
    </template>
  </ClientOnly>
</template>
