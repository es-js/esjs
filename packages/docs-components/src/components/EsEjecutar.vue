<script setup lang="ts">
import type { Ref } from 'vue'
import { computed, ref } from 'vue'
import { useCode } from '../composables'
import EsSandbox from './EsSandbox.vue'

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
  theme: {
    type: String,
    default: null,
  },
  browserWindow: {
    type: Boolean,
    default: false,
  },
  browserWindowUrl: {
    type: String,
    default: '/',
  },
})

const slot: Ref<null | HTMLElement> = ref(null)

const codeFromCodeBlock = computed(
  () => {
    return useCode().getCodeFromCodeBlock(slot.value)
  },
)
</script>

<template>
  <div class="EsEjecutar flex flex-col my-[16px] group-hover">
    <div ref="slot" class="hidden">
      <slot />
    </div>

    <div
      class="flex flex-col print:hidden"
      :class="{
        BrowserWindow: props.browserWindow,
      }"
    >
      <div
        v-if="props.browserWindow"
        class="py-1 px-2 rounded-tl rounded-tr flex items-center space-x-2 bg-gray-100 dark:bg-gray-800"
      >
        <div class="flex flex-row space-x-1">
          <div class="rounded-full h-3 w-3 bg-red-400" />
          <div class="rounded-full h-3 w-3 bg-yellow-400" />
          <div class="rounded-full h-3 w-3 bg-green-400" />
        </div>
        <div class="flex-auto px-2 py-1 rounded text-xs bg-gray-200 dark:bg-gray-700">
          {{ props.browserWindowUrl }}
        </div>
      </div>
      <EsSandbox
        v-if="codeFromCodeBlock"
        :code="codeFromCodeBlock"
        :hide-preview="props.hidePreview"
        :hide-console="props.hideConsole"
        :height="props.height"
        :theme="props.theme"
      />
    </div>
  </div>
</template>

<style>
.BrowserWindow {
  @apply rounded border border-gray-300 dark:border-gray-700;
}

.BrowserWindow > .EsSandbox > iframe {
  @apply rounded-b;
}
</style>
