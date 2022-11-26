import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: [
    'src/index',
  ],
  clean: false,
  declaration: true,
  // externals: [
  //   '@babel/parser',
  //   '@es-js/core',
  // ],
  rollup: {
    emitCJS: true,
    inlineDependencies: true,
  },
})
