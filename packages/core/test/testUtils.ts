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

export async function assertResult(
  code: string,
  expectedResult: string,
  options: any = { },
  message?: string,
): Promise<void> {
  let generated = compile(code, options)

  generated = applyPlugins(generated, options.reverse)

  expect(await formatWithPrettier(generated)).toEqual(await formatWithPrettier(expectedResult))
}
