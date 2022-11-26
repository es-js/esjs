import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { EsJS } from 'vite-plugin-esjs'

const path = require('path')

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      include: [/\.vue$/, /\.esjs$/],
    }),

    EsJS(),
  ],
  resolve: {
    alias: [
      {
        find: /^@\/(.+)/,
        replacement: `${path.resolve(__dirname, 'src')}/$1`,
      },
    ],
    extensions: ['.js', '.json', '.jsx', '.mjs', '.ts', '.tsx', '.vue', '.esjs'],
  },
})
