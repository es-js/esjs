import { importMaps } from 'vite-plugin-import-maps'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    importMaps([
      {
        imports: {
          '@es-js/terminal': 'https://cdn.jsdelivr.net/npm/@es-js/terminal@0.0.31/dist/terminal.es.js/+esm',
          '@es-js/prueba': 'https://cdn.jsdelivr.net/npm/@es-js/prueba@0.0.8/+esm',
          '@es-js/tiza': 'https://cdn.jsdelivr.net/npm/@es-js/tiza@0.0.5/+esm',
          'eruda': 'https://cdn.jsdelivr.net/npm/eruda@2.11.2/+esm',
          'twind/shim': 'https://cdn.skypack.dev/twind/shim',
        },
      },
    ]),
  ],
  build: {
    rollupOptions: {
      external: ['@es-js/terminal', '@es-js/prueba', '@es-js/tiza', 'eruda', 'twind/shim'],

      output: {
        assetFileNames: ({ name }) => {
          if (/\.css$/.test(name ?? '')) {
            return 'assets/[name][extname]'
          }

          // default value
          // ref: https://rollupjs.org/guide/en/#outputassetfilenames
          return 'assets/[name]-[hash][extname]'
        },
      },
    },
  },
})
