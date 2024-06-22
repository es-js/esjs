import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
	plugins: [dts()],
	build: {
		rollupOptions: {
			external: ['@es-js/terminal', '@es-js/prueba', '@es-js/tiza'],
		},
		lib: {
			entry: {
				render: './src/render/index.ts',
				runtime: './src/runtime/index.ts',
				compiler: './src/compiler/index.ts',
				'utils/processSandboxedFiles': './src/utils/processSandboxedFiles.ts',
				'utils/processSandboxedCode': './src/utils/processSandboxedCode.ts',
			},
			name: 'EsJS Sandbox',
			formats: ['es', 'cjs'],
		},
	},
})
