import type { EjecutarOptions } from '../runtime/ejecutar'

export function createIframe(
  parentElement: HTMLElement,
  options: EjecutarOptions,
): HTMLIFrameElement {
  const iframe = document.createElement('iframe')

  const iframeAttributes = {
    sandbox: [
      'allow-forms',
      'allow-modals',
      'allow-pointer-lock',
      'allow-popups',
      'allow-same-origin',
      'allow-scripts',
      'allow-top-navigation-by-user-activation',
    ].join(' '),
    frameborder: '0',
    scrolling: 'no',
    width: '100%',
    height: '100%',
    style: 'border: 0;',
    title: 'Resultado',
    allow: 'clipboard-read; clipboard-write;',
  }

  for (const [key, value] of Object.entries(iframeAttributes)) {
    iframe.setAttribute(key, value)
  }

  iframe.srcdoc = `
<html lang="es" class="w-full h-full">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>EsJS Ejecutar</title>

    ${options.stylesheets
      ?.map((href) => `<link rel="stylesheet" href="${href}" />`)
      .join('\n')}

      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Fira+Mono:wght@400;500;700&display=swap" rel="stylesheet">

    <style>
      body {
        font-family: "Fira Mono", monospace;
        font-optical-sizing: auto;
        font-weight: 400;
        font-style: normal;
      }
     </style>
  </head>

  <script type="importmap">
  ${options.importMap}
  </script>

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
    import { setupSandbox } from '@es-js/sandbox/runtime'

    setupSandbox({
      ${Object.entries(options)
        .map(([key, value]) => `${key}: ${JSON.stringify(value)}`)
        .join(',\n')},
      usarTerminal,
    })
  </script>
</html>`

  parentElement.appendChild(iframe)

  return iframe
}
