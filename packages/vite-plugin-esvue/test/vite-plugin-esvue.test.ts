// import vite from 'vite'
import path from 'path'
import url from 'url'
import { beforeAll, it } from 'vitest'
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
  await vite.build({
    root: path.join(__dirname, 'fixtures', 'basic'),
    configFile: false,
    logLevel: 'error',
    plugins: [
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
  })
})
