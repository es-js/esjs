import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
	entries: [
    'src/index',
    'src/render',
  ],
	clean: true,
	declaration: true,
	externals: ['@es-js/core'],
	rollup: {
		emitCJS: true,
		inlineDependencies: true,
	},
})
