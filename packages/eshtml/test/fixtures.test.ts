import { readFileSync } from 'fs'
import { join, resolve } from 'path'
import { beforeEach, describe, expect, it } from 'vitest'
import { compile } from '../src'
import { compareDoms } from '../src/utils/compareDoms'
import { minifyHtml } from './testUtils'

const eshtmlFixtures = import.meta.glob('./fixtures/*.eshtml')
const htmlFixtures = import.meta.glob('./fixtures/*.html')

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

			expect(minifyHtml(compiled)).toBe(minifyHtml(htmlCode))

			expect(compareDoms(compiled, htmlCode)).toBe(true)
		}
	})

	it('html to eshtml', async () => {
		const htmlFixtureKeys = Object.keys(htmlFixtures)
		expect(htmlFixtureKeys.length).toBeGreaterThan(0)

		for (const key of htmlFixtureKeys) {
			const htmlCode = readFileSync(resolve(join(__dirname, key)), 'utf-8')
			const eshtmlCode = readFileSync(
				resolve(join(__dirname, key.replace('.html', '.eshtml'))),
				'utf-8',
			)

			const compiled = compile(htmlCode, { from: 'html', to: 'eshtml' })

			expect(minifyHtml(compiled)).toBe(minifyHtml(eshtmlCode))

			expect(compareDoms(compiled, eshtmlCode)).toBe(true)
		}
	})
})
