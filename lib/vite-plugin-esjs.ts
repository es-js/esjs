import * as babel from '@babel/core'
import type { Plugin } from 'vite'
import EsJs from './babel-plugin-esjs'

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
        EsJs(),
      ],
      sourceFileName: id,
      configFile: false,
    })

    return `
<script setup lang="ts">
import { Terminal } from "esvue";
import { usarConsola } from "esvue";

const consola = usarConsola();

(async () => {
  ${result.code}
})();
</script>

<template>
<Terminal />
</template>`
  },
})
