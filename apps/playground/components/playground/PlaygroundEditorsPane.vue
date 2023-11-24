<script setup lang="ts">
import { useEventBus } from '@vueuse/core/index'
import { Pane, Splitpanes } from 'splitpanes'
import 'splitpanes/dist/splitpanes.css'
import { computed } from 'vue'
import { useGrid } from 'vue-screen'
import { useEditor } from '~/composables/app/useEditor'
import { useSettings } from '~/composables/app/useSettings'
import AppEditor from '~/components/input/AppEditor.vue'
import '~/styles/splitpanes.css'

const grid = useGrid('tailwind')

const mdAndUp = computed(() => grid.md || grid.lg || grid.xl)

const settings = useSettings().settings

const editor = useEditor()

const wrapper = ref<HTMLElement | null>(null)

const wrapperHeight = computed(() => wrapper.value?.clientHeight ?? 0)

const testsToolbarHeight = 34

const testsPaneSize = ref(50)
function calculateTestsPaneSize() {
  if (settings.value.hideTests) {
    testsPaneSize.value = Math.round((testsToolbarHeight / wrapperHeight.value) * 100)
  } else {
    testsPaneSize.value = 50
  }
}

watchEffect(() => {
  calculateTestsPaneSize()
})
</script>

<template>
  <div ref="wrapper" class="relative h-full">
    <div class="absolute inset-0">
      <Splitpanes
        :key="testsPaneSize"
        horizontal
        class="default-theme"
      >
        <Pane>
          <AppContainer>
            <template #title>
              <div class="flex flex-row items-center space-x-2">
                <AppTabButton
                  icon="i-mdi-code-tags"
                  :text="editor.language.value === 'esjs' ? 'codigo.esjs' : 'codigo.js'"
                  active
                />

                <span class="flex-1" />

                <div
                  v-if="!settings.hideOptions"
                  class="flex flex-row items-center px-1 space-x-2"
                >
                  <UDropdown
                    :items="editor.availableLanguages"
                    :popper="{ placement: 'bottom-start' }"
                  >
                    <UButton
                      color="gray"
                      :label="editor.language.value === 'esjs' ? 'EsJS' : 'JS'"
                      trailing-icon="i-mdi-chevron-down"
                      icon="i-mdi-code-tags"
                      size="2xs"
                    />
                  </UDropdown>

                  <AppButton
                    icon="i-mdi-auto-fix"
                    text="Formatear"
                    description="Formatear código"
                    size="2xs"
                    :icon-only="!mdAndUp"
                    @click="useEventBus('editor_code').emit('format')"
                  />
                </div>
              </div>
            </template>

            <template #default>
              <AppEditor
                v-model="editor.code.value"
                name="code"
              />
            </template>
          </AppContainer>
        </Pane>

        <Pane
          :key="`${settings.hideTests}-${settings.layout}`"
          :size="testsPaneSize"
          :min-size="settings.hideTests ? testsPaneSize : 20"
          :max-size="settings.hideTests ? testsPaneSize : 80"
        >
          <div class="h-full flex flex-col bg-gray-50 dark:bg-gray-900">
            <div
              class="flex flex-row items-center space-x-2 flex-1"
            >
              <AppTabButton
                icon="i-mdi-test-tube"
                :text="editor.language.value === 'esjs' ? 'pruebas.esjs' : 'pruebas.js'"
                :active="!settings.hideTests"
                class="h-full"
                @click="useSettings().setHideTests(!settings.hideTests)"
              />

              <div class="flex flex-grow" />
            </div>
            <AppEditor
              v-if="!settings.hideTests"
              v-model="editor.testsCode.value"
              name="tests"
            />
          </div>
        </Pane>
      </Splitpanes>
    </div>
  </div>
</template>
