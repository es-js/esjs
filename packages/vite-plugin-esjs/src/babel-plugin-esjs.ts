import { parse } from '@babel/parser'
import { transpile } from '@es-js/transpiler'

export default function EsJS() {
  return {
    name: 'esjs',
    parserOverride(code: string, options = {}) {
      const output = transpile(code)
      return parse(output, options)
    },
  }
}
