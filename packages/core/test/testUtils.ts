import type { Options } from 'prettier'
import parserBabel from 'prettier/parser-babel'
import * as prettierPluginEstree from 'prettier/plugins/estree'
import prettier from 'prettier/standalone'
import { expect } from 'vitest'
import { compile } from '../src'
import { applyPlugins } from '../src/applyPlugins'

export async function formatWithPrettier(code: string, options?: Partial<Options>) {
  return prettier.format(code, {
    parser: 'babel',
    plugins: [
      parserBabel,
      prettierPluginEstree,
    ],
    semi: false,
    ...options,
  })
}

export function assertCompile(
  esjsCode: string,
  jsCode: string,
  options: any = { },
  message?: string,
): void {
  expect(compileCode(esjsCode, { ...options, reverse: false })).toEqual(jsCode)

  expect(compileCode(jsCode, { ...options, reverse: true })).toEqual(esjsCode)
}

export function compileCode(code: string, options: any = {}) {
  if (options.reverse && options.convert) {
    code = applyPlugins(compile(code, {
      to: 'js',
    }), options.reverse)
  }

  let generated = compile(code, {
    from: options.reverse ? 'js' : 'esjs',
    to: options.reverse ? 'esjs' : 'js',
    compiler: 'essucrase',
  })

  if (!options.reverse && options.convert)
    generated = applyPlugins(generated, options.reverse)

  return generated
}
