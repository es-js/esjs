import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: ['./src/index', './src/keywords'],
  clean: true,
  declaration: true,
  rollup: {
    emitCJS: true,
  },
})
