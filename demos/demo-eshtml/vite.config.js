import { URL, fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import EsJS from '@es-js/vite-plugin-esjs'
import EsHTML from '@es-js/vite-plugin-eshtml'

export default defineConfig({
  plugins: [
    EsJS(),
    EsHTML({
      paginas: {
        contador: {
          entrada: 'fuente/paginas/contador.esjs',
          plantilla: 'fuente/paginas/contador.eshtml',
          titulo: 'Contador reactivo',
        },
      },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./fuente', import.meta.url)),
    },
    extensions: [
      '.js',
      '.json',
      '.jsx',
      '.mjs',
      '.ts',
      '.tsx',
      '.esjs',
      '.eshtml',
    ],
  },
  server: {
    port: 3000,
  },
})
