import type { AvailableLanguages, CompileOptions, Compiler } from '@es-js/core'
import { EssucraseCompiler } from '@es-js/core/compiler/essucrase.compiler'
import { compileModulesForPreview } from '../compiler'
import { orchestrator, OrchestratorFile } from '../compiler/orchestrator'
import {
  processSandboxedFiles,
  type SandboxFile,
  type SandboxFileError,
} from '../utils/processSandboxedFiles'
import {
  changeSize,
  getActiveTab,
  openEruda,
  setActiveTab,
  setErudaTheme,
  setupEruda,
} from './eruda'

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
  compiler?: 'esbabel' | 'essucrase'
  putout?: any
}

export interface ProcessSandboxedCodeOptions {
  preFormat?: boolean
  exportFunctions?: boolean
  infiniteLoopProtection?: boolean
}

let _options: EjecutarOptions

const scriptEls: HTMLScriptElement[] = []

let theme: 'dark' | 'light' = 'dark'

export function getOptions() {
  return _options
}

export async function loadPutout() {
  _options.putout = await import('https://esm.sh/@putout/bundle@2')
}

export async function init(options: EjecutarOptions): Promise<void> {
  _options = options

  if (typeof _options.usarTerminal !== 'function') {
    throw new Error('usarTerminal is required')
  }

  await setupEruda()

  setupTheme(_options.theme)

  hidePreview(_options.hidePreview)

  previewTab(_options.previewTab)

  if (
    (!_options.compiler || _options.compiler === 'essucrase') &&
    !_options.putout
  ) {
    await loadPutout()
  }

  await evalEditorFiles(_options)
}

export async function evalFiles({
  files,
  options,
}: { files: SandboxFile[]; options?: EjecutarOptions }) {
  const result = processSandboxedFiles(
    files.filter((file: any) => {
      const extension = file.name.split('.').slice(-1)[0]

      return ['esjs', 'js'].includes(extension)
    }),
    {
      preFormat: !options?.compiler || options?.compiler === 'esbabel',
      infiniteLoopProtection: options?.infiniteLoopProtection || false,
    },
  )

  result.forEach((file: SandboxFile) => {
    if (!file.name) {
      return
    }

    const extension = file.name.split('.').slice(-1)[0]

    if (!['esjs', 'js'].includes(extension)) {
      return
    }

    if (!file.sandboxed) {
      return
    }

    orchestrator.files[file.name] = new OrchestratorFile(
      file.name,
      '',
      `${file.sandboxed.imports}\n${file.sandboxed.codeWithoutImports}\n`,
      '',
    )
  })

  const modules = compileModulesForPreview(Object.values(orchestrator.files))

  await evalCode({
    script: ['const __modules__ = {};', ...modules.reverse()],
  })
}

export async function compileFiles({
  files,
  options,
}: { files: SandboxFile[]; options: CompileOptions }) {
  const filesCompiled: SandboxFile[] = files.map((file: any) => {
    const extension = file.name.split('.').slice(-1)[0]

    if (!['esjs', 'js'].includes(extension)) {
      return file
    }

    const { compiled: compiledJS, error: errorJS } = tryToCompile(file, options)

    const { compiled: compiledEsJS, error: errorEsJS } = tryToCompile(file, {
      ...options,
      to: 'esjs',
    })

    return {
      ...file,
      compiled: {
        esjs: compiledEsJS,
        js: compiledJS,
      },
      error: errorJS || errorEsJS || undefined,
    }
  })

  parent.postMessage({
    action: 'cmd_files_compiled',
    filesCompiled,
  })

  return filesCompiled
}

function tryToCompile(file: any, options: CompileOptions) {
  let compiled: string = ''
  let error: SandboxFileError | undefined
  try {
    compiled = compileFile(file, options)
  } catch (exception: any) {
    compiled = file.content
    error = {
      message: exception.message,
      line: exception.line || 1,
      column: exception.column || 1,
      stack: exception.stack,
    }
  }
  return {
    compiled,
    error,
  }
}

function compileFile(file: SandboxFile, options?: CompileOptions) {
  if (!file.compiled) {
    file.compiled = {}
  }

  return compile(file.content, {
    ...options,
    putout: getOptions().putout,
  })
}

function compile(code: string, options: any): string {
  if (!options.putout) {
    return code
  }

  const compiler: Compiler = new EssucraseCompiler(options.putout)
  return compiler.compile(code, options as CompileOptions)
}

async function evalCode(args: any) {
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

  resetAppElement()

  const usesTerminal = scripts.some((script: string[]) =>
    script.includes('Terminal'),
  )
  if (usesTerminal) {
    await addEsJSTerminal()
  }

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
  if (!_options.files) {
    return
  }

  if (isAnyFileNotCompiled(_options.files)) {
    const compiledFiles = await compileFiles({
      files: _options.files,
      options: {
        from: options?.fromLanguage || 'esjs',
        to: options?.toLanguage || 'js',
        compiler: options?.compiler,
      },
    })

    setFiles(compiledFiles)
  }

  await evalFiles({
    files: _options.files,
    options,
  })
}

export function isAnyFileNotCompiled(files: SandboxFile[]) {
  return files
    .filter((file) =>
      ['esjs', 'js'].includes(file.name.split('.').slice(-1)[0]),
    )
    .some(
      (file) =>
        file?.compiled?.js === undefined || file?.compiled?.esjs === undefined,
    )
}

function clearConsole() {
  if (!_options.clearConsoleOnRun) {
    return
  }

  const isDev =
    window &&
    window.location &&
    window.location.ancestorOrigins &&
    window.location.ancestorOrigins.length
      ? window.location.ancestorOrigins.item(0)?.startsWith('http://localhost:')
      : window.location.href.startsWith('http://localhost:')

  if (isDev) {
    return
  }

  // eslint-disable-next-line no-console
  console.clear()
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
  } else {
    previewElement.style.display = 'flex'
    previewElement.style.flex = '1 1 0'

    changeSize(50)
  }

  if (getActiveTab() !== 'hidden') {
    openEruda()
  }
}

export function previewTab(value: 'console' | 'flowchart' | 'hidden') {
  setActiveTab(value)
}

export function setupTheme(value: 'dark' | 'light') {
  theme = value || 'dark'

  const htmlElement = document.getElementsByTagName('html')?.[0]

  if (htmlElement) {
    htmlElement.classList.toggle('dark', theme === 'dark')
  }

  setErudaTheme(theme)

  _options.usarTerminal().setTheme(theme)
}

async function addEsJSTerminal() {
  const appElement = document.getElementById('app')

  if (!appElement) {
    return
  }

  const newEsTerminalElement = document.createElement('es-terminal')
  newEsTerminalElement.id = 'es-terminal'
  newEsTerminalElement.className = 'w-full h-full absolute inset-0'
  newEsTerminalElement.setAttribute(
    'tema',
    theme === 'dark' ? 'oscuro' : 'claro',
  )
  appElement.appendChild(newEsTerminalElement)
}

function resetAppElement() {
  const appElement = document.getElementById('app')

  if (!appElement) {
    return
  }

  appElement.innerHTML = ''
}
