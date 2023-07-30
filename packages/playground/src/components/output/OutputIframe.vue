<script setup lang="ts">
import {PreviewProxy} from '@/components/output/PreviewProxy'
import AppContainer from "@/components/shared/AppContainer.vue"
import {isDark} from "@/composables/dark"
import {useEditor} from '@/composables/useEditor'
import {useSettings} from '@/composables/useSettings'
import {useShare} from "@/composables/useShare"
import {createSandbox} from '@es-js/sandbox'
import debounce from "lodash.debounce"
import {onMounted, onUnmounted, watch} from 'vue'
import { Icon } from '@iconify/vue'

const MAIN_FILE = 'codigo.esjs'
const MAIN_TESTS_FILE = 'pruebas.esjs'

const editor = useEditor()

const settings = useSettings().settings

let sandbox: HTMLIFrameElement
let proxy: PreviewProxy

onMounted(() => {
  init()
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

  sandbox = await createSandbox('esjs-sandbox', {
    theme: isDark.value ? 'dark' : 'light',
    hidePreview: settings.value.hidePreview,
    previewTab: useSettings().activePreviewTab.value,
    code: editor.code.value,
    testsCode: editor.testsCode.value,
  })

  proxy = new PreviewProxy(sandbox, {
    on_error: (error: any) => { },
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

  const files = []
  files[MAIN_FILE] = editor.code.value
  files[MAIN_TESTS_FILE] = editor.testsCode.value

  await proxy.eval(files)
}

function openInNewTab() {
  const url = useShare().getEjecutarUrl()

  window.open(url, '_blank')
}

watch(isDark, () => {
  proxy.iframe_command('DARK_MODE', isDark.value)
})

watch(
  () => settings.value.hidePreview,
  () => {
    proxy.iframe_command('HIDE_PREVIEW', settings.value.hidePreview)
  },
)

watch(
  () => settings.value.preview,
  () => {
    proxy.iframe_command('PREVIEW', useSettings().activePreview.value)
  },
)

watch(
  () => settings.value.previewTab,
  () => {
    proxy.iframe_command('PREVIEW_TAB', useSettings().activePreviewTab.value)
  },
)

watch(
  [editor.code, editor.testsCode],
  () => {
    if (!settings.value.autoCompile)
      return

    updateSandboxDebounced()
  },
)
</script>

<template>
  <AppContainer class="w-full h-full">
    <template #title>
      <div class="flex flex-row items-center">
        <button class="h-full flex flex-row items-center p-2 space-x-1 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-900 dark:text-white cursor-pointer"
                title="Refrescar"
                aria-label="Refrescar"
                @click="refresh"
        >
          <Icon icon="mdi:refresh" class="w-4 h-4" />
        </button>

        <div class="flex flex-grow px-2">
          <span class="h-5 flex flex-grow flex-row justify-center items-center text-center text-xs px-3 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-full">
            Resultado
          </span>
        </div>

        <button class="h-full flex flex-row items-center p-2 space-x-1 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-900 dark:text-white cursor-pointer"
                title="Abrir en una nueva pestaña"
                aria-label="Abrir en una nueva pestaña"
                @click="openInNewTab"
        >
          <Icon icon="mdi:open-in-new" class="w-4 h-4" />
        </button>
      </div>
    </template>

    <div id="esjs-sandbox" class="w-full h-full"></div>
  </AppContainer>
</template>
