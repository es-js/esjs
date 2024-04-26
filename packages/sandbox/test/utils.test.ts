import { describe, expect, it } from 'vitest'
import { MAIN_FILE } from '../src/compiler/orchestrator'
import { compileFiles } from '../src/runtime/ejecutar'
import {
  addExportToFunctions, addInfiniteLoopProtection,
  escapeTemplateLiteral,
  formatCode,
  generateImportStatement, processSandboxedCode, processSandboxedFiles, prepareMainFile,
  unifyImports, compileCode,
} from '../src/utils'

describe('utils', () => {
  it('unify duplicated imports', () => {
    const imports = `import { afirmar, afirmarIguales, assert, pruebas } from '@es-js/prueba'
import { Terminal } from '@es-js/terminal'
import { afirmarIguales, assert, pruebas } from '@es-js/prueba'`

    const expected = `import { afirmar, afirmarIguales, assert, pruebas } from '@es-js/prueba'
import { Terminal } from '@es-js/terminal'`

    expect(unifyImports(imports).trim()).toBe(expected)
  })

  it('unify imports', () => {
    const imports = `import { pruebas, afirmar, assert, afirmarIguales } from '@es-js/prueba'
import { Terminal } from '@es-js/terminal'
import { pruebas } from '@es-js/prueba'`

    const expected = `import { afirmar, afirmarIguales, assert, pruebas } from '@es-js/prueba'
import { Terminal } from '@es-js/terminal'`

    expect(unifyImports(imports).trim()).toBe(expected)
  })

  it('unify multiline imports', () => {
    const imports = `import {
  afirmar,
  afirmarIguales,
  assert,
  pruebas,
} from '@es-js/prueba'
import { Terminal } from '@es-js/terminal'
import { pruebas } from '@es-js/prueba'`

    const expected = `import { afirmar, afirmarIguales, assert, pruebas } from '@es-js/prueba'
import { Terminal } from '@es-js/terminal'`

    expect(unifyImports(imports).trim()).toBe(expected)
  })

  it('doesnt unify imports if not needed', () => {
    const imports = `import { afirmar, afirmarIguales, assert, pruebas } from '@es-js/prueba'
 import { Terminal } from '@es-js/terminal'`

    const expected = `import { afirmar, afirmarIguales, assert, pruebas } from '@es-js/prueba'
import { Terminal } from '@es-js/terminal'`

    expect(unifyImports(imports).trim()).toBe(expected)
  })

  it('works with cdn imports', () => {
    const imports = `import { Terminal } from '@es-js/terminal'
import { tirarPapeles } from 'https://cdn.esjs.dev/JYWwDg9gTgLgBAYwgOwGYFMY2HVUIhwDkAFlmAM4BcA9DQgCbIB0FA1gJ5gCGCbzDdADd63ZEO4UAtEjSZsRANwAoZegAekWNyi4ArsgTAUcbFB0AFbmHQAbdBQAUDPeaMoAosgCywW8Ap0AHMDBggKAEo4AG9lOEQUCnhUYGQ4AF44ADF0BBJuZm4SaG5HKIBqOBc3Y2QvX39AkOQwilV4hxhuACN7BHQoAElkGAGJWwhHOPj9Q1qymOmZuAocRxy8gqKShYA+TJTkKNjl5ahMaGQdJZmAX3bT2QwsYEcT0-ieWGAEewBhCAGGBUOAAdgANDdlmIgvYQQA2AAMkI+8QoYHO3AYIIArDiUajoMAgqkQdE4OoQYi4PcPrcIiooQk5C83kzPjpsL90ACgSCIey4DC4XAAIwAJmRgvRmOxcDxBI+RJJyDJFJBoppTPpKmWt0VYoAzIbQdMIsp7kA'
import tiza from '@es-js/tiza'
import centrar from 'align-text'`

    const expected = `import { Terminal } from '@es-js/terminal'
import { tirarPapeles } from 'https://cdn.esjs.dev/JYWwDg9gTgLgBAYwgOwGYFMY2HVUIhwDkAFlmAM4BcA9DQgCbIB0FA1gJ5gCGCbzDdADd63ZEO4UAtEjSZsRANwAoZegAekWNyi4ArsgTAUcbFB0AFbmHQAbdBQAUDPeaMoAosgCywW8Ap0AHMDBggKAEo4AG9lOEQUCnhUYGQ4AF44ADF0BBJuZm4SaG5HKIBqOBc3Y2QvX39AkOQwilV4hxhuACN7BHQoAElkGAGJWwhHOPj9Q1qymOmZuAocRxy8gqKShYA+TJTkKNjl5ahMaGQdJZmAX3bT2QwsYEcT0-ieWGAEewBhCAGGBUOAAdgANDdlmIgvYQQA2AAMkI+8QoYHO3AYIIArDiUajoMAgqkQdE4OoQYi4PcPrcIiooQk5C83kzPjpsL90ACgSCIey4DC4XAAIwAJmRgvRmOxcDxBI+RJJyDJFJBoppTPpKmWt0VYoAzIbQdMIsp7kA'
import tiza from '@es-js/tiza'
import centrar from 'align-text'`

    expect(unifyImports(imports).trim()).toBe(expected)
  })

  it('unify imports with semicolon', () => {
    const imports = `import { pruebas, afirmar, assert, afirmarIguales } from '@es-js/prueba';
import { Terminal } from '@es-js/terminal';
import { afirmarObjetosIguales } from '@es-js/prueba';`

    const expected = `import { afirmar, afirmarIguales, afirmarObjetosIguales, assert, pruebas } from '@es-js/prueba'
import { Terminal } from '@es-js/terminal'`

    expect(unifyImports(imports).trim()).toBe(expected)
  })

  it('escapes template literals', () => {
    const code = 'consola.escribir(\`Hola ${nombre}\`)'

    const expected = 'consola.escribir(\\`Hola \\${nombre}\\`)'

    expect(escapeTemplateLiteral(code)).toBe(expected)
  })

  it('adds export to function', () => {
    const code = formatCode(`function foo() {
return 'foo';
}
`)
    const expected = formatCode(`export function foo() {
return 'foo';
}
`)

    expect(formatCode(addExportToFunctions(code))).toBe(expected)
  })

  it('generates import statement', () => {
    const code = formatCode(`function foo() {
return 'foo';
}`)

    const expected = formatCode('import { foo } from \'./foo.js\'')

    expect(formatCode(generateImportStatement(addExportToFunctions(code), './foo.js'))).toBe(expected)
  })

  it('adds infinite loop protection', () => {
    const code = 'while (true) {}'
    const protectedCode = addInfiniteLoopProtection(code)
    expect(protectedCode).toContain('Date.now()')
  })

  it('prepares code correctly', () => {
    const code = 'funcion prueba() { retornar \'Hola, mundo!\'; }'
    const compiledCode = compileCode(code)
    const sandboxedCode = processSandboxedCode(compiledCode)
    expect(sandboxedCode).toContain('export function prueba')
  })

  it('prepares files correctly', () => {
    const files = [
      {
        name: MAIN_FILE,
        content: 'funcion prueba() { retornar \'Hola, mundo!\'; }',
        main: true,
      },
    ]

    const compiledFiles = compileFiles({ files, options: {} })
    const preparedFiles = processSandboxedFiles(compiledFiles)

    expect(preparedFiles[0].code).toContain('export function prueba')
  })

  it('prepares main file correctly', () => {
    const file = { name: 'main.js', content: 'funcion prueba() { retornar \'Hola, mundo!\'; }' }
    const preparedFile = prepareMainFile(file)
    expect(preparedFile.code).toContain('export function prueba')
  })

  it('throws error when parsing invalid file', () => {
    const file = { name: 'main.js', content: 'funcion prueba() { retornar \'Hola, mundo!\'; ' } // Falta el cierre de llave
    expect(() => processSandboxedCode(file)).toThrow()
  })
})
