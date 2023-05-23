<script setup lang="ts">
import VueSplitView from 'vue-split-view'
import 'vue-split-view/dist/style.css?inline'
import { computed } from 'vue'
import { useSettings } from '@/composables/useSettings'
import PlaygroundEditor from '@/components/PlaygroundEditor.vue'
import PlaygroundOutput from '@/components/PlaygroundOutput.vue'
import PlaygroundTestsEditor from '@/components/PlaygroundTestsEditor.vue'

const settings = useSettings().settings

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
            <PlaygroundEditor class="w-full h-full overflow-hidden" />
          </template>
          <template #B>
            <PlaygroundTestsEditor class="w-full h-full overflow-hidden" />
          </template>
        </VueSplitView>
      </template>
      <template #B>
        <PlaygroundOutput class="w-full h-full overflow-hidden" />
      </template>
    </VueSplitView>
  </div>
</template>
