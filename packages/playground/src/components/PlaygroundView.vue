<script setup lang="ts">
import { computed } from 'vue'
import { Pane, Splitpanes } from 'splitpanes'
import { useSettings } from '@/composables/useSettings'
import OutputIframe from '@/output/OutputIframe.vue'
import { useEditor } from '@/composables/useEditor'
import PreviewBar from '@/components/navigation/PreviewBar.vue'

const settings = useSettings().settings

const editor = useEditor()

const codeEditorHeight = computed(() => (settings.value.hideOptions && settings.value.hideTests ? '100%' : 'calc(100% - 40px)'))
</script>

<template>
  <div class="flex flex-row w-full h-full ">
    <Splitpanes
      :horizontal="settings.layout === 'horizontal'"
      class="default-theme overflow-hidden"
    >
      <Pane v-if="!settings.hideEditor">
        <Splitpanes horizontal class="default-theme">
          <Pane v-if="!settings.hideEditor">
            <div class="relative w-full h-full flex flex-col p-2">
              <CodeEditor class="relative w-full h-full overflow-hidden rounded" />
            </div>
          </Pane>
          <Pane
            v-if="!settings.hideOptions || !settings.hideTests"
            :size="settings.hideTests ? 5 : 50"
            min-size="8"
            :max-size="settings.hideTests ? 5 : 50"
          >
            <div class="relative w-full h-full flex flex-col">
              <TestsBar v-if="!settings.hideOptions || !settings.hideTests" :class="{ 'flex-grow': settings.hideTests }" />
              <div v-if="!settings.hideTests" class="flex flex-grow p-2">
                <TestsEditor class="relative w-full h-full overflow-hidden rounded" />
              </div>
            </div>
          </Pane>
        </Splitpanes>
      </Pane>
      <Pane>
        <div class="flex flex-col h-full">
          <div v-if="!settings.hideOptions" class="h-10">
            <PreviewBar />
          </div>

          <div class="flex flex-col flex-grow">
            <OutputIframe v-if="editor.output.value" class="relative w-full px-2 pb-2 overflow-hidden" />
          </div>
        </div>
      </Pane>
    </Splitpanes>
  </div>
</template>
