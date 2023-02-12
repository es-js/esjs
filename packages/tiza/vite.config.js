import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    lib: {
      outDir: 'dist',
      entry: resolve(__dirname, 'src/index.js'),
      name: 'tiza',
      fileName: format => `tiza.${format}.js`,
    },
    rollupOptions: {
      external: ['chalk'],
    },
  },
  test: {
    include: ['test/**/*.test.js'],
  },
})
