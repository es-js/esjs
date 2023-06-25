<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { useEventBus } from '@vueuse/core'
import { useEditor } from '@/composables/useEditor'
import { useSettings } from '@/composables/useSettings'
import {
  addExportToFunctions,
  addInfiniteLoopProtection,
  formatCode,
  generateImportStatement,
  // getFlowchartSvg,
  unifyImports,
} from '@/composables/utils'
import { PreviewProxy } from '@/output/PreviewProxy'
import { compileModulesForPreview } from '@/compiler/moduleCompiler'
import { MAIN_FILE, MAIN_TESTS_FILE, orchestrator } from '@/orchestrator'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import { isDark } from "@/composables/dark";

const editor = useEditor()

const container = ref()

const settings = useSettings().settings

const bus = useEventBus('editor_code')

let sandbox: HTMLIFrameElement
let proxy: PreviewProxy

interface UpdateIframeOptions {
  code: string
  testsCode: string
  imports: string
  testsImports: string
  hideConsole: boolean
  hidePreview: boolean
  customHtml: boolean
  flowchartSvg?: string
  preview: 'terminal' | 'flowchart' | 'html'
  previewTab: 'console' | 'flowchart' | 'hidden'
  importMap: Record<string, string>
}

onMounted(() => {
  createSandbox(getOptions())
})

onUnmounted(() => {
  proxy.destroy()
})

watch(editor.output, () => {
  updateSandbox(getOptions())
})

watch(isDark, () => {
  proxy.iframe_command('DARK_MODE', isDark.value)
})

function getOptions(): UpdateIframeOptions {
  const {
    defaultImports,
    defaultTestsImports,
    codeImports,
    codeWithoutImports,
    testsCodeImports,
    testsCodeWithoutImports,
  } = editor.output.value

  const code = parseCode(codeWithoutImports)

  const testsCode = parseTestsCode(testsCodeWithoutImports)

  const generatedCodeImports = unifyImports(generateImportStatement(code, `./${MAIN_FILE}`))

  // const flowchartSvg = getFlowchartSvg(codeWithoutImports)

  return {
    code,
    testsCode,
    imports: unifyImports(`${defaultImports} \n ${codeImports}`),
    testsImports: unifyImports(`${defaultTestsImports} \n ${testsCodeImports} \n ${generatedCodeImports}`),
    hidePreview: settings.value.hidePreview,
    hideConsole: settings.value.hideConsole,
    customHtml: settings.value.customHtml,
    importMap: JSON.parse(orchestrator.importMap) || {},
    // flowchartSvg,
    preview: useSettings().activePreview.value,
    previewTab: useSettings().activePreviewTab.value,
  }
}

function createSandbox(options: UpdateIframeOptions) {
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

  container.value.appendChild(sandbox)

  // let sandboxSrc = template.replace(/<!--IMPORT_MAP-->/, JSON.stringify(options.importMap))
  // // sandboxSrc = sandboxSrc.replace(/<!--FLOWCHART_SVG-->/, options.flowchartSvg)
  // sandboxSrc = sandboxSrc.replace(/<!--COLOR_SCHEME-->/, isDark.value ? 'dark' : 'light')
  // sandboxSrc = sandboxSrc.replace(/<!--ACTIVE_PREVIEW_TAB-->/, settings.value.hideConsole ? 'hidden' : options.previewTab)
  // sandbox.srcdoc = sandboxSrc

  sandbox.src = import.meta.env.VITE_SANDBOX_URL

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

  sandbox.addEventListener('load', () => {
    updateSandbox(options)
  })
}

function updateSandbox(options: UpdateIframeOptions) {
  if (!proxy) {
    return
  }

  const { code, testsCode, imports, testsImports } = options

  orchestrator.files[MAIN_FILE].script = `
    ${imports}
    ${code}
  `
  orchestrator.files[MAIN_TESTS_FILE].script = `
    ${testsImports}
    ${testsCode}
  `

  const modules = compileModulesForPreview()

  proxy.eval([
    'const __modules__ = {};',
    ...modules,
  ])

  proxy.iframe_command('HIDE_PREVIEW', settings.value.hidePreview)
  proxy.iframe_command('PREVIEW_TAB', useSettings().activePreviewTab.value)
  setTimeout(() => proxy.iframe_command('DARK_MODE', isDark.value)) // TODO: Try to remove timeout.
}

function parseCode(code: string) {
  bus.emit('clear-decorations')

  try {
    code = formatCode(code)
    code = addExportToFunctions(code)
    code = addInfiniteLoopProtection(code)
  }
  catch (error: SyntaxError | any) {
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
    code = formatCode(code)
    code = addInfiniteLoopProtection(code)
  }
  catch (error: SyntaxError | any) {
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
</script>

<template>
  <div ref="container" class="w-full h-full" />
</template>
