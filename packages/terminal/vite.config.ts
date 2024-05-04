import { resolve } from 'path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

// https://vitejs.dev/config/
export default defineConfig({
	build: {
		lib: {
			entry: resolve(__dirname, 'src/main.ts'),
			name: 'EsTerminal',
			fileName: (format) => `terminal.${format}.js`,
		},
	},
	plugins: [
		dts({
			staticImport: true,
			skipDiagnostics: false,
			rollupTypes: true,
			insertTypesEntry: true,
		}),
	],
})
