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

      // const html = EsHTMLCompile(raw, { from: 'eshtml', to: 'html' })
      //
      // return transformScriptSetup(html)
    },
  }
}

// function transformScriptSetup(html: string) {
// 	const tree = parser(html)
//
// 	const script: any = tree.find((node: any) => node.tag === 'script')
//
// 	if (!script) {
// 		return html
// 	}
//
// 	if (script.attrs.hasOwnProperty('configuracion')) {
// 		delete script.attrs.configuracion
// 		script.attrs.setup = ''
// 	}
//
// 	if (script.attrs.hasOwnProperty('setup')) {
// 		const code = script.content[0]
//
// 		const codeCompiled = EsJSCompile(code, { compiler: 'essucrase' })
//
// 		script.content[0] = codeCompiled
// 	}
//
// 	return render(tree)
// }
