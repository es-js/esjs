<script setup lang="ts">
import { Pane, Splitpanes } from 'splitpanes'
import { computed, watch } from 'vue'
import { Icon } from '@iconify/vue'
import { useEventBus } from '@vueuse/core'
import AppTabButton from '@/components/shared/AppTabButton.vue'
import { useSettings } from '@/composables/useSettings'
import OutputIframe from '@/components/output/OutputIframe.vue'
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
                <AppTabButton
                  icon="mdi:code-tags"
                  :text="editor.language.value === 'esjs' ? 'codigo.esjs' : 'codigo.js'"
                  active
                />

                <span class="flex-1" />
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
                <AppTabButton
                  icon="mdi:test-tube"
                  :text="editor.language.value === 'esjs' ? 'pruebas.esjs' : 'pruebas.js'"
                  :active="!settings.hideTests"
                  @click="useSettings().setHideTests(!settings.hideTests)"
                />

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
