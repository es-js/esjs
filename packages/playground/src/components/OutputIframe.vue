<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useEditor } from '@/composables/useEditor'

const editor = useEditor()

const iframe = ref()

function updateIframe(code: string, sourceCode: string) {
  console.log(['updateIframe', code, sourceCode])
  const source = `
  <html class="w-full h-full p-0 m-0">
    <script type="importmap">
      {
        "imports": {
          "vue": "https://unpkg.com/vue@3/dist/vue.esm-browser.js",
          "uno.css": "https://cdn.jsdelivr.net/npm/@unocss/runtime",
          "@es-js/esvue": "https://unpkg.com/@es-js/esvue@0.0.0/dist/esvue.es.js"
        }
      }
    <\/script>

    <body class="w-full h-full p-0 m-0 bg-gray-900">
      <div id="app"></div>
    </body>

    <script type="module">
    import { createApp, h } from 'vue'
    import 'uno.css';
    import { usarConsola, Terminal } from '@es-js/esvue';
    const consola = usarConsola();

    const app = createApp({
      setup() {
        (async () => {
        ${code}
        })();
      },
      template: '<div class="flex flex-grow flex-col w-full h-full"> <Terminal class="w-full h-full"/> </div>'
    });

    app.component('Terminal', Terminal);
    app.mount('#app');
    <\/script>

    <link rel="stylesheet" href="https://unpkg.com/@es-js/esvue@0.0.0/dist/style.css" type="text/css" />
  </html>
  `

  iframe.value.srcdoc = source
}

onMounted(() => {
  const { iframeCode, sourceCode } = editor.transpileCode(editor.output.value)

  updateIframe(iframeCode, sourceCode)
})
</script>

<template>
  <iframe ref="iframe" class="w-full h-full" />
</template>
