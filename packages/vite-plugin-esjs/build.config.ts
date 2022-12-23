import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: [
    'src/index',
  ],
  clean: false,
  declaration: true,
  externals: [
    'vite',
    '@babel/core',
  ],
  rollup: {
    emitCJS: true,
    inlineDependencies: true,
  },
})
