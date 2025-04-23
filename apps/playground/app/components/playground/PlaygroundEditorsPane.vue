<script setup lang="ts">
import { useEventBus } from '@vueuse/core/index'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import { computed } from 'vue'
import { useGrid } from 'vue-screen'
import AppEditor from '~/components/input/AppEditor.vue'
import LanguageSwitcher from '~/components/input/LanguageSwitcher.vue'
import { useEditor } from '~/composables/useEditor'
import { FILE_TESTS, useFiles } from '~/composables/useFiles'
import { useSettings } from '~/composables/useSettings'
import { useElementSize } from '@vueuse/core'

const grid = useGrid('tailwind')

const mdAndUp = computed(() => grid.md || grid.lg || grid.xl)

const settings = useSettings().settings

const editor = useEditor()

const files = useFiles()

const wrapper = ref<HTMLElement | null>(null)

const testsToolbarHeight = 34

const testsPaneDefaultSize = computed(() => {
  if (!settings.value.hideTests) {
    return 50
  }

  const { height: wrapperHeight } = useElementSize(wrapper)

  return Math.round((testsToolbarHeight / wrapperHeight.value) * 100)
})

const filesForTab0 = computed(() => files.files.value.filter(file => file.tab === 0))

const activeFile = computed(() => files.getActiveFile())
</script>

<template>
  <div ref="wrapper" class="w-full h-full">
    <ResizablePanelGroup :key="testsPaneDefaultSize" direction="vertical">
      <ResizablePanel :min-size="20"
                      :max-size="settings.hideTests ? 100 : 80"
                      :class="{'pb-2': !settings.hideTests}">
        <AppContainer>
          <template #title>
            <div class="flex flex-row items-center space-x-2">
              <NuxtScrollbar class="flex flex-row items-center overflow-x-auto">
                <AppTabButton
                  v-for="file in filesForTab0"
                  :key="file.name"
                  :icon="file.icon ?? 'i-mdi-file-outline'"
                  :text="files.getFileNameWithExtension(file.name)"
                  :active="activeFile.name === file.name"
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
                  size="xs"
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
              :readonly="activeFile.readonly"
              @update:model-value="files.setFileContent(activeFile.name, $event)"
            />
          </template>
        </AppContainer>
      </ResizablePanel>

      <ResizableHandle v-if="!settings.hideTests" with-handle />

      <ResizablePanel :max-size="80"
                      :default-size="testsPaneDefaultSize"
                      class="pt-2"
                      :class="{
                        'max-h-[40px]': settings.hideTests,
                      }"
      >
        <div class="h-full flex flex-col bg-gray-50 dark:bg-gray-900 rounded border dark:border-gray-800">
          <div class="flex flex-row items-center space-x-2 flex-1 max-h-[30px]">
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
            @update:model-value="files.setFileContent(FILE_TESTS, $event)"
          />
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  </div>
</template>
