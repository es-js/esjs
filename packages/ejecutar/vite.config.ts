import { importMaps } from 'vite-plugin-import-maps'
import { defineConfig } from 'vite'

const isDev = false && process.env.NODE_ENV === 'development'

export default defineConfig({
  plugins: [
    importMaps([
      ...(isDev
        ? [
            {
              imports: {
                '@es-js/terminal': 'http://localhost:5174/src/main.ts',
                '@es-js/prueba': 'https://cdn.jsdelivr.net/npm/@es-js/prueba@0.0.8/+esm',
                '@es-js/tiza': 'https://cdn.jsdelivr.net/npm/@es-js/tiza@1.0.0-beta.1/+esm',
              },
            },
          ]
        : [
            {
              imports: {
                '@es-js/terminal': 'https://cdn.jsdelivr.net/npm/@es-js/terminal@1.0.0-beta.4/dist/terminal.es.js/+esm',
                '@es-js/prueba': 'https://cdn.jsdelivr.net/npm/@es-js/prueba@0.0.8/+esm',
                '@es-js/tiza': 'https://cdn.jsdelivr.net/npm/@es-js/tiza@1.0.0-beta.1/+esm',
              },
            },
          ]),
    ]),
  ],
  build: {
    rollupOptions: {
      external: [
        '@es-js/terminal',
        '@es-js/prueba',
        '@es-js/tiza',
      ],

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
