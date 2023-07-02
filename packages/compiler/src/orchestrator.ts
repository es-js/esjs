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
  activeFilename: string
  errors: (string | Error)[]
  runtimeErrors: (string | Error)[]

  readonly activeFile: OrchestratorFile | undefined
}

export const MAIN_FILE = 'codigo.esjs'
export const MAIN_TESTS_FILE = 'pruebas.esjs'

export const orchestrator: Orchestrator = {
  files: {
    MAIN_FILE: new OrchestratorFile(MAIN_FILE, '', ''),
    MAIN_TESTS_FILE: new OrchestratorFile(MAIN_TESTS_FILE, '', ''),
  },
  errors: [],
  runtimeErrors: [],
}
