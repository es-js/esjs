#!/usr/bin/env node

import { defineCommand } from 'citty'
import { resolveSubCommand, runMain, showUsage } from './utils/utils.mjs'

export const main = defineCommand({
	meta: {
		name: 'es.js',
		description: 'CLI para el lenguaje de programación EsJS',
	},
	subCommands: {
		ayuda: () => import('./commands/ayuda.mjs').then((r) => r.default),
		ejecutar: () => import('./commands/ejecutar.mjs').then((r) => r.default),
		repl: () => import('./commands/repl.mjs').then((r) => r.default),
		compilar: () => import('./commands/compilar.mjs').then((r) => r.default),
	},
	async run(options) {
		const rawArgs = options.rawArgs || process.argv.slice(2)

		try {
			if (rawArgs.includes('--ayuda') || rawArgs.includes('-a')) {
				await showUsage(...(await resolveSubCommand(this, rawArgs)))
				process.exit(0)
			}
		} catch (e) {
			console.error(e)
			process.exit(1)
		}
	},
})

runMain(main)
