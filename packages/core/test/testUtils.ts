import type { Options } from 'prettier'
import parserBabel from 'prettier/parser-babel'
import prettier from 'prettier/standalone'
import { expect } from 'vitest'
import { compile } from '../src'

export interface TestCompileOptions {
  reverse?: boolean
  compiler?: 'essucrase' | 'esbabel'
}

const PRETTIER_OPTIONS = {
  parser: 'babel' as const,
  plugins: [parserBabel],
  semi: false,
  tabWidth: 2,
  endOfLine: 'lf' as const,
  /** Evita que Prettier rompa líneas de forma distinta según versión/entorno (p. ej. objetos en una vs varias líneas). */
  printWidth: 120,
}

export async function formatWithPrettier(
  code: string,
  options?: Partial<Options>,
) {
  return prettier.format(code.trim(), {
    ...PRETTIER_OPTIONS,
    ...options,
  })
}

/**
 * Colapsa líneas en blanco consecutivas para que la comparación no dependa
 * de si Prettier inserta una o más líneas en blanco (varía por versión/entorno).
 */
function collapseBlankLines(code: string): string {
  return code.replace(/\n\n+/g, '\n').trim()
}

/**
 * Pone siempre los comentarios de fin de línea en una línea aparte, con la misma
 * indentación. Así da igual si Prettier (según versión/entorno) deja "foo() // bar"
 * o "foo()\n  // bar".
 */
function normalizeEolComments(code: string): string {
  return code
    .split('\n')
    .map((line) => {
      const match = line.match(/^(\s*)(.*)(\)|;)\s*\/\/(.*)$/)
      if (!match) return line
      const [, indent, rest, end, comment] = match
      return `${indent}${rest}${end}\n${indent}//${comment}`
    })
    .join('\n')
}

/**
 * Quita el salto de línea tras `{` o `[` para que Prettier no preserve formato
 * multilínea (en algunos entornos el compilador emite multilínea y en otros no).
 */
function forceSingleLineLiteralsBeforeFormat(code: string): string {
  return code
    .replace(/\{\s*\n\s*/g, '{ ')
    .replace(/\[\s*\n\s*/g, '[ ')
}

/** Normaliza código JS para comparación estable entre entornos (evita fallos por tabs/espacios/semicolons/líneas en blanco/comentarios). */
export async function normalizeJsForCompare(code: string): Promise<string> {
  const forced = forceSingleLineLiteralsBeforeFormat(code)
  const formatted = await formatWithPrettier(forced, PRETTIER_OPTIONS)
  const collapsed = collapseBlankLines(formatted)
  return normalizeEolComments(collapsed)
}

export async function assertCompile(
  esjsCode: string,
  jsCode: string,
  options: TestCompileOptions = {},
): Promise<void> {
  const generatedJs = compile(esjsCode, { ...options, to: 'js' })
  const generatedEsjs = compile(jsCode, { ...options, to: 'esjs' })
  expect(await normalizeJsForCompare(generatedJs)).toEqual(
    await normalizeJsForCompare(jsCode),
  )
  expect(await normalizeJsForCompare(compile(generatedEsjs, { ...options, to: 'js' }))).toEqual(
    await normalizeJsForCompare(compile(esjsCode, { ...options, to: 'js' })),
  )
}

export async function assertEsJSToJS(
  esjsCode: string,
  jsCode: string,
  options: TestCompileOptions = {},
): Promise<void> {
  const generated = compile(esjsCode, { ...options, to: 'js' })
  expect(await normalizeJsForCompare(generated)).toEqual(
    await normalizeJsForCompare(jsCode),
  )
}

export async function assertJSToESJS(
  jsCode: string,
  esjsCode: string,
  options: TestCompileOptions = {},
): Promise<void> {
  const generatedEsjs = compile(jsCode, { ...options, to: 'esjs' })
  expect(await normalizeJsForCompare(compile(generatedEsjs, { ...options, to: 'js' }))).toEqual(
    await normalizeJsForCompare(compile(esjsCode, { ...options, to: 'js' })),
  )
}
