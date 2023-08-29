import { compileModulesForPreview, prepareCodeAndTestsForPlayground } from '@es-js/compiler'
import { MAIN_FILE, MAIN_TESTS_FILE, OrchestratorFile, orchestrator } from '@es-js/compiler/orchestrator'
import { changeSize, getActiveTab, openEruda, setActiveTab, setErudaTheme, setupEruda } from './eruda'

export interface EjecutarOptions {
  usarTerminal: any
  theme: 'dark' | 'light'
  hidePreview: boolean
  hideConsole: boolean
  previewTab: 'console' | 'flowchart' | 'hidden'
  code: string
  testsCode: string
  importMap: string
  stylesheets: string[]
  clearConsoleOnRun: boolean
}

let _options: EjecutarOptions

const scriptEls: HTMLScriptElement[] = []

let theme: 'dark' | 'light' = 'dark'

let lastArgs: any = {}

export async function init(options: EjecutarOptions): Promise<void> {
  _options = options

  if (typeof _options.usarTerminal !== 'function')
    throw new Error('usarTerminal is required')

  setupEruda()

  setupTheme(_options.theme)

  hidePreview(_options.hidePreview)

  previewTab(_options.previewTab)

  evalInitialCode()
}

export async function evalFiles({ files }) {
  try {
    const result = prepareCodeAndTestsForPlayground(
      files[MAIN_FILE] || '',
      files[MAIN_TESTS_FILE] || '',
    )

    Object.keys(files).forEach((filename) => {
      if (filename in orchestrator.files)
        return

      orchestrator.files[filename] = new OrchestratorFile(filename, '', '', '')
    })

    orchestrator.files[MAIN_FILE].script = `${result.imports}\n${result.code}\n`
    orchestrator.files[MAIN_TESTS_FILE].script = `${result.testsImports}\n${result.testsCode}\n`

    const modules = compileModulesForPreview([
      orchestrator.files[MAIN_TESTS_FILE],
      orchestrator.files[MAIN_FILE],
    ])

    await evalCode({
      script: [
        'const __modules__ = {};',
        ...modules,
      ],
    })
  }
  catch (error) {
    handleEvalError(error)
  }
}

function handleEvalError(error) {
  const errorArgs = {
    filename: error.filename,
    message: error.message,
    line: error.line,
    column: error.column,
  }

  evalCode({
    script: [
      `import { Terminal } from '@es-js/terminal'; import { tiza } from '@es-js/tiza';

Terminal.clear()

Terminal.escribir(\`Error en el archivo \${tiza.fondoAzul50.azul800(${JSON.stringify(error.filename)})}:\`)

Terminal.escribir(
  tiza.rojo(${JSON.stringify(error.message)})
)

console.error(${JSON.stringify(error.message)})

window.onerror(${JSON.stringify(error.message)}, null, 1, 1, ${JSON.stringify(errorArgs)})`,
    ],
  })
}

async function evalCode(args: any) {
  lastArgs = Object.assign({}, args)

  if (scriptEls.length) {
    scriptEls.forEach((el) => {
      document.head.removeChild(el)
    })
    scriptEls.length = 0
  }

  let { script: scripts } = args

  if (typeof scripts === 'string')
    scripts = [scripts]

  resetAppElement()

  const usesTerminal = scripts.some(script => script.includes('Terminal'))
  if (usesTerminal)
    await addEsJSTerminal()

  clearConsole()

  for (const script of scripts) {
    const scriptEl = document.createElement('script')
    scriptEl.setAttribute('type', 'module')
    // send ok in the module script to ensure sequential evaluation
    // of multiple proxy.eval() calls
    const done = new Promise((resolve) => {
      window.__next__ = resolve
    })
    scriptEl.innerHTML = `${script}\nwindow.__next__()`
    document.head.appendChild(scriptEl)
    scriptEl.onerror = (error: any) => {
      throw error
    }
    scriptEls.push(scriptEl)
    await done
  }

  return true
}

function evalInitialCode() {
  const files = []
  files[MAIN_FILE] = _options.code || ''
  files[MAIN_TESTS_FILE] = _options.testsCode || ''

  evalFiles({ files })
}

function clearConsole() {
  if (!_options.clearConsoleOnRun)
    return

  const isDev = window && window.location && window.location.ancestorOrigins && window.location.ancestorOrigins.length
    ? window.location.ancestorOrigins.item(0)?.startsWith('http://localhost:')
    : window.location.href.startsWith('http://localhost:')

  if (isDev)
    return

  console.clear()
}

export function hidePreview(value: boolean) {
  const previewElement = document.getElementById('preview-container')

  if (!previewElement)
    return

  if (value) {
    previewElement.style.display = 'none'
    previewElement.style.flex = '0 0 0'

    changeSize(100)
  }
  else {
    previewElement.style.display = 'flex'
    previewElement.style.flex = '1 1 0'

    changeSize(50)
  }

  if (getActiveTab() !== 'hidden')
    openEruda()
}

export function previewTab(value: 'console' | 'flowchart' | 'hidden') {
  setActiveTab(value)
}

export function setupTheme(value: 'dark' | 'light') {
  theme = value || 'dark'

  const htmlElement = document.getElementsByTagName('html')?.[0]

  if (htmlElement)
    htmlElement.classList.toggle('dark', theme === 'dark')

  setErudaTheme(theme)

  _options.usarTerminal().setTheme(theme)
}

async function addEsJSTerminal() {
  const appElement = document.getElementById('app')

  if (!appElement)
    return

  const newEsTerminalElement = document.createElement('es-terminal')
  newEsTerminalElement.id = 'es-terminal'
  newEsTerminalElement.className = 'w-full h-full absolute inset-0'
  newEsTerminalElement.setAttribute('tema', theme === 'dark' ? 'oscuro' : 'claro')
  appElement.appendChild(newEsTerminalElement)
}

function resetAppElement() {
  const appElement = document.getElementById('app')

  if (!appElement)
    return

  appElement.innerHTML = ''
}

