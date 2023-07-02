import { usarTerminal } from '@es-js/terminal'
import { compileModulesForPreview, prepareCodeAndTestsForPlayground } from '@es-js/compiler'
import { MAIN_FILE, MAIN_TESTS_FILE, OrchestratorFile, orchestrator } from '@es-js/compiler/orchestrator'
import {
  changeSize,
  getActiveTab,
  openEruda,
  setActiveTab, setErudaTheme,
  setupEruda,
} from './eruda'
import { useShare } from './useShare.ts'

const scriptEls: HTMLScriptElement[] = []

export async function init() {
  const options = useShare().getOptionsFromUrl()

  setDarkMode(options.theme === 'dark')

  await setupEruda()

  hidePreview(options.hidePreview)

  previewTab(options.previewTab)

  await evalInitialCode()
}

export async function evalCode(args: any) {
  setupTerminal()
  clearConsole()

  if (scriptEls.length) {
    scriptEls.forEach((el) => {
      document.head.removeChild(el)
    })
    scriptEls.length = 0
  }

  let { script: scripts } = args

  if (typeof scripts === 'string') {
    scripts = [scripts]
  }

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
  const code = useShare().getCodeFromUrl()

  const testsCode = useShare().getTestsCodeFromUrl()

  const result = prepareCodeAndTestsForPlayground(code, testsCode)

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
  const isDev = window.location.ancestorOrigins.length
    ? window.location.ancestorOrigins.item(0)?.startsWith('http://localhost:')
    : window.location.href.startsWith('http://localhost:')

  if (!isDev) {
    console.clear()
  }
}

export function hidePreview(value: boolean) {
  const previewElement = document.getElementById('preview-container')

  if (!previewElement) {
    return
  }

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

  if (getActiveTab() !== 'hidden') {
    openEruda()
  }

  usarTerminal().fitTerminal()
}

export function previewTab(value: 'console' | 'flowchart' | 'hidden') {
  setActiveTab(value)

  usarTerminal().fitTerminal()
}

export function setupTheme(theme: 'dark' | 'light') {
  setDarkMode(theme === 'dark')

  setErudaTheme(theme)

  usarTerminal().setTheme(
    usarTerminal().getThemeConfig(theme),
  )
}

function setDarkMode(value: boolean) {
  const htmlElement = document.getElementsByTagName('html')[0]

  htmlElement.classList.toggle('dark', value)
}

function setupTerminal() {
  const appElement = document.getElementById('app')

  if (!appElement) {
    throw new Error('No se ha encontrado el elemento #app')
  }

  const currentEsTerminalElement = document.getElementById('es-terminal')

  if (currentEsTerminalElement) {
    usarTerminal().destroyTerminal()
    appElement.removeChild(currentEsTerminalElement)
  }

  const newEsTerminalElement = document.createElement('div')
  newEsTerminalElement.id = 'es-terminal'
  newEsTerminalElement.className = 'w-full h-full absolute inset-0'
  appElement.appendChild(newEsTerminalElement)

  usarTerminal().setupTerminal(newEsTerminalElement, {
    theme: usarTerminal().getThemeConfig(document.getElementsByTagName('html')[0].classList.contains('dark') ? 'dark' : 'light'),
  })

  usarTerminal().fitTerminal()
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
window._handleInfiniteLoopException = function (error: any) {
  console.warn('¡Advertencia!: Se ha detectado un bucle infinito')
  console.error(error)
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
window._previewException = function (line: number, column: number, message: string) {
  console.warn(`¡Advertencia!: Se ha detectado un error en la línea ${line}`)
  // console.error(error.toString());
}

window.addEventListener('esjs-prueba-success', (args: any) => {
  parent.postMessage({ action: 'esjs-prueba-success', data: JSON.stringify(args.detail) }, '*')
})

window.addEventListener('esjs-prueba-error', (args: any) => {
  parent.postMessage({ action: 'esjs-prueba-error', data: JSON.stringify(args.detail) }, '*')
})

window.addEventListener('esjs-pruebas-finished', (args: any) => {
  parent.postMessage({ action: 'esjs-pruebas-finished', data: JSON.stringify(args.detail) }, '*')
})
