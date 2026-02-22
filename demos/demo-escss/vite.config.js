import { URL, fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import EsCSS from '@es-js/vite-plugin-escss'
import EsHTML from '@es-js/vite-plugin-eshtml'
import EsJS from '@es-js/vite-plugin-esjs'

export default defineConfig({
  plugins: [
    EsJS(),
    EsCSS(),
    EsHTML({
      paginas: {
        indice: {
          plantilla: 'indice.eshtml',
          entrada: 'fuente/indice.esjs',
          archivo: 'index.html',
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
})
