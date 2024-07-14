import path from 'path'
import url from 'url'
import { beforeAll, describe, expect, it } from 'vitest'

let vite: typeof import('vite')
let EsHTMLPlugin: typeof import('../src/index')

const __dirname = path.dirname(url.fileURLToPath(import.meta.url))

beforeAll(async () => {
	vite = await import('vite')
	EsHTMLPlugin = await import('../src/index')
})

describe('vite-plugin-eshtml', () => {
	it('build basic', async () => {
		try {
			const output = await vite.build({
				root: path.join(__dirname, 'fixtures', 'basic'),
				configFile: false,
				logLevel: 'error',
				plugins: [
					EsHTMLPlugin.default({
						paginas: {
							'test/fixtures/basic/index': {
								plantilla: 'test/fixtures/basic/indice.eshtml',
								entrada: 'fuente/indice.esjs',
							},
						},
					}),
				],
				build: {
					write: true,
					minify: false,
				},
			})

			expect(output).toMatchSnapshot()
		} catch (error) {
			console.error(error)
		}
	})

	it('build pages', async () => {
		const output = await vite.build({
			root: path.join(__dirname, 'fixtures', 'basic'),
			configFile: false,
			logLevel: 'error',
			plugins: [
				EsHTMLPlugin.default({
					paginas: {
						// indice: {
						//   plantilla: 'test/fixtures/basic/indice.eshtml',
						//   entrada: 'fuente/indice.esjs',
						// },
						'test/fixtures/basic/index': {
							plantilla: 'test/fixtures/basic/indice.eshtml',
							entrada: 'fuente/indice.esjs',
						},
						'test/fixtures/basic/licencia': {
							plantilla: 'test/fixtures/basic/fuente/paginas/licencia.eshtml',
							entrada: 'fuente/indice.esjs',
						},
					},
				}),
			],
			build: {
				write: true,
				minify: false,
				rollupOptions: {
					input: {
						indice: 'test/fixtures/basic/index.html',
					},
				},
			},
		})

		expect(output).toMatchSnapshot()
	})
})
