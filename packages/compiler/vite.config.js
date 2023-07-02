// const path = require("path");
// const { defineConfig } = require("vite");
import path from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    lib: {
      entry: {
        compiler: './src/main.ts',
        orchestrator: './src/orchestrator.ts',
      },
      name: 'EsJS Compiler',
      formats: ['es', 'cjs'],
    },
  },
})
