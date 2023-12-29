import { describe, expect, it } from 'vitest'
import { transpile } from '../src/index'

describe('known issues', () => {
  it('transpiles variables named `escribir`', () => {
    const esjs = `
    const escribir = 'prueba'
`

    const js = `
    const log = 'prueba'
`

    const transpiled = transpile(esjs)

    expect(transpiled).toEqual(js)

    expect(transpile(js, true)).toEqual(esjs)
  })

  it('fixed: does not transpile variables named `get`', () => {
    const esjs = `
    var get = 'prueba'
`

    const js = `
    let get = 'prueba'
`

    const transpiled = transpile(esjs)

    expect(transpiled).toEqual(js)

    expect(transpile(js, true)).toEqual(esjs)
  })
})
