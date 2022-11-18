import type { ParserOptions } from '@babel/parser'
import { parse } from '@babel/parser'
import esjs from '@esvue/esjs/dist/index.js'

export default function EsJs() {
  return {
    name: 'esjs',
    parserOverride(code: string, options?: ParserOptions) {
      const output = esjs.transpile(code)
      return parse(output, options)
    },
  }
}
