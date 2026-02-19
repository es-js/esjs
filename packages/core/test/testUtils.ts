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

/** Normaliza código JS para comparación estable entre entornos (evita fallos por tabs/espacios/semicolons). */
export async function normalizeJsForCompare(code: string): Promise<string> {
  return formatWithPrettier(code, PRETTIER_OPTIONS)
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
