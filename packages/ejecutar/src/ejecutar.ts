import { setup } from 'twind/shim'
import { usarTerminal } from '@es-js/terminal'
import {
  changeSize,
  getActiveTab,
  openEruda,
  setActiveTab,
  setErudaTheme,
  setupEruda,
} from './eruda'

export async function init() {
  setupTwind()
  setupTerminal()
  await setupEruda()
}

export async function reset() {
  return new Promise((resolve, reject) => {
    const isDev = window.location.ancestorOrigins.item(0)?.startsWith('http://localhost:')

    if (!isDev) {
      console.clear()
    }

    const appElement = document.getElementById('app')

    if (!appElement) {
      reject(new Error('app element not found'))
      return
    }

    const esTerminalElement = document.getElementById('es-terminal')

    if (esTerminalElement) {
      usarTerminal().destroyTerminal()
      appElement.removeChild(esTerminalElement)
    }

    setTimeout(() => {
      const esTerminal = document.createElement('es-terminal')
      esTerminal.id = 'es-terminal'
      esTerminal.className = 'w-full h-full absolute inset-0'
      appElement.appendChild(esTerminal)

      resolve(true)
    }, 0)
  })
}

export function togglePreview(value: boolean) {
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
  const htmlElement = document.getElementsByTagName('html')[0]

  if (htmlElement) {
    htmlElement.classList.remove(theme === 'dark' ? 'light' : 'dark')
    htmlElement.classList.add(theme === 'dark' ? 'dark' : 'light')
  }

  setErudaTheme(theme)

  usarTerminal().setTheme(
    usarTerminal().getThemeConfig(theme),
  )
}

function setupTwind() {
  setup({
    mode: 'silent',
    darkMode: 'class',
  })
}

function setupTerminal() {
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
