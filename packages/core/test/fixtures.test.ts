import { readFileSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { beforeEach, describe, expect, it } from 'vitest'
import { compile } from '../src'
import { type TestCompileOptions } from './testUtils'

const esjsFixtures = import.meta.glob('./fixtures/keywords/*.esjs')
const esjsFixturesExtras = import.meta.glob('./fixtures/extras/*.esjs')

let fixtureKeys: string[] = []

beforeEach(() => {
	fixtureKeys = Object.keys(esjsFixtures)
	expect(fixtureKeys.length).toBeGreaterThan(0)
})

function readFixture(filepath: string) {
	const esjsCode = readFileSync(resolve(join(__dirname, filepath)), 'utf-8')
	const jsCode = readFileSync(
		resolve(join(__dirname, filepath.replace('.esjs', '.js'))),
		'utf-8',
	)

	return {
		esjsCode,
		jsCode,
	}
}

async function testCompile(
	fixture: string,
	options: TestCompileOptions = {
		reverse: false,
	},
) {
	try {
		const { esjsCode, jsCode } = readFixture(fixture)

		const generated = compile(options.reverse ? jsCode : esjsCode, {
			from: options.reverse ? 'js' : 'esjs',
			to: options.reverse ? 'esjs' : 'js',
			compiler: 'essucrase',
		})

		return {
			generated,
			expected: options.reverse ? esjsCode : jsCode,
		}
	} catch (error) {
		console.error(`Error in ${fixture}`, error)
	}
}

describe('compile esjs -> js', () => {
	it('test fixtures/keywords', async () => {
		for (const key of fixtureKeys) {
			const result = await testCompile(key)

			expect(result.generated).toEqual(result.expected)
		}
	})

	it('test fixtures/extras', async () => {
		for (const key of Object.keys(esjsFixturesExtras)) {
			const result = await testCompile(key)

			expect(result.generated).toEqual(result.expected)
		}
	})
})

describe('compile single', () => {
	const fixture = './fixtures/extras/consola.esjs'

	it('compile single: esjs -> js', async () => {
		const result = await testCompile(fixture)

		expect(result.generated).toEqual(result.expected)
	})

	it('compile single: js -> esjs', async () => {
		const result = await testCompile(fixture, {
			reverse: true,
		})

		expect(result.generated).toEqual(result.expected)
	})
})

describe('compile js -> esjs', () => {
	it('test fixtures/keywords', async () => {
		for (const key of fixtureKeys) {
			const result = await testCompile(key, {
				reverse: true,
			})

			expect(result.generated).toEqual(result.expected)
		}
	})
})
