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
				utils: './src/utils/index.ts',
				runtime: './src/runtime/index.ts',
				compiler: './src/compiler/index.ts',
			},
			name: 'EsJS Sandbox',
			formats: ['es', 'cjs'],
		},
	},
})
