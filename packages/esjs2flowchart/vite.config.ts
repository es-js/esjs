import { URL, fileURLToPath } from 'node:url'
import nodePolyfills from 'vite-plugin-node-stdlib-browser'
const path = require('path')
const { defineConfig } = require('vite')

module.exports = defineConfig({
  plugins: [
    nodePolyfills(),
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.js'),
      name: 'EsJS to Flowchart',
      fileName: (format: string) => `esjs2flowchart.${format}.js`,
    },
  },
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
      '.esjs',
    ],
  },
})
