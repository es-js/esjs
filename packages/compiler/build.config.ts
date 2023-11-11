import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: [
    './src/index',
    './src/orchestrator',
  ],
  clean: true,
  declaration: true,
  rollup: {
    emitCJS: true,
  },
})
