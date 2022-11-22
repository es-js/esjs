import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: [
    'src/index',
  ],
  clean: false,
  declaration: true,
  externals: [
    'vite',
    '@es-js/transpiler/dist/index'
  ],
  rollup: {
    emitCJS: true,
    inlineDependencies: true,
  },
})
