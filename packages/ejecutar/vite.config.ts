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
})
