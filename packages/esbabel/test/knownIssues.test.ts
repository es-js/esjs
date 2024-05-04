import { describe, expect, it } from 'vitest'
import { compile } from '../src'

describe('known issues', () => {
	it('compiles variables named `escribir`', () => {
		const esjs = `
    const escribir = 'prueba'
`

		const js = `
    const log = 'prueba'
`

		const compiled = compile(esjs)

		expect(compiled).toEqual(js)

		expect(compile(js, true)).toEqual(esjs)
	})

	it('fixed: does not compile variables named `get`', () => {
		const esjs = `
    var get = 'prueba'
`

		const js = `
    let get = 'prueba'
`

		const compiled = compile(esjs)

		expect(compiled).toEqual(js)

		expect(compile(js, true)).toEqual(esjs)
	})
})
