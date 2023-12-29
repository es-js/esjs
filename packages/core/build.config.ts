import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: [
    './src/index',
    './src/compiler/keywords',
    './src/utils',
  ],
  clean: true,
  declaration: true,
  rollup: {
    emitCJS: true,
  },
})
