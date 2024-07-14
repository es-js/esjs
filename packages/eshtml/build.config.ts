import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
	entries: ['src/index'],
	clean: false,
	declaration: true,
	externals: ['@es-js/core'],
	rollup: {
		emitCJS: true,
		inlineDependencies: true,
	},
})
