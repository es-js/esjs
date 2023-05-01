<script setup lang="ts">
import type { WatchStopHandle } from 'vue'
import { onMounted, onUnmounted, ref, watch, watchEffect } from 'vue'
import { useEventBus } from '@vueuse/core'
import { useEditor } from '@/composables/useEditor'
import { useSettings } from '@/composables/useSettings'
import {
  addExportToFunctions,
  addInfiniteLoopProtection,
  formatCode,
  generateImportStatement,
  getFlowchartSvg,
  unifyImports,
} from '@/composables/utils'
import { PreviewProxy } from '@/output/PreviewProxy'
import { compileModulesForPreview } from '@/compiler/moduleCompiler'
import { MAIN_FILE, MAIN_TESTS_FILE } from '@/compiler/sfcCompiler'
import { orchestrator } from '@/orchestrator'
import PreviewBar from '@/components/shared/PreviewBar.vue'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import template from '@/output/template.html?raw'

const editor = useEditor()

const container = ref()

const iframe = ref()

const settings = useSettings().settings

const bus = useEventBus('editor_code')

let sandbox: HTMLIFrameElement
let proxy: PreviewProxy
let stopUpdateWatcher: WatchStopHandle | undefined

interface UpdateIframeOptions {
  code: string
  testsCode: string
  imports: string
  testsImports: string
  hideConsole: boolean
  hidePreview: boolean
  customHtml: boolean
  flowchartSvg: string
  preview: 'terminal' | 'flowchart' | 'html'
  importMap: Record<string, string>
}

onMounted(() => {
  const {
    defaultImports,
    defaultTestsImports,
    codeImports,
    codeWithoutImports,
    testsCodeImports,
    testsCodeWithoutImports,
  } = editor.output.value

  const code = parseCode(codeWithoutImports)

  const generatedCodeImports = unifyImports(generateImportStatement(code, './codigo.esjs'))

  const flowchartSvg = getFlowchartSvg(codeWithoutImports)

  createSandbox({
    code,
    testsCode: parseCode(testsCodeWithoutImports),
    imports: unifyImports(`${defaultImports} \n ${codeImports}`),
    testsImports: unifyImports(`${defaultTestsImports} \n ${testsCodeImports} \n ${generatedCodeImports}`),
    hidePreview: settings.value.hidePreview,
    hideConsole: settings.value.hideConsole,
    customHtml: settings.value.customHtml,
    importMap: JSON.parse(orchestrator.importMap) || {},
    flowchartSvg,
    preview: useSettings().activePreview.value,
  })
})

onUnmounted(() => {
  proxy.destroy()
  stopUpdateWatcher && stopUpdateWatcher()
})

function createSandbox(options: UpdateIframeOptions) {
  if (sandbox) {
    proxy.destroy()
    stopUpdateWatcher && stopUpdateWatcher()
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

  let sandboxSrc = template.replace(/<!--IMPORT_MAP-->/, JSON.stringify(options.importMap))
  sandboxSrc = sandboxSrc.replace(/<!--FLOWCHART_SVG-->/, options.flowchartSvg)
  sandbox.srcdoc = sandboxSrc

  container.value.appendChild(sandbox)

  iframe.value = sandbox

  proxy = new PreviewProxy(sandbox, {})

  sandbox.addEventListener('load', () => {
    stopUpdateWatcher = watchEffect(() => {
      updateIframe({
        code: options.code,
        testsCode: options.testsCode,
        imports: options.imports,
        testsImports: options.testsImports,
        hideConsole: options.hideConsole,
        hidePreview: options.hidePreview,
        customHtml: options.customHtml,
        importMap: options.importMap,
        flowchartSvg: options.flowchartSvg,
        preview: options.preview,
      })
    })
  })
}

function updateIframe(options: UpdateIframeOptions) {
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

  proxy.iframe_command('PREVIEW', useSettings().activePreview.value)
}
function parseCode(code: string) {
  try {
    code = formatCode(code)
    code = addExportToFunctions(code)
    code = addInfiniteLoopProtection(code)
    bus.emit('clear-decorations')
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

watch(
  () => settings.value.hidePreview,
  () => {
    proxy.iframe_command('HIDE_PREVIEW', settings.value.hidePreview)
  },
)

watch(
  () => settings.value.hideConsole,
  () => {
    proxy.iframe_command('HIDE_CONSOLE', settings.value.hideConsole)
  },
)

watch(
  () => settings.value.preview,
  () => {
    proxy.iframe_command('PREVIEW', useSettings().activePreview.value)
  },
)
</script>

<template>
  <div class="flex flex-col h-full">
    <div v-if="!settings.hideOptions" class="flex shrink h-10">
      <PreviewBar />
    </div>

    <div class="flex flex-col grow">
      <div ref="container" class="w-full h-full b-0" />
    </div>
  </div>
</template>
