<script setup lang="ts">
import type { Ref } from 'vue'
import { computed, ref } from 'vue'
import * as lzs from 'lz-string'
import { PLAY_BASE_URL } from '../constants/Constants'

const props = defineProps({
  hidePreview: {
    type: [Boolean, String],
    default: false,
  },
  hideConsole: {
    type: [Boolean, String],
    default: false,
  },
  hideOptions: {
    type: [Boolean, String],
    default: true,
  },
  height: {
    type: String,
    default: '50vh',
  },
})

const slot: Ref<null | HTMLElement> = ref(null)

const sharedCode = computed(
  () => {
    if (!slot.value)
      return null

    const codeElement = slot.value.getElementsByTagName('code')

    if (!codeElement || !codeElement.length)
      return null

    const code = codeElement[0].innerText

    return lzs.compressToEncodedURIComponent(code)
  },
)

const playgroundUrl = computed(
  () => {
    const url = new URL(PLAY_BASE_URL)

    if (!sharedCode.value)
      return url

    const options = {
      hidePreview: String(props.hidePreview === 'true' || props.hidePreview === true),
      hideConsole: String(props.hideConsole === 'true' || props.hideConsole === true),
    }

    url.searchParams.set('code', sharedCode.value)
    url.searchParams.set('hidePreview', options.hidePreview)
    url.searchParams.set('hideConsole', options.hideConsole)
    url.searchParams.set('hideOptions', String(props.hideOptions))
    url.searchParams.set('options', lzs.compressToEncodedURIComponent(JSON.stringify(options)))

    return url
  },
)
</script>

<template>
  <div class="flex flex-col my-[16px] group-hover">
    <div ref="slot" class="hidden">
      <slot />
    </div>

    <div class="flex flex-col print:hidden">
      <EmbedPlayground :src="playgroundUrl" :height="height" show-open-button />
    </div>
  </div>
</template>
