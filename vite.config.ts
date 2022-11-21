// Plugins
import { URL, fileURLToPath } from 'node:url'
import vuetify from 'vite-plugin-vuetify'

// Utilities
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import Inspect from 'vite-plugin-inspect'
import Unocss from 'unocss/vite'
import presetWind from '@unocss/preset-wind'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import monacoEditorPlugin from 'vite-plugin-monaco-editor'
import esjs from './lib/vite-plugin-esjs'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      include: [/\.vue$/, /\.esjs$/],
    }),
    // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vite-plugin
    vuetify({
      autoImport: true,
    }),

    Inspect(),

    Unocss({
      presets: [
        presetWind(),
      ],
    }),

    esjs(),

    Components({ /* options */ }),

    AutoImport({ /* options */ }),

    monacoEditorPlugin({
      languageWorkers: ['editorWorkerService'],
    }),
  ],
  define: { 'process.env': {} },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
    extensions: [
      '.js',
      '.json',
      '.jsx',
      '.mjs',
      '.ts',
      '.tsx',
      '.vue',
      '.esjs',
    ],
  },
  server: {
    port: 3000,
  },
})
