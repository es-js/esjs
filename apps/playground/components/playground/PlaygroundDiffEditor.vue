<script setup lang="ts">
import type { AvailableLanguages } from '@es-js/core'
import { computed } from 'vue'
import { useGrid } from 'vue-screen'
import { isDark } from '~/composables/dark'
import { useFiles, type File } from '~/composables/useFiles'
import { useSettings } from '~/composables/useSettings'
import { useEditor } from '~/composables/useEditor'

const grid = useGrid('tailwind')

const mdAndUp = computed(() => grid.md || grid.lg || grid.xl)

const editor = useEditor()

const settings = useSettings().settings

const files = useFiles()

const wrapper = ref<HTMLElement | null>(null)

const valueToCompare = computed((): string => {
  const fromLanguage = editor.language.value

  const toLanguage = fromLanguage === 'esjs' ? 'js' : 'esjs'

  return files.getActiveDiffFile()?.code?.[toLanguage] ?? ''
})

function setActiveDiffFile(file: File) {
  files.setActiveDiffFile(file.name)

  file.tab === 0 ? files.setActiveFile(file.name) : useSettings().setHideTests(false)
}
</script>

<template>
  <div ref="wrapper" class="relative h-full">
    <div class="absolute inset-0">
      <AppContainer>
        <template #title>
          <div class="flex flex-row items-center space-x-2">
            <NuxtScrollbar class="flex flex-row items-center overflow-x-auto">
              <AppTabButton
                v-for="file in files.files.value"
                :key="file.name"
                :icon="file.icon ?? 'i-mdi-file-outline'"
                :text="files.getFileNameWithExtension(file.name)"
                :active="files.getActiveDiffFile()?.name === file.name"
                @click="setActiveDiffFile(file)"
              />
            </NuxtScrollbar>

            <span class="flex-1" />

            <div
              v-if="!settings.hideOptions"
              class="flex flex-row flex-shrink-1 flex-grow-0 items-center px-1 space-x-2"
            >
              <AppButton
                icon="i-mdi-file-compare"
                text="Diferencias"
                description="Mostrar diferencias"
                size="2xs"
                :icon-only="!mdAndUp"
                @click="useSettings().setShowCompiledDiff(!settings.showCompiledDiff)"
              />
            </div>
          </div>
        </template>

        <template #default>
          <MonacoEditor
            v-if="!settings.showCompiledDiff"
            :model-value="valueToCompare"
            :options="{
              ...editor.EDITOR_DEFAULT_OPTIONS,
              readOnly: true,
              theme: isDark ? 'dark' : 'light',
            }"
            lang="javascript"
            class="w-full h-full"
          />

          <MonacoDiffEditor
            v-if="settings.showCompiledDiff"
            :original="files.getActiveDiffFile()?.content"
            :model-value="valueToCompare"
            :options="{
              ...editor.EDITOR_DEFAULT_OPTIONS,
              readOnly: true,
              theme: isDark ? 'dark' : 'light',
            }"
            lang="javascript"
            class="w-full h-full"
          />
        </template>
      </AppContainer>
    </div>
  </div>
</template>
