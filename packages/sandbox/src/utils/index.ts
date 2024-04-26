import { compile, type CompileOptions } from '@es-js/core'
import { plugins, setToEsJS } from '@es-js/core/plugins'
import { splitCodeImports } from '@es-js/core/utils'
import escodegen from 'escodegen'
import * as espree from 'espree'
import parserBabel from 'prettier/parser-babel'
import prettier from 'prettier/standalone'
import { IMPORT_ESJS_PRUEBA, IMPORT_ESJS_TERMINAL } from '../compiler/constants'
import { MAIN_FILE, MAIN_TESTS_FILE } from '../compiler/orchestrator'
import { EjecutarOptions, getOptions } from '../runtime/ejecutar'

let start
let end
let prolog
let epilog

class PrepareCodeError extends Error {
  constructor(message: string, public line: number, public column: number) {
    super(message)
  }
}

export class ParseFileError extends Error {
  constructor(message: string, public filename: string, public line: number, public column: number) {
    super(message)
  }
}

export interface SandboxFile {
  name: string
  content: string
  main?: boolean
  code?: {
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

export function compileFile(file: SandboxFile, options?: CompileOptions) {
  if (!file.code) {
    file.code = {}
  }

  return compileCode(file.content, options)
}

export function compileCode(code: string, options?: CompileOptions) {
  try {
    if (options?.compiler === 'essucrase' && options?.to === 'esjs') {
      code = applyPlugins(compile(code, { to: 'js', compiler: options?.compiler }), true)
    }

    const compiled = compile(code, options)

    if (options?.compiler === 'essucrase' && options?.to === 'js') {
      return applyPlugins(compiled)
    }

    return compiled
  } catch (error: any) {
    throw new ParseFileError(error.message, 'code', error.loc?.line || 1, error.loc?.column || 1)
  }
}

function applyPlugins(code: string, toEsJS?: boolean) {
  const putout = getOptions().putout

  const ast = putout.parse(code, {
    printer: 'recast',
  })

  setToEsJS(toEsJS)

  putout.transform(ast, code, {
    plugins,
  })

  return putout.print(ast, {
    printer: 'recast',
  })
}

export function processSandboxedCode(code: string, options?: EjecutarOptions) {
  try {
    if (!code.endsWith('\n'))
      code += '\n'

    code = formatCode(code) // To check syntax errors

    code = addExportToFunctions(code) // To allow functions to be called from another file

    if (options && options.infiniteLoopProtection) {
      code = addInfiniteLoopProtection(code) // To prevent infinite loops
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

function addInfiniteLoopProtectionToBody (node: any, varStr: string, varPrefix: string, loopId: number, patches: {
  pos: number;
  str: string
}[], checkStr: string) {
  switch (node.type) {
    case 'FunctionDeclaration':
      const { body } = node

      body.body.forEach((childNode: any) => {
        addInfiniteLoopProtectionToBody(childNode, varStr, varPrefix, loopId, patches, checkStr)
      })

      break

    case 'ExportNamedDeclaration':
    case 'ExportDefaultDeclaration':
    case 'ExportAllDeclaration':
      addInfiniteLoopProtectionToBody(node.declaration, varStr, varPrefix, loopId, patches, checkStr)
      break

    case 'DoWhileStatement':
    case 'ForStatement':
    case 'ForInStatement':
    case 'ForOfStatement':
    case 'WhileStatement':
      start = 1 + node.body.range[0]
      end = node.body.range[1]
      prolog = checkStr.replace('%d', varPrefix + loopId)
      epilog = ''

      if (node.body.type !== 'BlockStatement') {
        // `while(1) doThat()` becomes `while(1) {doThat()}`
        prolog = `{${prolog}`
        epilog = '}'
        --start
      }

      patches.push({
        pos: start,
        str: prolog,
      })
      patches.push({
        pos: end,
        str: epilog,
      })
      patches.push({
        pos: node.range[0],
        str: varStr.replace('%d', varPrefix + loopId),
      })
      ++loopId
      break

    default:
      break
  }
}

/**
 * Agrega un límite de tiempo de ejecución para cada bucle.
 * @author Ariya Hidayat (versión esprima)
 * @author Enzo Notario (versión espree)
 * @see https://github.com/chinchang/web-maker/blob/master/src/utils.js#L122
 */
export function addInfiniteLoopProtection(code: string, { timeout } = { timeout: 75 }) {
  let loopId = 1
  const patches: { pos: number; str: string }[] = []
  const varPrefix = '_wmloopvar'
  const varStr = 'var %d = Date.now();\n'
  const checkStr = `\nif (Date.now() - %d > ${timeout}) { window._handleInfiniteLoopException(new Error("Bucle infinito")); break;}\n`

  espree.parse(code, {
    range: true,
    ecmaVersion: 'latest',
    jsx: false,
    loc: true,
    tolerant: true,
    sourceType: 'module',
  }).body.forEach((node: any) => {
    addInfiniteLoopProtectionToBody(node, varStr, varPrefix, loopId, patches, checkStr)
  })

  patches
    .sort((a, b) => {
      return b.pos - a.pos
    })
    .forEach((patch) => {
      code = code.slice(0, patch.pos) + patch.str + code.slice(patch.pos)
    })

  return code
}

export function unifyImports(imports: string) {
  const importMap = new Map<string, Set<string>>()

  const importRegex = /import\s+{([^}]+)}\s+from\s+['"]([^'"]+)['"]\s*(;)?/g
  let match
  // eslint-disable-next-line no-cond-assign
  while ((match = importRegex.exec(imports)) !== null) {
    const [, namedImports, moduleSpecifier] = match

    if (!importMap.has(moduleSpecifier))
      importMap.set(moduleSpecifier, new Set())

    namedImports.split(/\s*,\s*/g).forEach((namedImport) => {
      const importName = namedImport.trim()
      if (importName) {
        // @ts-expect-error Set is not iterable
        importMap.get(moduleSpecifier).add(importName)
      }
    })
  }

  let output = ''
  importMap.forEach((namedImports, moduleSpecifier) => {
    const sortedImports = [...namedImports].sort()
    output += `import { ${sortedImports.join(', ')} } from '${moduleSpecifier}'\n`
  })

  // Add the remaining imports that are not duplicated
  const remainingImports = imports.replace(importRegex, '').trim()
  output += remainingImports

  return output.trim()
}

export function escapeTemplateLiteral(code: string) {
  return code.replace(/`/g, '\\`').replace(/\$\{/g, '\\${')
}

/**
 * Agrega `export` a las funciones declaradas.
 * @param code
 */
export function addExportToFunctions(code: string) {
  const ast = espree.parse(code, {
    range: true,
    ecmaVersion: 'latest',
    jsx: false,
    loc: true,
    tolerant: true,
    sourceType: 'module',
  })

  ast.body.forEach((node: any) => {
    if (node.type === 'FunctionDeclaration') {
      // Crear el nodo de exportación
      const exportNode = {
        type: 'ExportNamedDeclaration',
        declaration: node,
        source: null,
        specifiers: [],
      }

      // Reemplazar el nodo de la función con el nodo de exportación
      const index = ast.body.indexOf(node)
      ast.body[index] = exportNode
    }
  })

  return escodegen.generate(ast)
}

/**
 * Genera los imports a partir de las funciones exportadas.
 * @param code
 * @param modulePath
 */
export function generateImportStatement(code: string, modulePath: string) {
  const ast = espree.parse(code, {
    range: true,
    ecmaVersion: 'latest',
    jsx: false,
    loc: true,
    tolerant: true,
    sourceType: 'module',
  })

  const namedExports = ast.body.filter(
    (node: any) =>
      node.type === 'ExportNamedDeclaration'
      && node.declaration?.type === 'FunctionDeclaration',
  )

  const imports = namedExports.map(
    (node: any) =>
      `import { ${node.declaration?.id?.name} } from '${modulePath}'`,
  )

  return imports.join('\n')
}

export function processSandboxedFiles(files: SandboxFile[], options?: EjecutarOptions) {
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
    .map((file) => {
      try {
        const importsFromMain = generateImportStatement(main.sandboxed.codeWithoutImports, `./${MAIN_FILE}`)
        const sandboxedCode = processSandboxedCode(file?.code?.js || '', options)
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
    })

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

export function prepareMainFile(file: any, options?: EjecutarOptions) {
  try {
    const sandboxedCode = processSandboxedCode(file?.code?.js || '', options)
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

export function formatCode(code: string) {
  return prettier.format(code, {
    parser: 'babel',
    plugins: [parserBabel],
    semi: false,
  })
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
