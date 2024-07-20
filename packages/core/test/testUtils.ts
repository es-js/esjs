import type { Options } from 'prettier'
import parserBabel from 'prettier/parser-babel'
import * as prettierPluginEstree from 'prettier/plugins/estree'
import prettier from 'prettier/standalone'
import { expect } from 'vitest'
import { compile } from '../src'

export interface TestCompileOptions {
  reverse?: boolean
  compiler?: 'essucrase' | 'esbabel'
}

export async function formatWithPrettier(
  code: string,
  options?: Partial<Options>,
) {
  return prettier.format(code, {
    parser: 'babel',
    plugins: [parserBabel, prettierPluginEstree],
    semi: false,
    ...options,
  })
}

export function assertCompile(
  esjsCode: string,
  jsCode: string,
  options: TestCompileOptions = {},
): void {
  expect(compile(esjsCode, { ...options, to: 'js' })).toEqual(jsCode)

  expect(compile(jsCode, { ...options, to: 'esjs' })).toEqual(esjsCode)
}

export function assertEsJSToJS(
  esjsCode: string,
  jsCode: string,
  options: TestCompileOptions = {},
) {
  expect(compile(esjsCode, { ...options, to: 'js' })).toEqual(jsCode)
}

export function assertJSToESJS(
  jsCode: string,
  esjsCode: string,
  options: TestCompileOptions = {},
) {
  expect(compile(jsCode, { ...options, to: 'esjs' })).toEqual(esjsCode)
}
