import type { EjecutarOptions } from './utils/ejecutar'
import { createIframe } from './utils/render'

const DEFAULT_IMPORTS_MAP = {
  imports: {
    '@es-js/terminal': 'https://cdn.jsdelivr.net/npm/@es-js/terminal@latest/dist/terminal.es.js',
    '@es-js/prueba': 'https://cdn.jsdelivr.net/npm/@es-js/prueba@latest/+esm',
    '@es-js/tiza': 'https://cdn.jsdelivr.net/npm/@es-js/tiza@latest',
    '@es-js/sandbox': 'https://cdn.jsdelivr.net/npm/@es-js/sandbox@latest/+esm',
    '@es-js/sandbox/render': 'https://cdn.jsdelivr.net/npm/@es-js/sandbox@latest/render/+esm',
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

