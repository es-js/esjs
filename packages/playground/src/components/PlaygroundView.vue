<script setup lang="ts">
import VueSplitView from 'vue-split-view'
import 'vue-split-view/dist/style.css?inline'
import { computed, watch } from 'vue'
import debounce from 'lodash.debounce'
import { useSettings } from '@/composables/useSettings'
import OutputIframe from '@/output/OutputIframe.vue'
import { useEditor } from '@/composables/useEditor'

const settings = useSettings().settings

const editor = useEditor()

const onCodeChangeDebounced = debounce(() => {
  editor.execute()
}, 600)

const codeEditorHeight = computed(() => (settings.value.hideOptions && settings.value.hideTests ? '100%' : 'calc(100% - 40px)'))

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
  <div class="flex flex-row w-full h-full">
    <VueSplitView :direction="settings.layout" :a-max="settings.hideEditor ? '0' : undefined" :b-max="0" class="overflow-hidden">
      <template v-if="!settings.hideEditor" #A>
        <VueSplitView
          direction="vertical"
          :a-min="settings.hideTests ? `${codeEditorHeight}` : '50%'"
          :a-max="settings.hideTests ? `${codeEditorHeight}` : '50%'"
          class="overflow-hidden"
        >
          <template v-if="!settings.hideEditor" #A>
            <CodeEditor class="w-full h-full overflow-hidden" />
          </template>
          <template #B>
            <TestsEditor class="w-full h-full overflow-hidden" />
          </template>
        </VueSplitView>
      </template>
      <template #B>
        <div class="w-full h-full overflow-hidden bg-gray-900">
          <OutputIframe v-if="editor.output.value" />
        </div>
      </template>
    </VueSplitView>
  </div>
</template>
