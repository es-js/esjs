import path from 'path'
import url from 'url'
import { beforeAll, expect, it } from 'vitest'

let vite: typeof import('vite')
let EsHTMLPlugin: typeof import('../src/index')

const __dirname = path.dirname(url.fileURLToPath(import.meta.url))

beforeAll(async () => {
	vite = await import('vite')
	EsHTMLPlugin = await import('../src/index')
})

it('build', async () => {
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
