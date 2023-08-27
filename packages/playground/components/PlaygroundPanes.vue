<script setup lang="ts">
import {useEventBus} from '@vueuse/core'
import {Pane, Splitpanes} from 'splitpanes'
import 'splitpanes/dist/splitpanes.css'
import {computed, watch} from 'vue'
import {useGrid} from 'vue-screen'
import {useEditor} from '~/composables/app/useEditor'
import {useSettings} from '~/composables/app/useSettings'
import '~/styles/splitpanes.css'

const grid = useGrid('tailwind')

const mdAndUp = computed(() => grid.md || grid.lg || grid.xl)

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

const availableLanguages = [
  [
    {
      label: 'EsJS',
      click: () => {
        editor.language.value = 'esjs'
      },
    },
    {
      label: 'JavaScript',
      click: () => {
        editor.language.value = 'js'
      },
    },
  ]
]

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
  <ClientOnly>
    <Splitpanes
      :horizontal="settings.layout === 'vertical'"
      class="default-theme"
    >
      <Pane v-if="!settings.hideEditor">
        <Splitpanes
          horizontal
          class="default-theme"
        >
          <Pane v-if="!settings.hideEditor">
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
                      :items="availableLanguages"
                      :popper="{ placement: 'bottom-start' }"
                    >
                      <UButton
                        color="gray"
                        :label="mdAndUp ? (editor.language.value === 'esjs' ? 'EsJS' : 'JS') : ''"
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
                  v-if="!settings.hideEditor"
                  v-model="editor.code.value"
                  name="code"
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
                    icon="i-mdi-test-tube"
                    :text="editor.language.value === 'esjs' ? 'pruebas.esjs' : 'pruebas.js'"
                    :active="!settings.hideTests"
                    @click="useSettings().setHideTests(!settings.hideTests)"
                  />

                  <div class="flex flex-grow" />
                </div>
              </template>

              <template #default>
                <AppEditor
                  v-if="!settings.hideTests"
                  v-model="editor.testsCode.value"
                  name="tests"
                />
              </template>
            </appcontainer>
          </Pane>
        </Splitpanes>
      </Pane>

      <Pane class="flex flex-col h-full space-y-1">
        <PlaygroundOutput
          v-if="editor.loading.value === false"
          class="relative w-full h-full overflow-hidden"
        />

        <div
          v-if="editor.loading.value === true"
          class="w-full h-full flex flex-col justify-center items-center"
        >
          <div class="flex flex-row items-center space-x-2">
            <span class="text-sm font-medium text-gray-900 dark:text-gray-100">Cargando...</span>
          </div>
        </div>
      </Pane>
    </Splitpanes>
  </ClientOnly>
</template>
