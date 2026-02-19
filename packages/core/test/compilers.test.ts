import { describe, expect, it } from 'vitest'
import { compile } from '../src/index'
import { EsbabelCompiler } from '../src/compiler/esbabel.compiler'
import { EssucraseCompiler } from '../src/compiler/essucrase.compiler'
import { normalizeJsForCompare } from './testUtils'

const esjsCode = `funcion prueba() {
  retornar {
    hola: 'Hola, mundo!',
    desde: 'EsJS',
  };
}`

const expectedJs = `function prueba() {
  return {
    hola: 'Hola, mundo!',
    desde: 'EsJS',
  };
}`

describe('compile', () => {
  it('can compile code with EsSucrase', async () => {
    const compiled = compile(esjsCode, {
      compiler: 'essucrase',
    })

    expect(await normalizeJsForCompare(compiled)).toBe(
      await normalizeJsForCompare(expectedJs),
    )
  })

  it('can compile code with EsBabel', async () => {
    const compiled = compile(esjsCode, {
      compiler: 'esbabel',
    })

    const expectedEsbabel = `function prueba() {
  return {
    hola: 'Hola, mundo!',
    from: 'EsJS',
  };
}`

    expect(await normalizeJsForCompare(compiled)).toBe(
      await normalizeJsForCompare(expectedEsbabel),
    )
  })
})

describe('EsbabelCompiler', () => {
  it('can compile code', async () => {
    const compiler = new EsbabelCompiler()
    const compiled = compiler.compile(esjsCode, {
      from: 'esjs',
      to: 'js',
    })

    const expectedEsbabel = `function prueba() {
  return {
    hola: 'Hola, mundo!',
    from: 'EsJS',
  };
}`

    expect(await normalizeJsForCompare(compiled)).toBe(
      await normalizeJsForCompare(expectedEsbabel),
    )
  })
})

describe('EssucraseCompiler', () => {
  it('can compile code', async () => {
    const compiler = new EssucraseCompiler()
    const compiled = compiler.compile(esjsCode, {
      from: 'esjs',
      to: 'js',
    })

    expect(await normalizeJsForCompare(compiled)).toBe(
      await normalizeJsForCompare(expectedJs),
    )
  })
})
