import packageJson from '../../package.json' assert {type: 'json'}
import type { EjecutarOptions } from './ejecutar'

const isDev = false

export function createIframe(parentElement: HTMLElement, options: EjecutarOptions): HTMLIFrameElement {
  const iframe = document.createElement('iframe')

  iframe.setAttribute(
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
  iframe.setAttribute('frameborder', '0')
  iframe.setAttribute('scrolling', 'no')
  iframe.setAttribute('width', '100%')
  iframe.setAttribute('height', '100%')
  iframe.setAttribute('style', 'border: 0;')
  iframe.setAttribute('title', 'sandbox')
  iframe.setAttribute('allow', 'clipboard-read; clipboard-write;')

  iframe.classList.add('rounded')

  iframe.srcdoc = `
<html lang="es" class="w-full h-full">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>EsJS Ejecutar</title>

    ${isDev
      ? '<link rel="stylesheet" href="http://localhost:5173/dist/style.css" />'
      : `<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@es-js/sandbox@${packageJson.version}/dist/style.css" />`
    }
  </head>

  <script type="importmap">
  {
    "imports": {
      "@es-js/terminal": "https://cdn.jsdelivr.net/npm/@es-js/terminal@1.0.0-beta.9/dist/terminal.es.js",
      "@es-js/prueba": "https://cdn.jsdelivr.net/npm/@es-js/prueba@0.0.8/+esm",
      "@es-js/tiza": "https://cdn.jsdelivr.net/npm/@es-js/tiza@1.0.0-beta.3",
      "@es-js/sandbox": "${isDev ? 'http://localhost:5173/src/sandbox.ts' : `https://cdn.jsdelivr.net/npm/@es-js/sandbox@${packageJson.version}/sandbox/+esm`}"
    }
  }
  <\/script>

  <body class="w-full h-full m-0 p-0 bg-white dark:bg-[#121212]">
    <div class="w-full h-full flex flex-col">
      <div id="preview-container" class="flex-grow">
        <div class="relative flex flex-1">
          <div id="app" class="w-full min-h-full"></div>
        </div>
      </div>

      <div id="console-container" class="flex-grow">
        <div id="eruda-container"></div>
      </div>
    </div>
  </body>

  <script type="module">
    import { usarTerminal } from '@es-js/terminal'
    import { setupSandbox } from '@es-js/sandbox'

    setupSandbox({
      usarTerminal,
      ${Object.entries(options).map(([key, value]) => `${key}: ${JSON.stringify(value)}`).join(',\n')}
    })
  </script>
</html>`

  parentElement.appendChild(iframe)

  return iframe
}

