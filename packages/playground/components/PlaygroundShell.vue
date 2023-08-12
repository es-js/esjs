<script setup lang="ts">
const settings = useSettings()

const editor = useEditor()

const playground = usePlayground()

const share = useLZShare()

onBeforeMount(async () => {
  share.setSettingsFromUrl()
  await share.setCodeFromUrl()
  editor.loading.value = false
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
  <div class="w-full h-screen bg-gray-50 dark:bg-gray-900 dark:text-gray-100 overflow-hidden">
    <div class="flex flex-col w-full h-full">
      <AppBar class="h-10" />

      <div class="flex flex-row flex-grow">
        <div class="relative flex flex-1">
          <ClientOnly>
            <PlaygroundPanes class="absolute inset-0 w-full h-full" />
          </ClientOnly>
        </div>
      </div>
    </div>

    <UNotifications />
  </div>
</template>

<style>
html {
    overflow: hidden !important;
}
</style>
