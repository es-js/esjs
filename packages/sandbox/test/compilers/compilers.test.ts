import { describe, expect, it } from 'vitest'
import { compileCode } from '../../src/compiler'
import putout from 'putout'

const esjsCode = `funcion prueba() {
  retornar {
    hola: 'Hola, mundo!',
    desde: 'EsJS',
  };
}`

describe('compilers', () => {
  it('can compile code with EsSucrase', async () => {
    const compiled = compileCode(esjsCode, {
      compiler: 'essucrase',
      putout,
    })

    expect(compiled).toBe(`function prueba() {
  return {
    hola: 'Hola, mundo!',
    desde: 'EsJS',
  };
}`)
  })

  it('can compile code with EsBabel', () => {
    const compiled = compileCode(esjsCode, {
      compiler: 'esbabel',
    })

    expect(compiled).toBe(`function prueba() {
  return {
    hola: 'Hola, mundo!',
    from: 'EsJS',
  };
}`)
  })
})
