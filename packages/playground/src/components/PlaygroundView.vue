<script setup lang="ts">
import { Pane, Splitpanes } from 'splitpanes'
import { computed, watch } from 'vue'
import { Icon } from '@iconify/vue'
import { useEventBus } from '@vueuse/core'
import { useSettings } from '@/composables/useSettings'
import OutputIframe from '@/output/OutputIframe.vue'
import { useEditor } from '@/composables/useEditor'
import AppContainer from '@/components/shared/AppContainer.vue'
import MonacoEditor from '@/components/MonacoEditor.vue'

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

watch(
  editor.language,
  () => {
    useEventBus('editor_code').emit('change-language', editor.language.value)
    useEventBus('editor_tests').emit('change-language', editor.language.value)
  },
  { immediate: true },
)
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
              <MonacoEditor
                element-id="monacoCodeEditor"
                name="code"
                :value="editor.code.value"
                :readonly="settings.readonlyCode"
                class="relative w-full h-full overflow-hidden"
                @update:value="editor.setCode($event)"
              />
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
                  @click="useSettings().setHideTests(!settings.hideTests)"
                >
                  <Icon icon="mdi:test-tube" class="w-4 h-4" />
                  <span>{{ editor.language.value === 'esjs' ? 'pruebas.esjs' : 'pruebas.js' }}</span>
                </button>

                <div class="flex flex-grow" />
              </div>
            </template>

            <template #default>
              <MonacoEditor
                v-if="!settings.hideTests"
                element-id="monacoTestsEditor"
                name="tests"
                :value="editor.testsCode.value"
                :readonly="settings.readonlyTests"
                class="relative w-full h-full overflow-hidden"
                @update:value="editor.setTestsCode($event)"
              />
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
