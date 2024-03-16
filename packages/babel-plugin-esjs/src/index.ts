import { parse } from '@babel/parser'
import { compile } from '@es-js/core'

export default function () {
  return {
    name: 'esjs',
    parserOverride(code: string, options = {}) {
      const output = compile(code)
      return parse(output, options)
    },
  }
}
