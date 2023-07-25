import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [
    dts(),
  ],
  build: {
    // minify: false,
    rollupOptions: {
      external: [
        '@es-js/terminal',
        '@es-js/prueba',
        '@es-js/tiza',
      ],
    },
    lib: {
      entry: {
        main: './src/main.ts',
        sandbox: './src/sandbox.ts',
      },
      name: 'EsJS Sandbox',
      formats: ['es', 'cjs'],
    },
  },
})
