import { AvailableLanguages, type CompileOptions } from '@es-js/core'
import { compileModulesForPreview } from '../compiler'
import { orchestrator, OrchestratorFile } from '../compiler/orchestrator'
import { compileFile, ParseFileError, prepareFiles, SandboxFile, SandboxFileError } from '../utils'
import { changeSize, getActiveTab, openEruda, setActiveTab, setErudaTheme, setupEruda } from './eruda'

export interface EjecutarOptions {
  files?: SandboxFile[]
  usarTerminal: any
  theme: 'dark' | 'light'
  hidePreview: boolean
  hideConsole: boolean
  previewTab: 'console' | 'flowchart' | 'hidden'
  importMap: string
  stylesheets: string[]
  clearConsoleOnRun: boolean
  infiniteLoopProtection: boolean
  fromLanguage?: AvailableLanguages
  toLanguage?: AvailableLanguages
}

let _options: EjecutarOptions

const scriptEls: HTMLScriptElement[] = []

let theme: 'dark' | 'light' = 'dark'

export async function init(options: EjecutarOptions): Promise<void> {
  _options = options

  if (typeof _options.usarTerminal !== 'function')
    throw new Error('usarTerminal is required')

  setupEruda()

  setupTheme(_options.theme)

  hidePreview(_options.hidePreview)

  previewTab(_options.previewTab)

  await evalEditorFiles()
}

export async function evalFiles({ files, options}: { files: SandboxFile[], options?: EjecutarOptions }) {
  const result = prepareFiles(
    files.filter((file: any) => {
      const extension = file.name.split('.').slice(-1)[0]

      return ['esjs', 'js'].includes(extension)
    }),
    options
  )

  result.forEach((file: any) => {
    if (!file.name) {
      return
    }

    const extension = file.name.split('.').slice(-1)[0]

    if (!['esjs', 'js'].includes(extension))
      return

    orchestrator.files[file.name] = new OrchestratorFile(file.name, '', `${file.imports}\n${file.codeWithoutImports}\n`, '')
  })

  const modules = compileModulesForPreview(
    Object.values(orchestrator.files),
  )

  await evalCode({
    script: [
      'const __modules__ = {};',
      ...modules.reverse(),
    ],
  })
}

export async function compileFiles({ files, options}: { files: SandboxFile[], options: CompileOptions }) {
  const filesCompiled: SandboxFile[] = files
    .map((file: any) => {
      const extension = file.name.split('.').slice(-1)[0]

      if (!['esjs', 'js'].includes(extension)) {
        return file
      }

      let compiled: string = ''
      let error: SandboxFileError | undefined

      try {
        compiled = compileFile(file, options)
      } catch (exception: any) {
        compiled = ''
        error = {
          message: exception.message,
          line: exception.line || 1,
          column: exception.column || 1,
          stack: exception.stack,
        }
      }

      return {
        ...file,
        code: {
          esjs: compileFile(file, {
            ...options,
            to: 'esjs',
          }),
          js: compiled,
        },
        error,
      }
    })

  parent.postMessage({
    action: 'cmd_files_compiled',
    filesCompiled,
  })

  return filesCompiled
}

async function evalCode(args: any) {
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

  const usesTerminal = scripts.some((script: string[]) => script.includes('Terminal'))
  if (usesTerminal)
    await addEsJSTerminal()

  clearConsole()

  for (const script of scripts) {
    const scriptEl = document.createElement('script')
    scriptEl.setAttribute('type', 'module')
    // send ok in the module script to ensure sequential evaluation
    // of multiple proxy.eval() calls
    const done = new Promise((resolve) => {
      // @ts-expect-error - __next__ is defined below, in scriptEl.innerHTML
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

export function setFiles(files: SandboxFile[]) {
  _options.files = files
}

export async function evalEditorFiles(options?: EjecutarOptions) {
  if (!_options.files)
    return

 const compiledFiles = await compileFiles({
    files: _options.files,
    options: {
      from: options?.fromLanguage || 'esjs',
      to: options?.toLanguage || 'js',
    },
  })

  setFiles(compiledFiles)

  await evalFiles({
    files: _options.files,
    options,
  })
}

function clearConsole() {
  if (!_options.clearConsoleOnRun)
    return

  const isDev = window && window.location && window.location.ancestorOrigins && window.location.ancestorOrigins.length
    ? window.location.ancestorOrigins.item(0)?.startsWith('http://localhost:')
    : window.location.href.startsWith('http://localhost:')

  if (isDev)
    return

  // eslint-disable-next-line no-console
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

