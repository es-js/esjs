<script setup lang="ts">
import debounce from 'just-debounce-it'
import { onMounted, ref, watch } from 'vue'
import { useCompiler } from '~/composables/useCompiler'
import { useEscssCompiler } from '~/composables/useEscssCompiler'
import { useEshtmlCompiler } from '~/composables/useEshtmlCompiler'
import { FILE_CODE, FILE_ESCSS, FILE_ESHTML, useFiles } from '~/composables/useFiles'
import { useSettings } from '~/composables/useSettings'
import PlaygroundPreviewShell from './PlaygroundPreviewShell.vue'

const files = useFiles()
const eshtmlCompiler = useEshtmlCompiler()
const escssCompiler = useEscssCompiler()
const compiler = useCompiler()
const settingsStore = useSettings().settings

const srcdoc = ref('')
const error = ref<string | undefined>()
const iframeKey = ref(0)

function buildSrcdoc() {
  const eshtmlFile = files.files.value.find(f => f.name === FILE_ESHTML)
  const escssFile = files.files.value.find(f => f.name === FILE_ESCSS)
  const codeFile = files.files.value.find(f => f.name === FILE_CODE)

  const { html, error: htmlError } = eshtmlCompiler.compileEshtml(eshtmlFile?.content ?? '')
  if (htmlError) {
    error.value = htmlError
    return
  }

  const { css: rawCss } = escssCompiler.compileEscss(escssFile?.content ?? '')
  const css = rawCss.replace(/\bbody\b/g, '#app').replace(/\bhtml\b/g, '#app')

  let js = ''
  try {
    js = compiler.compile(codeFile?.content ?? '', { from: 'esjs', to: 'js' })
  }
  catch (e: any) {
    error.value = e.message
    return
  }

  error.value = undefined

  const headMatch = html.match(/<head[^>]*>([\s\S]*?)<\/head>/i)
  const headContent = headMatch ? headMatch[1] : ''
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i)
  const bodyContent = bodyMatch ? bodyMatch[1] : html

  srcdoc.value = `<!DOCTYPE html>
<html lang="es" style="width:100%;height:100%;">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  ${headContent}
  <style>${css}</style>
  <style>
    html, body { width: 100%; height: 100%; margin: 0; padding: 0; }
    body { display: flex; flex-direction: column; background: white; }
    #preview-container { position: relative; display: flex; flex: 1; overflow: hidden; }
    #app { position: absolute; inset: 0; width: 100%; min-height: 100%; overflow: auto; }
    #console-container { display: flex; flex: 1; }
    #eruda-container { width: 100%; }
    .eruda-entry-btn { display: none !important; }
    .eruda-resizer { display: none !important; }
    .eruda-dev-tools { border: 0 !important; padding-top: 28px !important; }
    .eruda-control { display: none !important; height: 0 !important; }
    .eruda-js-input { display: none !important; height: 0 !important; }
    .eruda-tab { height: 28px; }
    .luna-tab-tabs-container { height: 28px !important; border: 0 !important; }
    .luna-tab-item { height: 27px !important; line-height: 27px !important; font-size: 0.875rem; }
    .luna-tab-slider { background: #6366F1 !important; }
    #eruda-console { padding-top: 0 !important; padding-bottom: 0 !important; }
  </style>
</head>
<body>
  <div style="width:100%;height:100%;display:flex;flex-direction:column;">
    <div id="preview-container">
      <div id="app">${bodyContent}</div>
    </div>
    <div id="console-container">
      <div id="eruda-container"></div>
    </div>
  </div>
  <script type="module">${js}<\/script>
  <script src="https://cdn.jsdelivr.net/npm/eruda"><\/script>
  <script>
    eruda.init({ container: document.getElementById('eruda-container'), tool: ['console'], useShadowDom: false })
    eruda.remove('settings')
    eruda.show()

    ;(function () {
      var activeTab = 'console'

      function setErudaConfig(key, value) {
        try { var c = eruda.get && eruda.get('') && eruda.get('').config; if (c) c.set(key, value) } catch(e) {}
      }

      function hideConsole() {
        activeTab = 'hidden'
        setErudaConfig('displaySize', 1)
        var container = document.getElementById('console-container')
        if (container) { container.style.flex = 'none'; container.style.height = '27px' }
        document.querySelectorAll('.luna-tab-item').forEach(function(el) { el.classList.remove('luna-tab-selected') })
        var slider = document.querySelector('.luna-tab-slider')
        if (slider) slider.style.display = 'none'
      }

      function showConsole() {
        activeTab = 'console'
        eruda.show('console')
        setErudaConfig('displaySize', 50)
        var container = document.getElementById('console-container')
        if (container) { container.style.flex = '1'; container.style.height = '' }
        var slider = document.querySelector('.luna-tab-slider')
        if (slider) slider.style.display = 'inline-block'
      }

      var tab = document.querySelector('.luna-tab-item[data-id="console"]')
      if (tab) {
        tab.addEventListener('click', function() {
          if (activeTab === 'console') hideConsole()
          else showConsole()
        })
      }
    })()
  <\/script>
</body>
</html>`
}

function refresh() {
  buildSrcdoc()
  iframeKey.value++
}

const buildSrcdocDebounced = debounce(buildSrcdoc, 500)

onMounted(buildSrcdoc)

watch(
  () => files.files.value.map(f => f.content),
  buildSrcdocDebounced,
)
</script>

<template>
  <PlaygroundPreviewShell @refresh="refresh">
    <div
      v-if="error"
      class="w-full h-full p-4 text-red-500 text-sm font-mono overflow-auto"
    >
      {{ error }}
    </div>

    <iframe
      v-else-if="!settingsStore.hidePreview"
      :key="iframeKey"
      :srcdoc="srcdoc"
      class="w-full h-full border-0"
      sandbox="allow-scripts allow-same-origin"
    />
  </PlaygroundPreviewShell>
</template>
