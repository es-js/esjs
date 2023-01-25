<script setup lang="ts">
import { EDITOR_BASE_URL } from '../constants/Constants'

const props = defineProps({
  src: {
    type: [String, URL],
    default: EDITOR_BASE_URL,
  },
  height: {
    type: String,
    default: '30em',
  },
})
</script>

<template>
  <ClientOnly>
    <div class="w-full relative" :style="{ height: props.height }">
      <iframe :src="String(props.src)" class="w-full h-full border-0 rounded-[8px] bg-gray-800" />
    </div>
  </ClientOnly>
</template>
