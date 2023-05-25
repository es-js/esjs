<script setup lang="ts">
import VueSplitView from 'vue-split-view'
import 'vue-split-view/dist/style.css?inline'
import { computed } from 'vue'
import { useSettings } from '@/composables/useSettings'
import OutputIframe from '@/output/OutputIframe.vue'
import { useEditor } from '@/composables/useEditor'

const settings = useSettings().settings

const editor = useEditor()

const codeEditorHeight = computed(() => (settings.value.hideOptions && settings.value.hideTests ? '100%' : 'calc(100% - 40px)'))
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
            <div class="w-full h-full overflow-hidden">
              <CodeEditor class="w-full h-full" />
            </div>
          </template>
          <template #B>
            <div class="w-full h-full overflow-hidden flex flex-col">
              <TestsBar v-if="!settings.hideOptions || !settings.hideTests" :class="{ 'flex-grow': settings.hideTests }" />
              <TestsEditor v-if="!settings.hideTests" class="flex flex-grow" />
            </div>
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
