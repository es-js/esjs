<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useEventBus } from '@vueuse/core'
import { useEditor } from '@/composables/useEditor'
import { useSettings } from '@/composables/useSettings'
import { addInfiniteLoopProtection, unifyImports } from '@/composables/utils'

const editor = useEditor()

const iframe = ref()

const settings = useSettings().settings

const bus = useEventBus('editor_code')

interface UpdateIframeOptions {
  code: string
  imports: string
  hideConsole: boolean
  hidePreview: boolean
  customHtml: boolean
}

function updateIframe(options: UpdateIframeOptions) {
  const source = `
  <html>
    <script type="importmap">
      {
        "imports": {
          "@es-js/terminal": "https://cdn.jsdelivr.net/npm/@es-js/terminal@0.0.19/dist/terminal.es.js/+esm",
          "@es-js/prueba": "https://cdn.jsdelivr.net/npm/@es-js/prueba@0.0.5/+esm",
          "@es-js/tiza": "https://cdn.jsdelivr.net/npm/@es-js/tiza@0.0.5/+esm",
          "nprogress": "https://cdn.jsdelivr.net/npm/nprogress@0.2.0/+esm",
          "eruda": "https://cdn.jsdelivr.net/npm/eruda@2.11.2/+esm",
          "@arrow-js/core": "https://cdn.jsdelivr.net/npm/@arrow-js/core/+esm"
        }
      }
    <\/script>

    <body id="body" class="w-full h-[100vh] m-0 p-0 flex flex-col bg-gray-900">
        <div id="preview-container" class="relative flex-1">
            ${options.customHtml ? '<div id="app" class="w-full h-full absolute inset-0"></div>' : '<es-terminal class="w-full h-full absolute inset-0"></es-terminal>'}
        </div>

        <div id="console-container" class="relative flex-1">
              <div id="eruda-container"></div>
        </div>
    </body>

    <link rel='stylesheet' href='https://cdn.jsdelivr.net/npm/nprogress@0.2.0/nprogress.css'/>

    <script src="https://cdn.jsdelivr.net/npm/@unocss/runtime"><\/script>

    <script async type="module">
    import NProgress from 'nprogress';
    import eruda from 'eruda';
    import { usarTerminal } from '@es-js/terminal';
    ${options.imports}

    var _app = document.getElementById('app');

    window.addEventListener('message', async ({ data }) => {
      const { event, value } = data;

      if ('HIDE_CONSOLE' === event) {
        return _hideConsole(value);
      }

      if ('HIDE_PREVIEW' === event) {
        return _hidePreview(value);
      }
    })

    async function _init() {
      NProgress.start();
      await _initEruda();
      _hidePreview(${options.hidePreview});
      _hideConsole(${options.hideConsole});
      if (${options.customHtml}) _resetBodyColor()
      NProgress.done();

      try {
        await _runCode();

      } catch (error) {
        window._handleException(error);
      }
    }

    function _initEruda() {
      const erudaContainerElement = document.getElementById('eruda-container')

      const style = Object.assign(document.createElement('link'), {
          rel: 'stylesheet',
          href: '${location.origin}/eruda.css'
      });

      eruda.init({
          container: erudaContainerElement,
          tool: ['console'],
      });

      eruda.show();
      eruda._shadowRoot.appendChild(style);
      eruda._devTools.config.set('theme', 'Material Oceanic');
      eruda._$el[0].style.colorScheme = 'dark';
    }

    function _hideConsole(value) {
        const consoleElement = document.getElementById('console-container');

        if (value) {
            consoleElement.classList.add('hidden');
        } else {
            consoleElement.classList.remove('hidden');
        }

        usarTerminal().fitTerminal()
    }

    function _hidePreview(value) {
        const previewElement = document.getElementById('preview-container');
        const erudaDevToolsElement = eruda._$el[0].getElementsByClassName('eruda-dev-tools');

        if (value) {
          previewElement.style.display = 'none';
          previewElement.style.flex = '0 0 0';

          erudaDevToolsElement[0].style.height = '100%';
        } else {
          previewElement.style.display = 'flex';
          previewElement.style.flex = '1 1 0';

          erudaDevToolsElement[0].style.height = '50%';
        }

        usarTerminal().fitTerminal()
    }

    window._handleInfiniteLoopException = function (error) {
        console.warn('¡Advertencia!: Se ha detectado un bucle infinito');
        console.error(error);
    }

    window._handleException = function (error) {
        if (error && error.dontWarn) {
            return;
        }

        return window._previewException(error.toString());
    }

    window._previewException = function (error) {
        console.warn('¡Advertencia!: Se ha producido una excepción');
        console.error(error.toString());
    }

    async function _runCode() {
      ${options.code}
    }

    function _resetBodyColor() {
      const bodyElement = document.getElementById('body');
      bodyElement.classList.remove('bg-gray-900');
      bodyElement.classList.add('bg-white');
    }

    await _init()
    <\/script>
</html>
  `

  iframe.value.srcdoc = source
}

onMounted(() => {
  const {
    defaultImports,
    codeImports,
    codeWithoutImports,
    testsCodeImports,
    testsCodeWithoutImports,
  } = editor.output.value

  updateIframe({
    code: parseCode(codeWithoutImports, testsCodeWithoutImports),
    imports: parseImports(defaultImports, codeImports, testsCodeImports),
    hidePreview: settings.value.hidePreview,
    hideConsole: settings.value.hideConsole,
    customHtml: settings.value.customHtml,
  })
})

function parseCode(codeWithoutImports, testsCodeWithoutImports) {
  let code = `${codeWithoutImports}
${testsCodeWithoutImports}`

  try {
    code = addInfiniteLoopProtection(code)
    bus.emit('clear-decorations')
  }
  catch (error: any) {
    const line = error.lineNumber || 1
    const column = error.index || 1
    code = `throw new Error('Línea ${line}: "${error.description}"');`
    bus.emit('decorate-error', {
      line,
      column,
    })
  }

  return code
}

function parseImports(defaultImports, codeImports, testsCodeImports) {
  const imports = `${defaultImports} \n ${codeImports} \n ${testsCodeImports}`

  return unifyImports(imports)
}

watch(
  () => settings.value.hidePreview,
  () => {
    iframe.value.contentWindow.postMessage({
      event: 'HIDE_PREVIEW',
      value: settings.value.hidePreview,
    }, '*')
  },
)

watch(
  () => settings.value.hideConsole,
  () => {
    iframe.value.contentWindow.postMessage({
      event: 'HIDE_CONSOLE',
      value: settings.value.hideConsole,
    }, '*')
  },
)
</script>

<template>
  <iframe
    ref="iframe"
    sandbox="allow-popups-to-escape-sandbox allow-scripts allow-popups allow-forms allow-pointer-lock allow-top-navigation allow-modals allow-same-origin"
    class="w-full h-full b-0"
  />
</template>
