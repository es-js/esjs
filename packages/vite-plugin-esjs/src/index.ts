import { compile } from '@es-js/core'
import { splitCodeImports } from '@es-js/core/utils'
import type { Plugin } from 'vite'

export default function EsJS(options = {}): Plugin {
  return {
    name: 'vite-plugin-esjs',
    enforce: 'pre',
    transform(raw: string, id: string) {
      if (!/\.esjs$/.test(id))
        return

      const compiled = compile(raw)

      const { imports, codeWithoutImports } = splitCodeImports(compiled)

      return `${imports}

${codeWithoutImports}`
    },
  }
}
