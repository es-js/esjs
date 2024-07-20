import logSymbols from 'log-symbols'
import { isBrowser } from 'browser-or-node'
import { isEqual } from './isEqual'

let afirmaciones = 0

interface Resultado {
  numeroPruebas: number
  exitosas: number
  fallidas: number
  sinAfirmaciones: number
}

interface Prueba {
  [pruebaNombre: string]: () => void
}

interface PruebaAsincrona {
  [pruebaNombre: string]: () => Promise<void>
}

type Pruebas = Prueba | PruebaAsincrona

class PruebaError extends Error {
  constructor(
    public pruebaNombre: string,
    public error: Error,
    public dontWarn = true,
  ) {
    super(error.message)
  }
}

class PruebasError extends Error {
  constructor(public dontWarn = true) {
    super('Se encontraron errores')
  }
}

export function pruebas(pruebas: Pruebas) {
  let failures = 0
  let noAssertions = 0

  for (const [pruebaNombre, pruebaFuncion] of Object.entries(pruebas)) {
    try {
      const { afirmaciones } = prueba(pruebaNombre, pruebaFuncion)

      if (afirmaciones === 0) {
        noAssertions++
      }
    } catch (error: any) {
      failures++
    }
  }

  return onPruebasFinished(pruebas, failures, noAssertions)
}

export async function pruebasAsincronas(pruebas: PruebaAsincrona) {
  let failures = 0
  let noAssertions = 0

  await Promise.all(
    Object.entries(pruebas).map(async ([pruebaNombre, pruebaFuncion]) => {
      try {
        const { afirmaciones } = await pruebaAsincrona(
          pruebaNombre,
          pruebaFuncion,
        )

        if (afirmaciones === 0) {
          noAssertions++
        }
      } catch (error: any) {
        failures++
      }
    }),
  )

  return onPruebasFinished(pruebas, failures, noAssertions)
}

function onPruebasFinished(pruebas: Pruebas, failures = 0, noAssertions = 0) {
  const result: Resultado = obtenerResultado(pruebas, failures, noAssertions)

  // eslint-disable-next-line no-console
  console.log(obtenerResumen(result))

  if (isBrowser && window) {
    const event = new CustomEvent('esjs-pruebas-finished', {
      detail: {
        result,
      },
    })

    window.dispatchEvent(event)
  }

  if (failures > 0) {
    throw new PruebasError()
  }

  return result
}

export function prueba(
  pruebaNombre: string,
  pruebaFuncion: () => void,
): { afirmaciones: number } {
  afirmaciones = 0

  try {
    pruebaFuncion()

    return onPruebaSuccess(pruebaNombre, afirmaciones)
  } catch (error: any) {
    onPruebaError(pruebaNombre, error)

    return { afirmaciones: 0 }
  }
}

export async function pruebaAsincrona(
  pruebaNombre: string,
  pruebaFuncion: () => Promise<void>,
): Promise<{ afirmaciones: number }> {
  afirmaciones = 0

  try {
    await pruebaFuncion()

    return onPruebaSuccess(pruebaNombre, afirmaciones)
  } catch (error: any) {
    onPruebaError(pruebaNombre, error)

    return { afirmaciones: 0 }
  }
}

function onPruebaSuccess(pruebaNombre: string, afirmaciones = 0) {
  if (afirmaciones > 0) {
    const assertionsString =
      afirmaciones === 1 ? '1 afirmación' : `${afirmaciones} afirmaciones`

    // eslint-disable-next-line no-console
    console.log(
      `%c${logSymbols.success} ${pruebaNombre}: ${assertionsString}`,
      'color: #14b8a6; font-size: 14px; padding: 2px 4px;',
    )

    if (isBrowser && window) {
      const event = new CustomEvent('esjs-prueba-success', {
        detail: {
          pruebaNombre,
          afirmaciones,
        },
      })

      window.dispatchEvent(event)
    }
  } else {
    // eslint-disable-next-line no-console
    console.log(
      `%c${logSymbols.warning} ${pruebaNombre}: No se ejecutó ninguna afirmación`,
      'color: #f59e0b; font-size: 14px; padding: 2px 4px;',
    )
  }

  return {
    afirmaciones,
  }
}

function onPruebaError(pruebaNombre: string, error: any) {
  // eslint-disable-next-line no-console
  console.groupCollapsed(
    `%c${logSymbols.error} ${pruebaNombre}`,
    'color: #f43f5e; font-size: 14px; padding: 2px 4px;',
  )
  console.error(error?.stack)
  // eslint-disable-next-line no-console
  console.groupEnd()

  if (window) {
    const event = new CustomEvent('esjs-prueba-error', {
      detail: {
        pruebaNombre,
        error,
      },
    })

    window.dispatchEvent(event)
  }

  throw new PruebaError(pruebaNombre, error)
}

export function obtenerResumen(result: Resultado) {
  const executedTestsString =
    result.numeroPruebas === 1
      ? 'Se ejecutó 1 prueba'
      : `Se ejecutaron ${result.numeroPruebas} pruebas`
  const numberOfSuccessesString =
    result.exitosas === 1 ? '1 exitosa' : `${result.exitosas} exitosas`
  const numberOfFailuresString =
    result.fallidas === 1 ? '1 fallida' : `${result.fallidas} fallidas`
  const noAssertionsString = `${result.sinAfirmaciones} sin afirmaciones`

  return `${executedTestsString}: \n ${numberOfSuccessesString} \n ${numberOfFailuresString} \n ${noAssertionsString}`
}

export function obtenerResultado(
  pruebas: Pruebas,
  fallidas: number,
  sinAfirmaciones: number,
) {
  const numeroPruebas = Object.keys(pruebas).length
  const exitosas = numeroPruebas - fallidas - sinAfirmaciones

  return {
    numeroPruebas,
    exitosas,
    fallidas,
    sinAfirmaciones,
  } as Resultado
}

export function afirmar(valor: boolean, mensaje?: string) {
  afirmaciones += 1

  if (!valor) {
    throw new Error(
      mensaje ?? 'afirmar(): Se esperaba "verdadero", pero se recibió "falso"',
    )
  }
}

export const assert = afirmar

export function afirmarIguales(esperado: any, actual: any, mensaje?: string) {
  return afirmar(
    isEqual(esperado, actual, true),
    mensaje ?? `afirmarIguales(): "${esperado}" !== "${actual}"`,
  )
}

export function afirmarSimilares(esperado: any, actual: any, mensaje?: string) {
  return afirmar(
    // biome-ignore lint/suspicious/noDoubleEquals: afirmarSimilares() es para comparar valores de diferentes tipos
    esperado == actual,
    mensaje ?? `afirmarSimilares(): "${esperado}" != "${actual}"`,
  )
}

export function afirmarMatricesIguales(
  matrizEsperada: Array<any>,
  matrizActual: Array<any>,
) {
  return afirmarIguales(
    matrizEsperada,
    matrizActual,
    `afirmarMatricesIguales(): "${matrizEsperada}" != "${matrizActual}"`,
  )
}

export function afirmarObjetosIguales(objetoEsperado: any, objetoActual: any) {
  return afirmarIguales(
    objetoEsperado,
    objetoActual,
    `afirmarObjetosIguales(): "${objetoEsperado}" != "${objetoActual}"`,
  )
}

export function afirmarMatricesSimilares(
  matrizEsperada: Array<any>,
  matrizActual: Array<any>,
  mensaje?: string,
) {
  return afirmar(
    isEqual(matrizEsperada, matrizActual, false),
    mensaje ??
      `afirmarMatricesSimilares(): "${matrizEsperada}" != "${matrizActual}"`,
  )
}

export function afirmarObjetosSimilares(
  objetoEsperado: any,
  objetoActual: any,
  mensaje?: string,
) {
  return afirmar(
    isEqual(objetoEsperado, objetoActual, false),
    mensaje ??
      `afirmarObjetosSimilares(): "${objetoEsperado}" != "${objetoActual}"`,
  )
}

export function afirmarVerdadero(valor: boolean, mensaje?: string) {
  return afirmarIguales(
    true,
    valor,
    mensaje ??
      'afirmarVerdadero(): Se esperaba "verdadero", pero se recibió "falso"',
  )
}

export function afirmarFalso(valor: boolean, mensaje?: string) {
  return afirmarIguales(
    false,
    valor,
    mensaje ??
      'afirmarFalso(): Se esperaba "falso", pero se recibió "verdadero"',
  )
}

export function afirmarDistinto(esperado: any, actual: any, mensaje?: string) {
  return afirmar(
    !isEqual(esperado, actual, true),
    mensaje ?? `afirmarDistinto(): "${esperado}" === "${actual}"`,
  )
}
