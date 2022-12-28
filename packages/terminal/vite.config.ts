import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/main.ts'),
      name: 'EsTerminal',
      fileName: format => `terminal.${format}.js`,
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
  plugins: [
    vue({
      customElement: true,
      template: {
        compilerOptions: {
          isCustomElement: (tag: string) => tag.includes('es-terminal')
        }
      }
    }),
    dts({
      staticImport: true,
      skipDiagnostics: false,
      logDiagnostics: true,
      rollupTypes: true,
      insertTypesEntry: true,
    }),
  ],
})
