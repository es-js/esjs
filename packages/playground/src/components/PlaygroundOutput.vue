<script setup lang="ts">
import { watch } from 'vue'
import debounce from 'lodash.debounce'
import OutputIframe from '@/output/OutputIframe.vue'
import { useEditor } from '@/composables/useEditor'
import { useSettings } from '@/composables/useSettings'

const editor = useEditor()
const settings = useSettings().settings

const onCodeChangeDebounced = debounce(() => {
  editor.execute()
}, 600)

watch(
  [editor.code, editor.testsCode, () => settings.value.customHtml],
  () => {
    if (!settings.value.autoCompile)
      return

    onCodeChangeDebounced()
  },
)
</script>

<template>
  <div class="bg-gray-900">
    <OutputIframe v-if="editor.output.value" />
  </div>
</template>
