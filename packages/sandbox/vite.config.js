import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [dts()],
  build: {
    rollupOptions: {
      external: [
        '@es-js/terminal',
        '@es-js/prueba',
        '@es-js/tiza',
      ],
    },
    lib: {
      entry: {
        index: './src/index.ts',
        render: './src/render.ts',
      },
      name: 'EsJS Sandbox',
      formats: ['es', 'cjs'],
    },
  },
})
