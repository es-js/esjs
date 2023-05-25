import { URL, fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import monacoEditorPlugin from 'vite-plugin-monaco-editor'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import pluginRewriteAll from 'vite-plugin-rewrite-all'
import WindiCSS from 'vite-plugin-windicss'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      include: [/\.vue$/],
    }),

    monacoEditorPlugin({
      languageWorkers: ['editorWorkerService'],
    }),

    WindiCSS({
      scan: {
        include: ['src/**/*.{vue,html,jsx,tsx}', 'index.html'],
      },
    }),

    Components(),

    AutoImport(),

    pluginRewriteAll(),
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
