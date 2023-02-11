<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { computed } from 'vue'
import { EDITOR_BASE_URL } from '../constants/Constants'

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
    const url = new URL(props.src)

    url.search = ''

    return url.toString()
  },
)
</script>

<template>
  <div class="flex flex-col">
    <ClientOnly>
      <div class="w-full relative" :style="{ height: props.height }">
        <iframe :src="String(props.src)" class="w-full h-full border-0 rounded-[8px] bg-gray-800" />
      </div>
    </ClientOnly>

    <div class="flex flex-row justify-center -mt-2 z-10 print:hidden">
      <a
        v-if="showOpenButton"
        :href="props.openSrc || defaultOpenSrc"
        target="_blank"
        class="flex flex-row items-center space-x-1 px-2.5 py-0.5 rounded-full bg-indigo-500 hover:bg-indigo-400"
      >
        <Icon icon="mdi:open-in-new" class="w-4 h-4 text-white" />
        <span class="text-white text-sm">Abrir Editor</span>
      </a>
    </div>
  </div>
</template>
