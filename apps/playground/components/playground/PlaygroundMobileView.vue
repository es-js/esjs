<script setup lang="ts">
import PlaygroundOutput from '~/components/output/PlaygroundOutput.vue'
import PlaygroundEditorsPane from '~/components/playground/PlaygroundEditorsPane.vue'
import { useEditor } from '~/composables/useEditor'
import { useSettings } from '~/composables/useSettings'

const settings = useSettings().settings

const editor = useEditor()

const tabs = [
  {
    key: 'input',
    label: 'Código',
    description: 'Código',
  },
  {
    key: 'output',
    label: 'Resultado',
    description: 'Resultado',
  },
]
</script>

<template>
  <UTabs
    :items="tabs"
    class="w-full h-full"
    :ui="{
      wrapper: 'flex flex-col space-y-0 flex-col-reverse',
      container: 'flex flex-col flex-1',
      base: 'flex flex-col flex-1',
    }"
  >
    <template #item="{ item }">
      <div class="flex flex-col h-full">
        <PlaygroundEditorsPane v-show="item.key === 'input'" />

        <PlaygroundOutput
          v-show="item.key === 'output'"
          class="relative w-full h-full overflow-hidden"
        />
      </div>
    </template>
  </UTabs>
</template>
