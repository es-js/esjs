<script setup lang="ts">
import type { Ref } from 'vue'
import { computed, ref } from 'vue'
import * as lzs from 'lz-string'
import { useCode } from '../composables/useCode'
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
  showOpenButton: {
    type: Boolean,
    default: false,
  },
})

const slot: Ref<null | HTMLElement> = ref(null)

const playgroundUrl = computed(
  () => {
    const url = new URL(PLAY_BASE_URL)

    const compressedCodeFromCodeBlock = useCode().getCompressedCodeFromCodeBlock(slot.value)

    if (!compressedCodeFromCodeBlock)
      return url

    const options = {
      hidePreview: String(props.hidePreview === 'true' || props.hidePreview === true),
      hideConsole: String(props.hideConsole === 'true' || props.hideConsole === true),
    }

    url.searchParams.set('code', compressedCodeFromCodeBlock)
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
      <EmbedPlayground :src="playgroundUrl" :height="height" :show-open-button="showOpenButton" />
    </div>
  </div>
</template>
