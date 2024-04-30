import { splitCodeImports } from '@es-js/core/utils'
import { IMPORT_ESJS_PRUEBA, IMPORT_ESJS_TERMINAL } from '../moduleCompiler/constants'
import { MAIN_FILE, MAIN_TESTS_FILE } from '../moduleCompiler/orchestrator'
import { EjecutarOptions, ProcessSandboxedCodeOptions } from '../runtime/ejecutar'
import { ExportFunctionsTransformer } from '../transformers/exportFunctions.transformer'
import { InfiniteLoopProtectionTransformer } from '../transformers/infiniteLoopProtection.transformer'
import { formatCode } from './formatCode'
import { generateImportFunctions } from './generateImportFunctions'
import { unifyImports } from './unifyImports'

class PrepareCodeError extends Error {
  constructor(message: string, public line: number, public column: number) {
    super(message)
  }
}

export interface SandboxFile {
  name: string
  content: string
  main?: boolean
  compiled?: {
    esjs?: string
    js?: string
  },
  sandboxed?: {
    imports: string
    codeWithoutImports: string
  },
  error?: SandboxFileError
}

export interface SandboxFileError {
  message: string
  line: number
  column: number
  stack: string
}

export function processSandboxedFiles(files: SandboxFile[], options: ProcessSandboxedCodeOptions) {
  if (files.some((file) => file.error)) {
    const firstFileWithError = files.find((file) => file.error)

    if (!firstFileWithError?.error) {
      return files
    }

    return printError(firstFileWithError)
  }

  const main = prepareMainFile(files.find((file: any) => file.name === MAIN_FILE), options)

  if (main.error) {
    return printError(main)
  }

  const restOfFiles = files
    .filter((file: any) => file.name !== MAIN_FILE)
    .map((file) => prepareOtherFile(file, main, options))

  if (restOfFiles.some((file) => file.error)) {
    const firstFileWithError = restOfFiles.find((file) => file.error)

    if (!firstFileWithError?.error) {
      return restOfFiles
    }

    return printError(firstFileWithError)
  }

  const sandboxedFiles = [
    main,
    ...restOfFiles,
  ]

  parent.postMessage({
    action: 'cmd_files_compiled',
    filesCompiled: sandboxedFiles,
  })

  return sandboxedFiles
}

export function processSandboxedCode(code: string, options?: ProcessSandboxedCodeOptions) {
  try {
    if (!code.endsWith('\n'))
      code += '\n'

    code = formatCode(code) // To check syntax errors

    code = new ExportFunctionsTransformer().transform(code)

    if (options && options.infiniteLoopProtection) {
      code = new InfiniteLoopProtectionTransformer().transform(code)
    }

    code = formatCode(code) // To format the code again

    return code
  }
  catch (error: SyntaxError | any) {
    const errorMessage = error.message
    const line = error?.loc?.start?.line || 1
    const column = error?.loc?.start?.column || 1

    throw new PrepareCodeError(errorMessage, line, column)
  }
}

function prepareMainFile(file: SandboxFile, options?: ProcessSandboxedCodeOptions) {
  try {
    const sandboxedCode = processSandboxedCode(file?.compiled?.js || '', {
      infiniteLoopProtection: options?.infiniteLoopProtection || false,
    })
    const splittedCode = splitCodeImports(sandboxedCode)

    const codeUsesTerminal = splittedCode.codeWithoutImports.includes('Terminal')

    const imports = unifyImports(`
${codeUsesTerminal ? IMPORT_ESJS_TERMINAL : ''}
${IMPORT_ESJS_PRUEBA}
${splittedCode.imports}
  `)

    return {
      ...file,
      sandboxed: {
        imports,
        codeWithoutImports: splittedCode.codeWithoutImports,
      },
    }
  } catch (error: any) {
    return {
      ...file,
      error: {
        message: error.message,
        line: error.line,
        column: error.column,
        stack: error.stack,
      },
    }
  }
}

function prepareOtherFile(file: any, main: any, options: ProcessSandboxedCodeOptions) {
  try {
    const importsFromMain = generateImportFunctions({
      code: main.sandboxed.codeWithoutImports,
      modulePath: `./${MAIN_FILE}`,
    })
    const sandboxedCode = processSandboxedCode(file?.compiled?.js || '', {
      infiniteLoopProtection: options.infiniteLoopProtection,
    })
    const splitted = splitCodeImports(sandboxedCode)
    const imports = unifyImports(`
      ${importsFromMain}
      ${splitted.imports}
      ${file.name === MAIN_TESTS_FILE ? IMPORT_ESJS_PRUEBA : ''}
    `)

    return {
      ...file,
      sandboxed: {
        imports,
        codeWithoutImports: splitted.codeWithoutImports,
      },
    }
  } catch (error: any) {
    return {
      ...file,
      error: {
        message: error.message,
        line: error.line,
        column: error.column,
        stack: error.stack,
      },
    }
  }
}

function printError(file: SandboxFile) {
  if (!file.error) {
    return [file]
  }

  return [
    {
      ...file,
      sandboxed: {
        imports: 'import { Terminal } from \'@es-js/terminal\'; import { tiza } from \'@es-js/tiza\';',
        codeWithoutImports: `
Terminal.clear()

Terminal.escribir(\`Error en el archivo \${tiza.fondoAzul50.azul800(${JSON.stringify(file.name)})}:\`)

Terminal.escribir(
tiza.rojo(${JSON.stringify(file.error.message)})
)

console.error(${JSON.stringify(file.error.message)})

window.onerror(${JSON.stringify(file.error.message)}, null, ${file.error.line}, ${file.error.column}, ${JSON.stringify(file.error)})`,
      },
    }
  ]
}
