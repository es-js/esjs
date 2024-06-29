import { compile } from '@es-js/core'
import { splitCodeImports, splitScriptTemplate } from '@es-js/core/dist/utils'
import { describe, it, beforeAll, beforeEach, afterAll } from 'vitest'
import fs from 'fs'
import path from 'path'
import url from 'url'
// import vite from 'vite'
import { createRequire } from 'module'
// import EsVuePlugin from "../dist/index.mjs";

// declare global {
//   namespace NodeJS {
//     interface Global {
//     }
//   }
// }

const __dirname = path.dirname(url.fileURLToPath(import.meta.url))

let vite: typeof import('vite')
let vitePluginVue: typeof import('@vitejs/plugin-vue')
let EsVuePlugin: typeof import('../src/index')

beforeAll(async () => {
	vite = await import('vite')
	vitePluginVue = await import('@vitejs/plugin-vue')
	EsVuePlugin = await import('../src/index')
})

it('build', async () => {
	// console.log(EsVuePlugin)

	const result = await vite.build({
		root: path.join(__dirname, 'fixtures', 'basic'),
		configFile: false,
		logLevel: 'error',
		plugins: [
			//       {
			//         name: 'vite-plugin-esvue',
			//         enforce: 'pre',
			//         transform(raw: string, id: string) {
			//           if (!/\.esvue$/.test(id)) {
			//             return
			//           }
			//
			//           console.log({
			//             raw,
			//             id
			//           })
			//
			//           return raw
			//
			// //           const { script, template } = splitScriptTemplate(raw)
			// //
			// //           const compiled = compile(script || '', {
			// //             compiler: 'essucrase',
			// //           })
			// //
			// //           const { imports, codeWithoutImports } = splitCodeImports(compiled)
			// //
			// //           return `
			// // <script setup lang="ts">
			// // ${imports}
			// //
			// // ${codeWithoutImports}
			// // </script>
			// // ${template}`
			//         },
			//       },
			EsVuePlugin.default(),
			vitePluginVue.default({
				include: [/\.vue$/, /\.esvue$/],
			}),
		],
		build: {
			write: true,
			minify: false,
		},
		define: {
			global: 'window',
		},
		// resolve: {
		//   alias: {
		//     "vite-plugin-esvue": path.resolve(__dirname, "../src/index.ts"),
		//   },
		// },
	})
	// console.log(result)
})
