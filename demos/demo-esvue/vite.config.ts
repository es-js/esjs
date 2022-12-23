import { URL, fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import EsVue from 'vite-plugin-esvue'

export default defineConfig({
  plugins: [
    vue({
        include: [/\.vue$/, /\.esjs$/, /\.esvue$/],
    }),
    EsVue(),
  ],
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
      '.esvue',
    ],
  },
  server: {
    port: 3000,
  },
})
