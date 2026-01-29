import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: [
    './src/index',
    './src/keywords',
    './src/utils',
    './src/plugins/index',
    './src/compiler/esbabel.compiler',
    './src/compiler/essucrase.compiler',
  ],
  clean: true,
  declaration: true,
  rollup: {
    emitCJS: true,
    inlineDependencies: true,
  },
  externals: ['@putout/bundle', '@es-js/esbabel'],
})
