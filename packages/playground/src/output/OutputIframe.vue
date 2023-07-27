<script setup lang="ts">
import {isDark} from "@/composables/dark"
import {useEditor} from '@/composables/useEditor'
import {useSettings} from '@/composables/useSettings'
import {PreviewProxy} from '@/output/PreviewProxy'
import {useEventBus} from '@vueuse/core'
import {createSandbox} from '@es-js/sandbox'
import debounce from "lodash.debounce"
import {onMounted, onUnmounted, watch} from 'vue'

const MAIN_FILE = 'codigo.esjs'
const MAIN_TESTS_FILE = 'pruebas.esjs'

const editor = useEditor()

const settings = useSettings().settings

const bus = useEventBus('editor_code')

let sandbox: HTMLIFrameElement
let proxy: PreviewProxy

onMounted(async () => {
  if (sandbox) {
    proxy.destroy()
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
})

onUnmounted(() => {
  proxy.destroy()
})

watch(isDark, () => {
  proxy.iframe_command('DARK_MODE', isDark.value)
})

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
  <div id="esjs-sandbox" class="w-full h-full"></div>
</template>
