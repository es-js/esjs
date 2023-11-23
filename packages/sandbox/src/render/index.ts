import type { EjecutarOptions } from './ejecutar/ejecutar'
import { createIframe } from './iframe'

const DEFAULT_IMPORTS_MAP = {
  imports: {
    '@es-js/terminal': 'https://cdn.jsdelivr.net/npm/@es-js/terminal@latest/dist/terminal.es.js',
    '@es-js/prueba': 'https://cdn.jsdelivr.net/npm/@es-js/prueba@latest/+esm',
    '@es-js/tiza': 'https://cdn.jsdelivr.net/npm/@es-js/tiza@latest',
    '@es-js/sandbox/runtime': 'https://cdn.jsdelivr.net/npm/@es-js/sandbox@latest/runtime/+esm',
  },
}

const DEFAULT_STYLESHEETS = [
  'https://cdn.jsdelivr.net/npm/@es-js/sandbox@latest/dist/style.css',
]

export async function createSandbox(elementOrId: HTMLElement | string, customOptions: Partial<EjecutarOptions>): Promise<HTMLIFrameElement> {
  if (typeof elementOrId === 'string')
    elementOrId = document.getElementById(elementOrId) as HTMLElement

  const options: EjecutarOptions
    = Object.assign({
      usarTerminal: null,
      theme: 'dark',
      hidePreview: false,
      hideConsole: false,
      previewTab: 'console',
      importMap: JSON.stringify(DEFAULT_IMPORTS_MAP),
      stylesheets: DEFAULT_STYLESHEETS,
      code: '',
      testsCode: '',
      clearConsoleOnRun: true,
    }, customOptions)

  return createIframe(elementOrId, options)
}

