import type { EjecutarOptions } from './ejecutar'

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

  iframe.srcdoc = `
<html lang="es" class="w-full h-full">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>EsJS Ejecutar</title>

    ${options.stylesheets?.map(href => `<link rel="stylesheet" href="${href}" />`).join('\n')}
  </head>

  <script type="importmap">
  ${options.importMap}
  <\/script>

  <body class="w-full h-full m-0 p-0 bg-white dark:bg-[#121212]">
    <div class="w-full h-full flex flex-col">
      <div id="preview-container" class="relative flex flex-1">
        <div id="app" class="absolute inset-0 w-full min-h-full overflow-auto"></div>
      </div>

      <div id="console-container" class="flex flex-1">
        <div id="eruda-container"></div>
      </div>
    </div>
  </body>

  <script type="module">
    import { usarTerminal } from '@es-js/terminal'
    import { setupSandbox } from '@es-js/sandbox'

    setupSandbox({
      ${Object.entries(options).map(([key, value]) => `${key}: ${JSON.stringify(value)}`).join(',\n')},
      usarTerminal,
    })
  </script>
</html>`

  parentElement.appendChild(iframe)

  return iframe
}

