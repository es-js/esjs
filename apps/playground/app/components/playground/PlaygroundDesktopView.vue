<script setup lang="ts">
import { Pane, Splitpanes } from 'splitpanes'
import { watch } from 'vue'
import PlaygroundOutput from '~/components/output/PlaygroundOutput.vue'
import PlaygroundDiffEditor from '~/components/playground/PlaygroundDiffEditor.vue'
import PlaygroundEditorsPane from '~/components/playground/PlaygroundEditorsPane.vue'
import { useSettings } from '~/composables/useSettings'

const settings = useSettings().settings

const inputPaneSize = ref('50%')
const outputPaneSize = ref('50%')

watch(
  () => {
    return {
      hideEditor: settings.value.hideEditor,
      hideOutput: settings.value.hideOutput,
    }
  },
  () => {
    if (settings.value.hideEditor) {
      inputPaneSize.value = '0%'
      outputPaneSize.value = '100%'
    } else if (settings.value.hideOutput) {
      inputPaneSize.value = '100%'
      outputPaneSize.value = '0%'
    } else {
      inputPaneSize.value = '50%'
      outputPaneSize.value = '50%'
    }
  },
  { immediate: true },
)
</script>

<template>
  <Splitpanes
    :horizontal="settings.layout === 'vertical'"
    class="default-theme"
    :class="{
      'editor-hidden': settings.hideEditor,
      'output-hidden': settings.hideOutput,
    }"
  >
    <Pane
      v-show="!settings.hideEditor"
      :size="inputPaneSize"
    >
      <PlaygroundEditorsPane />
    </Pane>

    <Pane
      v-if="settings.showCompiledEditor"
      :size="30"
    >
      <PlaygroundDiffEditor />
    </Pane>

    <Pane
      v-show="!settings.hideOutput"
      :size="outputPaneSize"
    >
      <PlaygroundOutput />
    </Pane>
  </Splitpanes>
</template>
