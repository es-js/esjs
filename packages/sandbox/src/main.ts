import packageJson from '../package.json' assert {type: 'json'}
import { createIframe } from './utils/render'
import type { EjecutarOptions } from './utils/ejecutar'

const DEFAULT_IMPORTS_MAP = {
  imports: {
    '@es-js/terminal': 'https://cdn.jsdelivr.net/npm/@es-js/terminal@1.0.0/dist/terminal.es.js',
    '@es-js/prueba': 'https://cdn.jsdelivr.net/npm/@es-js/prueba@0.0.8/+esm',
    '@es-js/tiza': 'https://cdn.jsdelivr.net/npm/@es-js/tiza@1.0.0-beta.3',
    '@es-js/sandbox': `https://cdn.jsdelivr.net/npm/@es-js/sandbox@${packageJson.version}/sandbox/+esm`,
  },
}

const DEFAULT_STYLESHEETS = [
  `https://cdn.jsdelivr.net/npm/@es-js/sandbox@${packageJson.version}/dist/style.css`,
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
    }, customOptions)

  return createIframe(elementOrId, options)
}

