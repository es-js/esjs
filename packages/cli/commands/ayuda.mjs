#!/usr/bin/env node

import { defineCommand } from 'citty'
import { showUsage } from '../utils/utils.mjs'

export default defineCommand({
	meta: {
		name: 'ayuda',
		description: 'Muestra la ayuda del CLI.',
	},

	async run() {
		await showUsage(await import('../index.js').then((r) => r.main))
	},
})
