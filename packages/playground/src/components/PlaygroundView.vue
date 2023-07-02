<script setup lang="ts">
import { Pane, Splitpanes } from 'splitpanes'
import { computed } from 'vue'
import { Icon } from '@iconify/vue'
import { useSettings } from '@/composables/useSettings'
import OutputIframe from '@/output/OutputIframe.vue'
import { useEditor } from '@/composables/useEditor'
import AppContainer from '@/components/shared/AppContainer.vue'

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

function openFile(file: string) {
  // editor.openFile(file)
}

function toggleTestsEditor() {
  useSettings().setHideTests(!settings.value.hideTests)
}
</script>

<template>
  <Splitpanes :horizontal="settings.layout === 'vertical'" class="default-theme">
    <Pane v-if="!settings.hideEditor">
      <Splitpanes horizontal class="default-theme">
        <Pane v-if="!settings.hideEditor">
          <AppContainer>
            <template #title>
              <div class="flex flex-row items-center space-x-2">
                <button class="flex flex-row items-center px-2 py-1 space-x-1 text-sm bg-gray-100 hover:bg-gray-200 text-gray-900 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white rounded-tl">
                  <Icon icon="mdi:code-tags" class="w-4 h-4" />
                  <span>{{ editor.language.value === 'esjs' ? 'codigo.esjs' : 'codigo.js' }}</span>
                </button>

                <div class="flex flex-grow" />
              </div>
            </template>

            <template #default>
              <CodeEditor class="relative w-full h-full overflow-hidden" />
            </template>
          </AppContainer>
        </Pane>
        <Pane
          :size="testsPaneSize"
          :min-size="testsPaneMinSize"
          :max-size="testsPaneSize"
          :class="{
            'min-h-[30px] max-h-[30px]': settings.hideTests,
          }"
          class="w-full h-full flex flex-col space-y-1"
        >
          <AppContainer class="flex-grow">
            <template #title>
              <div class="flex flex-row items-center space-x-2">
                <button
                  class="flex flex-row items-center px-2 py-1 space-x-1 text-sm bg-gray-100 hover:bg-gray-200 text-gray-900 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white rounded-tl"
                  @click="toggleTestsEditor"
                >
                  <Icon icon="mdi:test-tube" class="w-4 h-4" />
                  <span>{{ editor.language.value === 'esjs' ? 'pruebas.esjs' : 'pruebas.js' }}</span>
                </button>

                <div class="flex flex-grow" />
              </div>
            </template>

            <template #default>
              <TestsEditor v-if="!settings.hideTests" class="relative w-full h-full overflow-hidden" />
            </template>
          </appcontainer>
        </Pane>
      </Splitpanes>
    </Pane>

    <Pane class="flex flex-col h-full space-y-1">
      <OutputIframe class="relative w-full h-full overflow-hidden" />
    </Pane>
  </Splitpanes>
</template>
