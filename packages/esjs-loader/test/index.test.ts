import { spawnSync } from 'child_process'
import { execPath } from 'process'
import { fileURLToPath } from 'url'
import { describe, expect, it } from 'vitest'

describe('esjs-loader', () => {
	it('can load .esjs files', async () => {
		const loader = fileURLToPath(new URL('../dist/index.mjs', import.meta.url))
		const fixture = fileURLToPath(
			new URL('../fixtures/test.esjs', import.meta.url),
		)

		const { status, stderr, stdout } = spawnSync(
			execPath,
			['--experimental-loader', loader, fixture],
			{ encoding: 'utf8' },
		)

		console.error(stderr)

		expect(status).toBe(0)
		expect(stdout).toBe('Hola desde EsJS\n')
	})
})
