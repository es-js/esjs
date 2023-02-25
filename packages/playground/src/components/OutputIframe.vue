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
}

function updateIframe(options: UpdateIframeOptions) {
  const source = `
  <html>
    <script type="importmap">
      {
        "imports": {
          "@es-js/terminal": "https://cdn.jsdelivr.net/npm/@es-js/terminal@0.0.18/dist/terminal.es.js/+esm",
          "@es-js/prueba": "https://cdn.skypack.dev/@es-js/prueba"
        }
      }
    <\/script>

    <body style="width: 100%; height: 100vh; margin: 0; padding: 0; background-color: #1f2937; display: flex; flex-direction: column;">
        <div id="terminal-container" style="display: flex; flex: 1 1 0; position: relative;">
              <es-terminal style="width: 100%; height: 100%; position: absolute; top: 0; right: 0; bottom: 0; left: 0;"></es-terminal>
        </div>

        <div id="console-container" style="display: flex; flex: 1 1 0; position: relative;">
              <div id="eruda-container"></div>
        </div>
    </body>

    <link rel='stylesheet' href='https://cdn.skypack.dev/nprogress/nprogress.css'/>

    <script async type="module">
    import NProgress from 'https://cdn.skypack.dev/nprogress';
    import eruda from 'https://cdn.skypack.dev/eruda';
    import { usarTerminal } from '@es-js/terminal';
    ${options.imports}

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
          consoleElement.style.display = 'none';
          consoleElement.style.flex = '0 0 0';
        } else {
          consoleElement.style.display = 'flex';
          consoleElement.style.flex = '1 1 0';
        }
        usarTerminal().fitTerminal()
    }

    function _hidePreview(value) {
        const terminalElement = document.getElementById('terminal-container');
        const erudaDevToolsElement = eruda._$el[0].getElementsByClassName('eruda-dev-tools');

        if (value) {
          terminalElement.style.display = 'none';
          terminalElement.style.flex = '0 0 0';

          erudaDevToolsElement[0].style.height = '100%';
        } else {
          terminalElement.style.display = 'flex';
          terminalElement.style.flex = '1 1 0';

          erudaDevToolsElement[0].style.height = '50%';
        }
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
