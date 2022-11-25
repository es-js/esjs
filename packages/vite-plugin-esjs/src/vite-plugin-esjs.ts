import * as babel from '@babel/core'
import type { Plugin } from 'vite'
import { splitCodeImports } from '@es-js/transpiler'
import EsJSBabel from './babel-plugin-esjs'

export default (): Plugin => ({
  name: 'vite-plugin-esjs',
  enforce: 'pre',
  transform(raw, id) {
    if (!/\.esjs$/.test(id))
      return

    const result = babel.transformSync(raw, {
      babelrc: false,
      ast: true,
      plugins: [
        EsJSBabel(),
      ],
      sourceFileName: id,
      configFile: false,
    })

    if (!result)
      throw new Error('Cant transpile')

    const output = splitCodeImports(String(result.code))

    return `
<script setup lang="ts">
import { Terminal, usarConsola } from "@es-js/esvue";

const consola = usarConsola();

(async () => {
  ${output.codeWithoutImports}
})();
</script>

<template>
<Terminal />
</template>

<style>
@import "https://unpkg.com/@es-js/esvue@0.0.0/dist/style.css"
</style>
`
  },
})
