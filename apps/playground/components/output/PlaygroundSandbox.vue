<script setup lang="ts">
import { createSandbox } from '@es-js/sandbox/render'
import { useEventBus } from '@vueuse/core'
import debounce from 'lodash.debounce'
import { onMounted, onUnmounted, watch } from 'vue'
import { isDark } from '~/composables/dark'
import { useEditor } from '~/composables/useEditor'
import { FILE_IMPORT_MAP, FILE_TESTS, useFiles } from '~/composables/useFiles'
import { useLZShare } from '~/composables/useLZShare'
import { useSettings } from '~/composables/useSettings'
import { PreviewProxy } from '~/utils/PreviewProxy'

const editor = useEditor()

const files = useFiles()

const settings = useSettings()

const settingsStore = settings.settings

let sandbox: HTMLIFrameElement
let proxy: PreviewProxy

onMounted(() => {
  init()

  const bus = useEventBus('sandbox')

  bus.on((event: string) => {
    if (event === 'refresh') {
      refresh()
    }
  })
})

onUnmounted(() => {
  proxy.destroy()
})

async function init() {
  if (sandbox) {
    proxy.destroy()
    const esjsSandboxElement = document.getElementById('esjs-sandbox')
    if (esjsSandboxElement) {
      esjsSandboxElement.innerHTML = ''
    }
  }

  sandbox = createSandbox('esjs-sandbox', {
    theme: isDark.value ? 'dark' : 'light',
    hidePreview: settingsStore.value.hidePreview,
    previewTab: useSettings().activePreviewTab.value,
    files: files.files.value,
    importMap: files.getFileContent(FILE_IMPORT_MAP),
  })

  proxy = new PreviewProxy(sandbox, {
    on_error: (error: any) => {
      if (error.value.line && error.value.column) {
        useEventBus(
          error.value.filename === FILE_TESTS ? 'editor_tests' : 'editor_code',
        ).emit('decorate-error', {
          line: error.value.line,
          column: error.value.column,
        })
      }
    },
    on_unhandled_rejection: (error: any) => { },
    on_prueba_success: (args: any) => {
      window.parent.postMessage({
        action: args.action,
        data: args.data,
        url: window.location.href,
      }, '*')
    },
    on_prueba_error: (args: any) => {
      window.parent.postMessage({
        action: args.action,
        data: args.data,
        url: window.location.href,
      }, '*')
    },
    on_pruebas_finished: (args: any) => {
      window.parent.postMessage({
        action: args.action,
        data: args.data,
        url: window.location.href,
      }, '*')
    },
    on_active_preview: (args: any) => {
      if (args.data === useSettings().activePreview.value) {
        return
      }

      useSettings().setActivePreview(args.data)
    },
    on_active_preview_tab: (args: any) => {
      if (args.data === useSettings().activePreviewTab.value) {
        return
      }

      useSettings().setActivePreviewTab(args.data)
      useSettings().setHideConsole(args.data === 'hidden')
    },
  })
}

function refresh() {
  init()
}

const updateSandboxDebounced = debounce(updateSandbox, 500)

async function updateSandbox() {
  if (!proxy) {
    return
  }

  await proxy.eval(toRaw(files.files.value))
}

function openInNewTab() {
  const url = useLZShare().getEjecutarUrl()

  window.open(url, '_blank')
}

watch(isDark, () => {
  proxy?.iframe_command('DARK_MODE', isDark.value)
})

watch(
  () => settingsStore.value.hidePreview,
  () => {
    proxy?.iframe_command('HIDE_PREVIEW', settingsStore.value.hidePreview)
  },
)

watch(
  () => settingsStore.value.preview,
  () => {
    proxy?.iframe_command('PREVIEW', useSettings().activePreview.value)
  },
)

watch(
  () => settingsStore.value.previewTab,
  () => {
    proxy?.iframe_command('PREVIEW_TAB', useSettings().activePreviewTab.value)
  },
)

watch(
  () => {
    return files.files.value.map((file) => file.content)
  },
  () => {
    if (!settingsStore.value.autoCompile) {
      return
    }

    useEventBus('editor_code').emit('clear-decorations')
    useEventBus('editor_tests').emit('clear-decorations')

    updateSandboxDebounced()
  }
)
</script>

<template>
  <AppContainer class="w-full h-full">
    <template #title>
      <div class="flex flex-row items-center">
        <AppButton
          description="Refrescar"
          icon="i-mdi-refresh"
          variant="ghost"
          size="2xs"
          @click="refresh"
        />

        <AppButton
          :icon="settingsStore.hidePreview ? 'i-mdi-eye-off' : 'i-mdi-eye'"
          :description="settingsStore.hidePreview ? 'Mostrar vista previa' : 'Ocultar vista previa'"
          variant="ghost"
          @click="settings.setHidePreview(!settingsStore.hidePreview)"
        />

        <div class="flex flex-grow px-2">
          <span class="h-5 flex flex-grow flex-row justify-center items-center text-center text-xs px-3 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-full">
            Resultado
          </span>
        </div>

        <AppButton
          description="Abrir en una nueva pestaña"
          icon="i-mdi-open-in-new"
          variant="ghost"
          size="2xs"
          @click="openInNewTab"
        />
      </div>
    </template>

    <div
      id="esjs-sandbox"
      class="w-full h-full"
    />
  </AppContainer>
</template>
