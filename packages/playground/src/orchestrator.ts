import { reactive } from 'vue'

export interface OrchestratorPackage {
  name: string
  description?: string
  version?: string
  url: string
  source?: string
}

export class OrchestratorFile {
  filename: string
  template: string
  script: string
  style: string

  compiled = {
    js: '',
    css: '',
    ssr: '',
  }

  constructor(filename: string, template: string | undefined, script: string | undefined, style?: string) {
    this.filename = filename
    this.template = template || ''
    this.script = script || ''
    this.style = style || ''
  }

  get code() {
    return this.script
  }
}

export interface Orchestrator {
  files: {
    [key: string]: OrchestratorFile
  }
  packages: OrchestratorPackage[]
  activeFilename: string
  errors: (string | Error)[]
  runtimeErrors: (string | Error)[]

  readonly activeFile: OrchestratorFile | undefined
  readonly importMap: string
}

export const MAIN_FILE = 'codigo.esjs'
export const MAIN_TESTS_FILE = 'pruebas.esjs'
/**
 * Main app orchestrator, handles all the files, import maps, and errors
 */
export const orchestrator: Orchestrator = reactive({
  files: {
    MAIN_FILE: new OrchestratorFile(MAIN_FILE, '', ''),
    MAIN_TESTS_FILE: new OrchestratorFile(MAIN_TESTS_FILE, '', ''),
  },
  packages: [],
  // activeFilename: MAIN_FILE,
  errors: [],
  runtimeErrors: [],

  get activeFile() {
    // @ts-expect-error
    return orchestrator.files[this.activeFilename]
  },

  get importMap() {
    const imports = orchestrator.packages.map(({ name, url }) => `"${name}": "${url}"`)

    return `
      {
        "imports": {
          ${imports.join(',\n')}
        }
      }
    `
  },
})

export function addFile(file: OrchestratorFile) {
  orchestrator.files = {
    ...orchestrator.files,
    [file.filename]: file,
  }
}

export function removeFile(name: string) {
  delete orchestrator.files[name]
}

export function removeAllFiles() {
  orchestrator.files = {}
}

const initialPackages = [
  {
    name: '@es-js/terminal',
    source: 'jsdelivr',
    description: 'Terminal para interactuar con el Usuario en el navegador',
    url: 'https://cdn.jsdelivr.net/npm/@es-js/terminal@0.0.22/dist/terminal.es.js/+esm',
  },
  {
    name: '@es-js/prueba',
    source: 'jsdelivr',
    description: 'Librería para pruebas unitarias',
    url: 'https://cdn.jsdelivr.net/npm/@es-js/prueba@0.0.8/+esm',
  },
  {
    name: '@es-js/tiza',
    source: 'jsdelivr',
    description: 'Librería para formatear texto en la Terminal',
    url: 'https://cdn.jsdelivr.net/npm/@es-js/tiza@0.0.5/+esm',
  },
  {
    name: 'nprogress',
    source: 'jsdelivr',
    description: 'Componente de progreso',
    url: 'https://cdn.jsdelivr.net/npm/nprogress@0.2.0/+esm',
  },
  {
    name: 'eruda',
    source: 'jsdelivr',
    description: 'Consola de depuración para el navegador',
    url: 'https://cdn.jsdelivr.net/npm/eruda@2.11.2/+esm',
  },
  {
    name: '@es-js/esjs2flowchart',
    source: 'jsdelivr',
    description: 'Librería para crear componentes reactivos',
    url: 'https://cdn.jsdelivr.net/npm/@es-js/esjs2flowchart',
  },
]

function loadInitialState() {
  removeAllFiles()

  orchestrator.packages = initialPackages
  addFile(new OrchestratorFile(MAIN_FILE, '', ''))
  addFile(new OrchestratorFile(MAIN_TESTS_FILE, '', ''))
}

setTimeout(() => {
  loadInitialState()
}, 0)
