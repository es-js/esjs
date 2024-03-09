<script setup lang="ts">
import { useLZShare } from '~/composables/useLZShare'

definePageMeta({
  layout: 'learn',
})

onBeforeMount(async() => {
  const share = useLZShare()

  await share.loadCodeFromUrl()
})
</script>

<template>
  <LearnShell />
</template>
