import fs from 'fs/promises'
import { template } from 'lodash'
import path from 'path'
import type { Plugin, ViteDevServer } from 'vite'
import { getEntryScripts } from './lib/getEntryScripts'
import { replaceEntryScript } from './lib/replaceEntryScript'
import { compile, dfs, dfs2 } from './lib/utils'

const resolve = (p: any) => path.resolve(process.cwd(), p)
const relative = (p: any) => path.relative(process.cwd(), p)

const readHtmlTemplate = async (templatePath: string) => {
	return await fs.readFile(templatePath, { encoding: 'utf8' })
}

const getHtmlContent = async (payload: any) => {
	const { templatePath, pageTitle, pageEntry, data } = payload
	let content = ''

	try {
		content = await readHtmlTemplate(templatePath)

		if (templatePath.endsWith('.eshtml')) {
			content = compile(content)
		}
	} catch (e) {
		console.error(e)
	}

	if (pageEntry) {
		content = content.replace(
			'</body>',
			`  <script type="module" src="/${pageEntry}"></script>\n</body>`,
		)
	}

	const compiled = template(content)

	const context = {
		titulo: pageTitle,
		...data,
	}

	const html = compiled({
		...context,
	})

	return html
}

function getPage(options: any, pageName: string): Pagina | undefined {
	if (pageName === 'index') {
		return options?.paginas?.indice ?? options?.paginas?.index
	}

	return options?.paginas?.[pageName]
}

export interface Opciones {
	paginasDir?: string
	paginas?: Record<string, Pagina>
	datos?: Record<string, any>
}

export interface Pagina {
	plantilla?: string
	titulo?: string
	entrada?: string
	archivo?: string
}

export default function eshtmlPlugin(opciones: Opciones = {}): Plugin {
	const options: Opciones = {
		paginasDir: 'fuente/paginas',
		datos: {},
		...opciones,
		paginas: {
			indice: {
				plantilla: 'indice.eshtml',
				entrada: 'fuente/indice.esjs',
			},
			...opciones.paginas,
		},
	}

	if (options.datos) {
		// support options.data with 'a.b.c' and 'a: {b: {c: 11}}'
		const rebuildData = {}
		for (const key of Object.keys(options.datos)) {
			const value = options.datos[key]
			if (key.includes('.')) {
				const keys = key.split('.')
				dfs(keys, value, rebuildData)
			} else {
				dfs2(rebuildData, key, value)
			}
		}
		options.datos = rebuildData
	}

	const virtualEntries = new Map<string, string>()

	return {
		name: 'vite-plugin-eshtml',
		enforce: 'pre',

		configureServer(server: ViteDevServer) {
			server.middlewares.use(async (req: any, res: any, next: any) => {
				const url = req._parsedUrl.pathname
				let pageName

				if (url === '/') {
					pageName = 'index'
				} else {
					pageName = path.posix
						.join(path.dirname(url), path.basename(url, '.html'))
						.slice(1)
				}

				const page = getPage(options, pageName)

				if (!page) {
					return next()
				}

				const templateOption = page.plantilla
				const templatePath = templateOption
					? resolve(templateOption)
					: resolve('indice.eshtml')

				let content = await getHtmlContent({
					templatePath,
					pageEntry: page.entrada,
					pageTitle: page.titulo || 'Inicio',
					data: options.datos,
				})

				const entries = getEntryScripts(content)

				for (const [key, value] of entries) {
					virtualEntries.set(key, value)
				}

				content = replaceEntryScript(content)

				res.end(content)
			})
		},

		resolveId(id) {
			if (path.extname(id) === '.html') {
				const relativeId = relative(id)
				const pageName = path.posix.join(
					path.dirname(relativeId),
					path.basename(relativeId, '.html'),
				)

				const page = getPage(options, pageName)
				if (page) {
					return id
				}
			}

			return null
		},

		load(id) {
			if (virtualEntries.has(id)) {
				return `import '${virtualEntries.get(id)}'`
			}

			if (path.extname(id) === '.html') {
				const relativeId = relative(id)
				const pageName = path.posix.join(
					path.dirname(relativeId),
					path.basename(relativeId, '.html'),
				)

				const page = getPage(options, pageName)
				if (page) {
					const templateOption = page.plantilla
					const templatePath = templateOption
						? resolve(templateOption)
						: resolve('indice.eshtml')

					return getHtmlContent({
						templatePath,
						pageEntry: page.entrada || 'indice',
						pageTitle: page.titulo || 'Inicio',
						data: options.datos,
					})
				}
			}

			return null
		},

		transform(raw: string, id: string) {
			if (!/\.eshtml$/.test(id)) {
				return
			}

			return compile(raw)
		},
	}
}
