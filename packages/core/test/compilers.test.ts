import { describe, expect, it } from 'vitest'
import { compile } from '../src/index'
import { EsbabelCompiler } from '../src/compiler/esbabel.compiler'
import { EssucraseCompiler } from '../src/compiler/essucrase.compiler'
import putout from 'putout'

const esjsCode = `funcion prueba() {
  retornar {
    hola: 'Hola, mundo!',
    desde: 'EsJS',
  };
}`

describe('compile', () => {
  it('can compile code with EsSucrase', async () => {
    const compiled = compile(esjsCode, {
      compiler: 'essucrase',
    })

    expect(compiled).toBe(`function prueba() {
  return {
    hola: 'Hola, mundo!',
    desde: 'EsJS',
  };
}`)
  })

  it('can compile code with EsBabel', () => {
    const compiled = compile(esjsCode, {
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

describe('EsbabelCompiler', () => {
  it('can compile code', () => {
    const compiler = new EsbabelCompiler()
    const compiled = compiler.compile(esjsCode, {
      from: 'esjs',
      to: 'js',
    })

    expect(compiled).toBe(`function prueba() {
  return {
    hola: 'Hola, mundo!',
    from: 'EsJS',
  };
}`)
  })
})

describe('EssucraseCompiler', () => {
  it('can compile code', () => {
    const compiler = new EssucraseCompiler(putout)
    const compiled = compiler.compile(esjsCode, {
      from: 'esjs',
      to: 'js',
    })

    expect(compiled).toBe(`function prueba() {
  return {
    hola: 'Hola, mundo!',
    desde: 'EsJS',
  };
}`)
  })
})
