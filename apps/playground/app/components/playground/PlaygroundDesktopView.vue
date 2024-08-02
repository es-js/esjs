<script setup lang="ts">
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import { watch } from 'vue';
import PlaygroundOutput from '~/components/output/PlaygroundOutput.vue';
import PlaygroundEditorsPane from '~/components/playground/PlaygroundEditorsPane.vue';
import { useSettings } from '~/composables/useSettings';

const settings = useSettings().settings

const inputPaneSize = ref(50)
const outputPaneSize = ref(50)

watch(
  () => {
    return {
      hideEditor: settings.value.hideEditor,
      hideOutput: settings.value.hideOutput,
    }
  },
  () => {
    if (settings.value.hideEditor) {
      inputPaneSize.value = 0
      outputPaneSize.value = 100
    } else if (settings.value.hideOutput) {
      inputPaneSize.value = 100
      outputPaneSize.value = 0
    } else {
      inputPaneSize.value = 50
      outputPaneSize.value = 50
    }
  },
  { immediate: true },
)
</script>

<template>
  <div class="w-full h-full flex flex-col">
    <ResizablePanelGroup :key="settings.layout" :direction="settings.layout === 'vertical' ? 'vertical' : 'horizontal'">
       <ResizablePanel v-show="!settings.hideEditor" :size="inputPaneSize" :min-size="20" :max-size="80">
         <ResizablePanelGroup direction="horizontal">
          <ResizablePanel v-show="!settings.hideEditor">
            <PlaygroundEditorsPane />
          </ResizablePanel>

          <ResizableHandle v-if="settings.showCompiledEditor" with-handle />

          <ResizablePanel v-if="settings.showCompiledEditor">
            <PlaygroundDiffEditor />
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>

      <ResizableHandle v-if="!settings.hideEditor && !settings.hideOutput" with-handle />

      <ResizablePanel
        v-show="!settings.hideOutput"
        :default-size="outputPaneSize"
        class="px-2 pb-2"
        :class="{
          'pt-2': settings.layout === 'vertical' && !settings.hideEditor,
        }"
      >
        <PlaygroundOutput />
      </ResizablePanel>
    </ResizablePanelGroup>
  </div>
</template>
