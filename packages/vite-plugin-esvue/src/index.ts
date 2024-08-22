import { compile } from '@es-js/esvue'
import type { Plugin } from 'vite'

export default function EsVue(): Plugin {
  return {
    name: 'vite-plugin-esvue',
    enforce: 'pre',
    transform(raw: string, id: string) {
      if (!/\.esvue$/.test(id)) {
        return
      }

      return compile(raw)
    },
  }
}
