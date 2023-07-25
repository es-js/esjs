import { compileModulesForPreview, prepareCodeAndTestsForPlayground } from '@es-js/compiler'
import { MAIN_FILE, MAIN_TESTS_FILE, OrchestratorFile, orchestrator } from '@es-js/compiler/orchestrator'
import { changeSize, getActiveTab, openEruda, setActiveTab, setErudaTheme, setupEruda } from './eruda'

export interface EjecutarOptions {
  usarTerminal?: any
  theme?: 'dark' | 'light'
  hidePreview?: boolean
  hideConsole?: boolean
  previewTab?: 'console' | 'flowchart' | 'hidden'
  code?: string
  testsCode?: string
}

let options: EjecutarOptions

const scriptEls: HTMLScriptElement[] = []

let theme: 'dark' | 'light' = 'dark'

let lastArgs: any = {}

export async function init(customOptions: EjecutarOptions): Promise<void> {
  if (typeof customOptions.usarTerminal !== 'function')
    throw new Error('usarTerminal is required')

  options = Object.assign({
    usarTerminal: null,
    theme: 'dark',
    hidePreview: false,
    hideConsole: false,
    previewTab: 'console',
  }, customOptions)

  setupRefreshButton()

  setupTheme(options.theme)

  await setupEruda()

  hidePreview(options.hidePreview)

  previewTab(options.previewTab)

  await evalInitialCode()
}

function setupRefreshButton() {
  const refreshButton = document.querySelector('#refresh-button')

  if (!refreshButton)
    return

  refreshButton.addEventListener(
    'click',
    () => {
      evalCode(lastArgs)
    },
  )
}

export async function evalCode(args: any) {
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

  removeEsJSTerminal()
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

async function evalInitialCode() {
  const result = prepareCodeAndTestsForPlayground(
    options.code || '',
    options.testsCode || '',
  )

  orchestrator.files[MAIN_FILE] = new OrchestratorFile(
    MAIN_FILE,
    '',
    `${result.imports}\n${result.code}\n`,
    '',
  )

  orchestrator.files[MAIN_TESTS_FILE] = new OrchestratorFile(
    MAIN_TESTS_FILE,
    '',
    `${result.testsImports}\n${result.testsCode}\n`,
    '',
  )

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

function clearConsole() {
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

  options.usarTerminal().setTheme(theme)
}

function addEsJSTerminalCss() {
  const href = 'https://cdn.jsdelivr.net/npm/@es-js/terminal@latest/dist/style.css'

  if (document.querySelector(`link[href="${href}"]`))
    return

  const style = document.createElement('link')
  style.rel = 'stylesheet'
  style.href = href
  document.head.appendChild(style)
}

async function addEsJSTerminal() {
  const appElement = document.getElementById('app')

  if (!appElement)
    return

  addEsJSTerminalCss()

  const newEsTerminalElement = document.createElement('div')
  newEsTerminalElement.id = 'es-terminal'
  newEsTerminalElement.className = 'w-full h-full absolute inset-0'
  appElement.appendChild(newEsTerminalElement)

  options.usarTerminal().setupTerminal(newEsTerminalElement, {
    theme,
  })
}

function removeEsJSTerminal() {
  const appElement = document.getElementById('app')

  if (!appElement)
    return

  const currentEsTerminalElement = document.getElementById('es-terminal')

  if (!currentEsTerminalElement)
    return

  options.usarTerminal().destroyTerminal()
  appElement.removeChild(currentEsTerminalElement)
}

function resetAppElement() {
  const appElement = document.getElementById('app')

  if (!appElement)
    return

  appElement.innerHTML = ''
}
