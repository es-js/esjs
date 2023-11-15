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
  externals: [
    'espree',
    'escodegen',
    '@es-js/core',
    '@es-js/core/utils',
    'prettier/standalone',
    'prettier/parser-babel',
    '@vue/compiler-sfc',
    'acorn',
    'acorn-jsx',
    'eslint-visitor-keys',
    'estraverse',
    'esutils',
    'source-map',
  ],
})
