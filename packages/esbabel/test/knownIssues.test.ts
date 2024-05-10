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

	it('compiles var/global to var', () => {
		const esjs = `
    var x = 1
    global y = 2
`

		const js = `
    var x = 1
    var y = 2
`

		const compiled = compile(esjs)

		expect(compiled).toEqual(js)

		expect(compile(js, true)).toEqual(`
    var x = 1
    var y = 2
`)
	})
})
