import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
  ],
  build: {
    // minify: false,
    rollupOptions: {
      external: [
        '@es-js/terminal',
        '@es-js/prueba',
        '@es-js/tiza',
      ],

      // input: {
      //   main: 'src/main.ts',
      // },
      //
      // output: {
      //   assetFileNames: ({ name }) => {
      //     if (/\.css$/.test(name ?? ''))
      //       return 'assets/[name][extname]'
      //
      //     // default value
      //     // ref: https://rollupjs.org/guide/en/#outputassetfilenames
      //     return 'assets/[name]-[hash][extname]'
      //   },
      //
      //   entryFileNames: ({ name }) => {
      //     // default value
      //     // ref: https://rollupjs.org/guide/en/#outputentryfilenames
      //     return '[name].js'
      //   },
      // },
    },
    lib: {
      entry: {
        main: './src/main.ts',
        sandbox: './src/sandbox.ts',
        // orchestrator: './src/orchestrator.ts',
      },
      name: 'EsJS Sandbox',
      formats: ['es', 'cjs'],
    },
  },
})
