#!/usr/bin/env node

import { compile } from '@es-js/core'
import { defineCommand } from 'citty'
import { consola } from 'consola'
import { readFile } from 'node:fs/promises'

export default defineCommand({
	meta: {
		name: 'ejecutar',
		description: 'Ejecuta un archivo (script) de EsJS.',
	},

	args: {
		archivo: {
			type: 'positional',
			description: 'Nombre del archivo (script) a ejecutar.',
			required: true,
		},
	},

	async run({ args }) {
		const contenido = await readFile(args.archivo, {
			encoding: 'utf-8',
		})

		const js = compile(contenido, {
			compiler: 'essucrase',
		})

		try {
			// biome-ignore lint/security/noGlobalEval: This is a CLI tool.
			eval(js)
		} catch (err) {
			consola.error(err)
		}
	},
})
