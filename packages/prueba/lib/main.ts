import { isEqual } from './isEqual'

interface Prueba {
  [key: string]: () => void
}

class PruebaError extends Error {
  constructor(public pruebaNombre: string, public error: Error, public dontWarn = true) {
    super(error.message)
  }
}

class PruebasError extends Error {
  constructor(public dontWarn = true) {
    super('Se encontraron errores')
  }
}

export function pruebas(tests: any) {
  let failures = 0

  for (const pruebaNombre in tests) {
    const pruebaFuncion = tests[pruebaNombre]

    try {
      prueba(pruebaNombre, pruebaFuncion)
    }
    catch (e) {
      failures++
    }
  }

  mostrarResultados(tests, failures)

  if (failures > 0)
    throw new PruebasError()
}

export function prueba(pruebaNombre: string, pruebaFuncion: () => void) {
  try {
    pruebaFuncion()

    // eslint-disable-next-line no-console
    console.log(`%c${pruebaNombre}`, 'color: green;')
  }
  catch (error: any) {
    // eslint-disable-next-line no-console
    console.groupCollapsed(`%c${pruebaNombre}`, 'color: red;')
    console.error(error?.stack)
    // eslint-disable-next-line no-console
    console.groupEnd()

    throw new PruebaError(pruebaNombre, error)
  }
}

export function afirmar(valor: boolean, mensaje?: string) {
  if (!valor) {
    mensaje = mensaje ?? 'afirmar(): Se esperaba "verdadero", pero se recibió "falso"'
    throw new Error(`afirmar(): ${mensaje}`)
  }
}

export const assert = afirmar

export function afirmarIguales(esperado: any, actual: any, mensaje?: string) {
  return afirmar(isEqual(esperado, actual, true), mensaje ?? `afirmarIguales(): "${esperado}" !== "${actual}"`)
}

export function afirmarSimilares(esperado: any, actual: any, mensaje?: string) {
  // eslint-disable-next-line eqeqeq
  if (esperado != actual) {
    mensaje = mensaje ?? `afirmarSimilares(): "${esperado}" != "${actual}"`
    throw new Error(mensaje)
  }
}

export function afirmarMatricesIguales(matrizEsperada: Array<any>, matrizActual: Array<any>) {
  return afirmarIguales(matrizEsperada, matrizActual, `afirmarMatricesIguales(): "${matrizEsperada}" != "${matrizActual}"`)
}

export function afirmarObjetosIguales(objetoEsperado: any, objetoActual: any) {
  return afirmarIguales(objetoEsperado, objetoActual, `afirmarObjetosIguales(): "${objetoEsperado}" != "${objetoActual}"`)
}

export function afirmarMatricesSimilares(matrizEsperada: Array<any>, matrizActual: Array<any>, mensaje?: string) {
  if (!isEqual(matrizEsperada, matrizActual, false)) {
    mensaje = mensaje ?? `afirmarMatricesSimilares(): "${matrizEsperada}" != "${matrizActual}"`
    throw new Error(mensaje)
  }
}

export function afirmarObjetosSimilares(objetoEsperado: any, objetoActual: any, mensaje?: string) {
  if (!isEqual(objetoEsperado, objetoActual, false)) {
    mensaje = mensaje ?? `afirmarObjetosSimilares(): "${objetoEsperado}" != "${objetoActual}"`
    throw new Error(mensaje)
  }
}

export function mostrarResultados(tests: Prueba[], failures: number) {
  const numberOfTests = Object.keys(tests).length
  const successes = numberOfTests - failures
  const summaryString = `Se ejecutaron ${numberOfTests} pruebas: \n ${successes} exitosas \n ${failures} fallidas`

  // eslint-disable-next-line no-console
  console.log(summaryString)
}
