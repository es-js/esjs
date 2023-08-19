<script setup lang="ts">
import { compressToURL } from '@amoutonbrady/lz-string'
import { Icon } from '@iconify/vue'
import type { Ref } from 'vue'
import { computed, ref } from 'vue'
import { useCode } from '../composables'
import { EDITOR_BASE_URL } from '../constants/Constants'

const props = defineProps({
  onlyPlayground: {
    type: [Boolean, String],
    default: false,
  },
  hidePreview: {
    type: [Boolean, String],
    default: true,
  },
  hideConsole: {
    type: [Boolean, String],
    default: false,
  },
  hideOptions: {
    type: [Boolean, String],
    default: true,
  },
  layout: {
    type: String,
  },
})

const running = ref(props.onlyPlayground)

const slot: Ref<null | HTMLElement> = ref(null)

const codeFromCodeBlock = computed(
  () => {
    return useCode().getCodeFromCodeBlock(slot.value)
  },
)

const playgroundUrl = computed(
  () => {
    if (!codeFromCodeBlock.value)
      return

    const url = new URL(EDITOR_BASE_URL)

    url.searchParams.set('code', compressToURL(codeFromCodeBlock.value))
    url.searchParams.set('layout', props.layout || 'vertical')
    url.searchParams.set('hidePreview', String(props.hidePreview))
    url.searchParams.set('hideEditor', String(!props.onlyPlayground))
    url.searchParams.set('hideConsole', String(props.hideConsole))
    url.searchParams.set('hideOptions', String(props.hideOptions))

    return url
  },
)

function run() {
  running.value = true
}

function stop() {
  running.value = false
}
</script>

<template>
  <div class="flex flex-col my-[16px] group-hover">
    <div ref="slot" :class="{ hidden: props.onlyPlayground }">
      <slot />
    </div>

    <span class="w-full h-1" />

    <div v-if="!props.onlyPlayground" class="relative flex flex-row justify-center items-center print:hidden">
      <div class="absolute flex flex-row justify-center z-10 -mt-5">
        <button
          :title="running ? 'Detener' : 'Ejecutar'"
          class="flex flex-row items-center space-x-1 px-2 py-0.5 rounded-full bg-indigo-500 hover:bg-indigo-400 text-white"
          @click="running ? stop() : run()"
        >
          <Icon :icon="running ? 'mdi:stop' : 'mdi:play'" class="w-4 h-4" />
          <span>{{ running ? 'Detener' : 'Ejecutar' }}</span>
        </button>
      </div>
    </div>

    <div v-if="running" class="flex flex-col print:hidden">
      <EmbedPlayground :src="playgroundUrl" height="50vh" show-open-button />
    </div>
  </div>
</template>
