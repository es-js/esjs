<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { useEventBus } from '@vueuse/core'
import { useEditor } from '@/composables/useEditor'
import { useSettings } from '@/composables/useSettings'
import { compileModulesForPreview, prepareCode, prepareCodeAndTestsForPlayground } from '@es-js/compiler'
import { PreviewProxy } from '@/output/PreviewProxy'
import { MAIN_FILE, MAIN_TESTS_FILE, orchestrator, OrchestratorFile } from '@es-js/compiler/orchestrator'
import { isDark } from "@/composables/dark";
import lzs from "lz-string";
import debounce from "lodash.debounce";

const editor = useEditor()

const container = ref()

const settings = useSettings().settings

const bus = useEventBus('editor_code')

let sandbox: HTMLIFrameElement
let proxy: PreviewProxy

onMounted(() => {
  createSandbox()
})

onUnmounted(() => {
  proxy.destroy()
})

watch(isDark, () => {
  proxy.iframe_command('DARK_MODE', isDark.value)
})

function createSandbox() {
  if (sandbox) {
    proxy.destroy()
    container.value.removeChild(sandbox)
  }

  sandbox = document.createElement('iframe')
  sandbox.setAttribute(
    'sandbox',
    [
      'allow-forms',
      'allow-modals',
      'allow-pointer-lock',
      'allow-popups',
      'allow-same-origin',
      'allow-scripts',
      'allow-top-navigation-by-user-activation',
    ].join(' '),
  )
  sandbox.setAttribute('frameborder', '0')
  sandbox.setAttribute('scrolling', 'no')
  sandbox.setAttribute('width', '100%')
  sandbox.setAttribute('height', '100%')
  sandbox.setAttribute('style', 'border: 0;')
  sandbox.setAttribute('title', 'sandbox')
  sandbox.setAttribute('allow', 'clipboard-read; clipboard-write;')

  container.value.appendChild(sandbox)

  sandbox.src = getSandboxUrl()

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

  // sandbox.addEventListener('load', () => {
  //   updateSandbox(options)
  // })
}

function getSandboxUrl() {
  const url = new URL('/', import.meta.env.VITE_SANDBOX_URL)
  url.searchParams.set('code', lzs.compressToEncodedURIComponent(editor.code.value))
  url.searchParams.set('tests', lzs.compressToEncodedURIComponent(editor.testsCode.value))
  url.searchParams.set('options', lzs.compressToEncodedURIComponent(JSON.stringify({
    theme: isDark.value ? 'dark' : 'light',
    hidePreview: settings.value.hidePreview,
    previewTab: useSettings().activePreviewTab.value,
    backgroundTransparent: true,
  })))
  return url
}

const updateSandboxDebounced = debounce(updateSandbox, 500)

async function updateSandbox() {
  if (!proxy) {
    return
  }

  const code = parseCode(editor.code.value)

  const testsCode = parseTestsCode(editor.testsCode.value)

  const result = prepareCodeAndTestsForPlayground(code, testsCode)

  orchestrator.files[MAIN_FILE] = new OrchestratorFile(
    MAIN_FILE,
    '',
    `${result.imports}\n${result.code}\n`,
    '',
  )

  orchestrator.files[MAIN_TESTS_FILE] = new OrchestratorFile(
    MAIN_TESTS_FILE,
    '',
    `${result.testsImports}\n${result.testsCode}\n`,
    '',
  )

  const modules = compileModulesForPreview([
    orchestrator.files[MAIN_TESTS_FILE],
    orchestrator.files[MAIN_FILE],
  ])

  await proxy.eval([
    'const __modules__ = {};',
    ...modules,
  ])
}

function parseCode(code: string) {
  bus.emit('clear-decorations')

  try {
    code = prepareCode(code)
  } catch (error: SyntaxError | any) {
    const line = error?.loc?.start?.line || 1
    const column = error?.loc?.start?.column || 1
    const errorMessage = error.message
    bus.emit('decorate-error', {
      line,
      column,
    })
    code = `
window._previewException(${line}, ${column}, ${JSON.stringify(errorMessage)});
throw new Error(${JSON.stringify(errorMessage)});`
  }

  return code
}

function parseTestsCode(code: string) {
  useEventBus('editor_tests').emit('clear-decorations')

  try {
    code = prepareCode(code)
  } catch (error: SyntaxError | any) {
    const line = error?.loc?.start?.line || 1
    const column = error?.loc?.start?.column || 1
    const errorMessage = error.message
    useEventBus('editor_tests').emit('decorate-error', {
      line,
      column,
    })
    code = `
window._previewException(${line}, ${column}, ${JSON.stringify(errorMessage)});
throw new Error(${JSON.stringify(errorMessage)});`
  }

  return code
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
  <div ref="container" class="w-full h-full" />
</template>
