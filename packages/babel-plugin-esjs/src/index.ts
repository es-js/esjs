import { parse } from '@babel/parser'
import { transpile } from '@es-js/core'

export default function () {
  return {
    name: 'esjs',
    parserOverride(code: string, options = {}) {
      const output = transpile(code)
      return parse(output, options)
    },
  }
}
