import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    lib: {
      outDir: 'dist',
      entry: 'src/index.js',
      name: 'tiza',
      fileName: (format) => `tiza.${format}.js`,
    },
  },
  test: {
    include: ['test/**/*.test.js'],
  },
})
