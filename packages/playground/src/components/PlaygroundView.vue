<script setup lang="ts">
import { Pane, Splitpanes } from 'splitpanes'
import { computed } from 'vue'
import { useSettings } from '@/composables/useSettings'
import OutputIframe from '@/output/OutputIframe.vue'
import { useEditor } from '@/composables/useEditor'
import PreviewBar from '@/components/navigation/PreviewBar.vue'

const settings = useSettings().settings

const editor = useEditor()

const testsPaneSize = computed(() => {
  if (settings.value.hideTests)
    return settings.value.layout === 'vertical' ? 10 : 5

  return 50
})

const testsPaneMinSize = computed(() => {
  if (settings.value.hideTests)
    return settings.value.layout === 'vertical' ? 10 : 5

  return 20
})
</script>

<template>
  <Splitpanes :horizontal="settings.layout === 'vertical'" class="default-theme">
    <Pane v-if="!settings.hideEditor">
      <Splitpanes horizontal class="default-theme">
        <Pane
          v-if="!settings.hideEditor"
          :class="{
            'pl-2': settings.layout === 'horizontal',
            'pb-2': settings.layout === 'horizontal' && settings.hideOptions,
            'px-2': settings.layout === 'vertical',
          }"
        >
          <CodeEditor class="relative w-full h-full overflow-hidden rounded border border-light-900 dark:border-dark-400" />
        </Pane>
        <Pane
          v-if="!settings.hideOptions || !settings.hideTests"
          :size="testsPaneSize"
          :min-size="testsPaneMinSize"
          :max-size="testsPaneSize"
          :class="{
            'pl-2 pb-2': settings.layout === 'horizontal',
            'px-2': settings.layout === 'vertical',
          }"
          class="w-full h-full flex flex-col space-y-1"
        >
          <TestsBar v-if="!settings.hideOptions || !settings.hideTests" :class="{ 'flex-grow': settings.hideTests }" />
          <TestsEditor v-if="!settings.hideTests" class="relative w-full h-full overflow-hidden rounded border border-light-900 dark:border-dark-400" />
        </Pane>
      </Splitpanes>
    </Pane>

    <Pane class="flex flex-col h-full">
      <PreviewBar v-if="!settings.hideOptions" class="h-8 pb-1" />

      <div class="flex flex-col flex-grow">
        <OutputIframe
          v-if="editor.output.value"
          :class="{
            'px-2 pb-2': settings.layout === 'vertical',
            'pb-2 pr-2': settings.layout === 'horizontal',
            'pl-2': settings.hideEditor,
          }"
          class="relative w-full overflow-hidden"
        />
      </div>
    </Pane>
  </Splitpanes>
</template>
