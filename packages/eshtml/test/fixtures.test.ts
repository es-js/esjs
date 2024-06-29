import { describe, it, expect, beforeEach } from 'vitest'
import { readFileSync } from 'fs'
import { join, resolve } from 'path'
import { compile } from '../src'
import beautify from 'posthtml-beautify'
import { formatWithPrettier } from './testUtils'

const eshtmlFixtures = import.meta.glob('./fixtures/*.eshtml')
const htmlFixtures = import.meta.glob('./fixtures/extras/*.html')

let fixtureKeys: string[] = []

beforeEach(() => {
	fixtureKeys = Object.keys(eshtmlFixtures)
	expect(fixtureKeys.length).toBeGreaterThan(0)
})

describe('fixtures', () => {
	it('eshtml to html', async () => {
		for (const key of fixtureKeys) {
			const eshtmlCode = readFileSync(resolve(join(__dirname, key)), 'utf-8')
			const htmlCode = readFileSync(
				resolve(join(__dirname, key.replace('.eshtml', '.html'))),
				'utf-8',
			)

			const compiled = compile(eshtmlCode)

			expect((await formatWithPrettier(compiled)).trim()).toEqual(
				(await formatWithPrettier(htmlCode)).trim(),
			)
		}
	})
})
