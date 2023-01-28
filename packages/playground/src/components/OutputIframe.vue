<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useEditor } from '@/composables/useEditor'
import { useSettings } from '@/composables/useSettings'
import { addInfiniteLoopProtection } from '@/composables/utils'

const editor = useEditor()

const iframe = ref()

const settings = useSettings().settings

function updateIframe(codeWithoutImports: string, imports: string, options: any = {}) {
  const source = `
  <html>
    <script type="importmap">
      {
        "imports": {
          "vue": "https://unpkg.com/vue@3/dist/vue.esm-browser.prod.js",
          "@es-js/terminal": "https://unpkg.com/@es-js/terminal@latest/dist/terminal.es.js"
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

    <script src='https://unpkg.com/nprogress@0.2.0/nprogress.js'><\/script>
    <link rel='stylesheet' href='https://unpkg.com/nprogress@0.2.0/nprogress.css'/>

    <script src="//cdn.jsdelivr.net/npm/eruda"><\/script>

    <script type="module">
    NProgress.start();

    window.addEventListener('message', async ({ data }) => {
      const { event, value } = data;

      if ('HIDE_CONSOLE' === event) {
        return _hideConsole(value);
      }

      if ('HIDE_PREVIEW' === event) {
        return _hidePreview(value);
      }
    })

    function _init() {
        _initEruda()
        _hidePreview(${options.hidePreview})
        _hideConsole(${options.hideConsole})
        NProgress.done();
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

    function _handleInfiniteLoopException(error) {
        console.warn('¡Advertencia!: Se ha detectado un bucle infinito');
        console.error(error);
    }

    _init()
    <\/script>

    <script async type="module">
    ${imports}

    function _handleException(error) {
        return _previewException(error.toString());
    }

    function _previewException(error) {
        console.warn('¡Advertencia!: Se ha producido una excepción');
        console.error(error.toString());
    }

    ${codeWithoutImports}
    <\/script>
</html>
  `

  iframe.value.srcdoc = source
}

onMounted(() => {
  const { codeWithoutImports, imports } = editor.transpileCode(editor.output.value)

  let code = `(async function() {
try {
  ${codeWithoutImports}
} catch (error) {
  _handleException(error);
}
})();`

  try {
    code = addInfiniteLoopProtection(code)
  }
  catch (error) {
    console.error(['InfiniteLoopProtection', error])
  }

  updateIframe(code, imports, {
    hidePreview: settings.value.hidePreview,
    hideConsole: settings.value.hideConsole,
  })
})

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
