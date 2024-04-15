<script setup lang="ts">
import { useEventBus } from '@vueuse/core/index'
import { Pane, Splitpanes } from 'splitpanes'
import { computed } from 'vue'
import { useGrid } from 'vue-screen'
import AppEditor from '~/components/input/AppEditor.vue'
import LanguageSwitcher from '~/components/input/LanguageSwitcher.vue'
import { useEditor } from '~/composables/useEditor'
import { FILE_TESTS, useFiles } from '~/composables/useFiles'
import { useSettings } from '~/composables/useSettings'

const grid = useGrid('tailwind')

const mdAndUp = computed(() => grid.md || grid.lg || grid.xl)

const settings = useSettings().settings

const editor = useEditor()

const files = useFiles()

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

const filesForTab0 = computed(() => files.files.value.filter(file => file.tab === 0))
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
                <NuxtScrollbar class="flex flex-row items-center overflow-x-auto">
                  <AppTabButton
                    v-for="file in filesForTab0"
                    :key="file.name"
                    :icon="file.icon ?? 'i-mdi-file-outline'"
                    :text="files.getFileNameWithExtension(file.name)"
                    :active="files.getActiveFile().name === file.name"
                    @click="files.setActiveFile(file.name)"
                  />
                </NuxtScrollbar>

                <span class="flex-1" />

                <div
                  v-if="!settings.hideOptions"
                  class="flex flex-row flex-shrink-1 flex-grow-0 items-center px-1 space-x-2"
                >
                  <LanguageSwitcher v-if="!editor.isLearnApp.value" />

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
                name="code"
                :model-value="files.getActiveFileContent()"
                :readonly="files.getActiveFile().readonly"
                @update:model-value="files.updateFile(files.getActiveFile().name, {
                  content: $event,
                })"
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
                :text="files.getFileNameWithExtension(FILE_TESTS)"
                :active="!settings.hideTests"
                class="h-full"
                @click="useSettings().setHideTests(!settings.hideTests)"
              />

              <div class="flex flex-grow" />
            </div>
            <AppEditor
              v-if="!settings.hideTests"
              name="tests"
              :model-value="files.getFileContent(FILE_TESTS)"
              @update:model-value="files.updateFile(FILE_TESTS, {
                content: $event,
              })"
            />
          </div>
        </Pane>
      </Splitpanes>
    </div>
  </div>
</template>
