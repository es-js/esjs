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

    <div class="flex flex-col print:hidden">
      <EsSandbox
        v-if="codeFromCodeBlock"
        :code="codeFromCodeBlock"
        :hide-preview="props.hidePreview"
        :hide-console="props.hideConsole"
        :height="props.height"
      />
    </div>
  </div>
</template>
