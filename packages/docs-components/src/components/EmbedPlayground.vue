<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { computed } from 'vue'
import { EDITOR_BASE_URL, EDITOR_HOST } from '../constants/Constants'

const props = defineProps({
  src: {
    type: [String, URL],
    default: EDITOR_BASE_URL,
  },
  openSrc: {
    type: String,
    default: null,
    nullable: true,
  },
  height: {
    type: String,
    default: '30em',
  },
  showOpenButton: {
    type: Boolean,
    default: false,
  },
})

const defaultOpenSrc = computed(
  () => {
    const srcUrl = new URL(props.src)
    const url = new URL(props.src)

    url.protocol = 'https:'
    url.hostname = EDITOR_HOST
    url.port = ''
    url.search = ''

    if (srcUrl.searchParams.has('code'))
      url.searchParams.set('code', srcUrl.searchParams.get('code') || '')

    if (srcUrl.searchParams.has('tests'))
      url.searchParams.set('tests', srcUrl.searchParams.get('tests') || '')

    return url.toString()
  },
)
</script>

<template>
  <div class="flex flex-col">
    <ClientOnly>
      <div class="w-full relative" :style="{ height: props.height }">
        <iframe
          :src="String(props.src)"
          allow="clipboard-read; clipboard-write"
          frameborder="0"
          title="Previsualización en EsJS Editor"
          class="w-full h-full border-0 rounded-[8px] bg-transparent"
        />
      </div>
    </ClientOnly>

    <div class="flex flex-row justify-center -mt-1 z-10 print:hidden">
      <a
        v-if="showOpenButton"
        :href="props.openSrc || defaultOpenSrc"
        target="_blank"
        title="Abrir en EsJS Editor"
        class="flex flex-row items-center space-x-1 px-2.5 py-0.5 rounded-full bg-indigo-600 hover:bg-indigo-400"
      >
        <Icon icon="mdi:open-in-new" class="w-4 h-4 text-white" />
        <span class="text-white text-sm">Abrir Editor</span>
      </a>
    </div>
  </div>
</template>
