import { defineConfig } from 'vite'
import EsCSS from '@es-js/vite-plugin-escss'

export default defineConfig({
  plugins: [EsCSS()],
})
