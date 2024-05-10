#!/usr/bin/env node

import { execSync as exec } from 'node:child_process'
import { defineCommand } from 'citty'
import { consola } from 'consola'

export default defineCommand({
	meta: {
		name: 'crear',
		description: 'Crea un nuevo proyecto EsJS.',
	},

	args: {
		tipo: {
			type: 'positional',
			description: 'Tipo de proyecto a crear',
			required: false,
		},
		nombre: {
			type: 'positional',
			description: 'Nombre del proyecto',
			required: false,
		},
		directorio: {
			type: 'string',
			description: 'Directorio donde se creará el proyecto',
			required: false,
		},
	},

	async run({ args }) {
		const tipo = args.tipo || ''
		const nombre = args.nombre || ''
		const directorio = args.directorio || ''

		const comando = `npx create-esjs@latest ${tipo} ${nombre} ${directorio}`

		try {
			exec(comando, { stdio: 'inherit' })
		} catch (e) {
			consola.error(e)
		}
	},
})
