<script setup lang="ts">
import VueSplitView from 'vue-split-view'
import { useEditor } from '@/composables/useEditor'
import PlaygroundEditor from '@/components/PlaygroundEditor.vue'
import 'vue-split-view/dist/style.css'
import { useSettings } from '@/composables/useSettings'
import PlaygroundOutput from '@/components/PlaygroundOutput.vue'

const editor = useEditor()

const settings = useSettings().settings

const view = 'horizontal'
</script>

<template>
  <div class="flex flex-row w-full h-full">
    <VueSplitView :direction="settings.layout" :a-max="settings.hideEditor ? 0 : undefined" class="overflow-hidden">
      <template v-if="!settings.hideEditor" #A>
        <PlaygroundEditor class="w-full h-full overflow-hidden" />
      </template>
      <template #B>
        <PlaygroundOutput class="w-full h-full overflow-hidden" />
      </template>
    </VueSplitView>
  </div>
</template>
