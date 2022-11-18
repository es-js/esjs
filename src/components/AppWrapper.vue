<script setup lang="ts">
import OutputIframe from '@/components/OutputIframe.vue'
import { useEditor } from '@/composables/useEditor'
const editor = useEditor()
</script>

<template>
  <div class="min-h-full grid grid-cols-2">
    <div class="overflow-y-auto">
      <slot name="esjs" />
    </div>

    <div class="overflow-hidden">
      <OutputIframe v-if="editor.output.value" />
    </div>
  </div>
</template>
