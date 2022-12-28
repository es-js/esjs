import * as babel from '@babel/core'
import { splitCodeImports, splitScriptTemplate } from '@es-js/core'
import BabelPluginEsJS from '@es-js/babel-plugin-esjs'
import type { Plugin } from 'vite'

export default function EsVue(): Plugin {
  return {
    name: 'vite-plugin-esvue',
    enforce: 'pre',
    transform(raw: string, id: string) {
      if (!/\.esvue$/.test(id))
        return

      const { script, template } = splitScriptTemplate(raw)

      const result = babel.transformSync(script, {
        babelrc: false,
        ast: true,
        plugins: [
          BabelPluginEsJS(),
        ],
        sourceFileName: id,
        configFile: false,
      })

      if (!result)
        throw new Error('Cant transpile')

      const scriptTranspiled = splitCodeImports(String(result.code))

      return `
<script setup lang="ts">
${scriptTranspiled.imports}

${scriptTranspiled.codeWithoutImports}
</script>
${template}`
    },
  }
}
