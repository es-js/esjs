import * as babel from '@babel/core'
import { splitCodeImports, splitScriptTemplate } from '@es-js/core'
import BabelPluginEsJS from '@es-js/babel-plugin-esjs'
import type { Plugin } from 'vite'

export default (): Plugin => ({
  name: 'vite-plugin-esjs',
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
import { usarConsola } from "@es-js/consola";
${scriptTranspiled.imports}

const consola = usarConsola();

${scriptTranspiled.codeWithoutImports}
</script>

<template>
  ${template}
</template>
`
  },
})
