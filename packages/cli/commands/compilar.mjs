#!/usr/bin/env node

import { compile } from '@es-js/core'
import { defineCommand } from 'citty'
import { consola } from 'consola'
import { readFile, readdir, writeFile } from 'node:fs/promises'
import path from 'node:path'

export default defineCommand({
	meta: {
		name: 'compilar',
		description:
			'Compila un archivo (script) o directorio con archivos de EsJS.',
	},

	args: {
		ruta: {
			type: 'positional',
			description: 'Ruta del archivo o directorio a compilar.',
			required: true,
		},

		recursivo: {
			type: 'flag',
			description: 'Compila de forma recursiva los archivos de un directorio.',
			alias: 'r',
		},

		desde: {
			type: 'flag',
			description: 'Lenguaje de origen.',
			default: 'esjs',
		},

		hacia: {
			type: 'flag',
			description: 'Lenguaje de destino.',
			default: 'js',
		},

		verboso: {
			type: 'flag',
			description: 'Muestra información detallada de la compilación.',
			alias: 'v',
		},
	},

	async run({ args }) {
		const compilar = async (ruta) => {
			const stats = await readdir(ruta, { withFileTypes: true })
			const archivos = stats.filter((s) => s.isFile()).map((s) => s.name)
			const directorios = stats
				.filter((s) => s.isDirectory())
				.map((s) => s.name)

			for (const archivo of archivos) {
				const rutaAbsoluta = path.resolve(ruta, archivo)

				if (args.verboso) {
					consola.info(`Compilando ${rutaAbsoluta}`)
				}

				const contenido = await readFile(rutaAbsoluta, {
					encoding: 'utf-8',
				})

				try {
					const js = compile(contenido, {
						compiler: 'essucrase',
						from: args.desde || 'esjs',
						to: args.hacia || 'js',
					})

					const extensionDesde = `.${args.desde}`
					const extensionHacia = `.${args.hacia}`
					const archivoDestino = rutaAbsoluta.replace(
						new RegExp(`${extensionDesde}$`),
						extensionHacia,
					)

					await writeFile(
						archivoDestino,
						js,
						{
							encoding: 'utf-8',
						},
					)
				} catch (err) {
					consola.error(err)
				}
			}

			if (args.recursivo) {
				for (const directorio of directorios) {
					await compilar(path.resolve(ruta, directorio))
				}
			}
		}

		await compilar(args.ruta)
	},
})
