import logSymbols from 'log-symbols'
import { isEqual } from './isEqual'

interface Resultado {
  numeroPruebas: number
  exitosas: number
  fallidas: number
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

export function pruebas(pruebas: any) {
  let failures = 0

  for (const pruebaNombre in pruebas) {
    const pruebaFuncion = pruebas[pruebaNombre]

    try {
      prueba(pruebaNombre, pruebaFuncion)
    }
    catch (e) {
      failures++
    }
  }

  const result = obtenerResultado(pruebas, failures)

  // eslint-disable-next-line no-console
  console.log(obtenerResumen(result))

  if (failures > 0)
    throw new PruebasError()

  return result
}

export function prueba(pruebaNombre: string, pruebaFuncion: () => void) {
  try {
    pruebaFuncion()

    // eslint-disable-next-line no-console
    console.log(`%c${logSymbols.success} ${pruebaNombre}`, 'color: #14b8a6; font-size: 14px; padding: 2px 4px;')
  }
  catch (error: any) {
    // eslint-disable-next-line no-console
    console.groupCollapsed(`%c${logSymbols.error} ${pruebaNombre}`, 'color: #f43f5e; font-size: 14px; padding: 2px 4px;')
    console.error(error?.stack)
    // eslint-disable-next-line no-console
    console.groupEnd()

    throw new PruebaError(pruebaNombre, error)
  }
}

export function afirmar(valor: boolean, mensaje?: string) {
  if (!valor) {
    mensaje = mensaje ?? 'afirmar(): Se esperaba "verdadero", pero se recibió "falso"'
    throw new Error(mensaje)
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

export function obtenerResumen(result: Resultado) {
  const executedTestsString = result.numeroPruebas === 1 ? 'Se ejecutó 1 prueba' : `Se ejecutaron ${result.numeroPruebas} pruebas`
  const numberOfSuccessesString = result.exitosas === 1 ? '1 exitosa' : `${result.exitosas} exitosas`
  const numberOfFailuresString = result.fallidas === 1 ? '1 fallida' : `${result.fallidas} fallidas`

  return `${executedTestsString}: \n ${numberOfSuccessesString} \n ${numberOfFailuresString}`
}

export function obtenerResultado(pruebas: any, fallidas: number): Resultado {
  const numeroPruebas = Object.keys(pruebas).length
  const exitosas = numeroPruebas - fallidas

  return {
    numeroPruebas,
    exitosas,
    fallidas,
  } as Resultado
}

export function afirmarVerdadero(valor: boolean, mensaje?: string) {
  return afirmarIguales(true, valor, mensaje ?? 'afirmarVerdadero(): Se esperaba "verdadero", pero se recibió "falso"')
}

export function afirmarFalso(valor: boolean, mensaje?: string) {
  return afirmarIguales(false, valor, mensaje ?? 'afirmarFalso(): Se esperaba "falso", pero se recibió "verdadero"')
}

export function afirmarDistinto(esperado: any, actual: any, mensaje?: string) {
  return afirmar(!isEqual(esperado, actual, true), mensaje ?? `afirmarDistinto(): "${esperado}" === "${actual}"`)
}
