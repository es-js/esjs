import {
  replaceExpressionMethods,
  replaceObjects,
  replaceObjectProperties,
  replaceInstanceof,
} from '../utils'

export const report = () => 'Converts nodooscilador to oscillatornode'

export const properties = new Map<string, string>([
  ['frecuencia', 'frequency'],
  ['desorientar', 'detune'],
  ['tipo', 'type'],
])

export const objects = new Map<string, string>([
  ['NodoOscilador', 'OscillatorNode'],
])

export const methods = new Map<string, string>([
  ['establecerOndaPeriodica', 'setPeriodicWave'],
])

export function replace() {
  return {
    ...replaceExpressionMethods({
      methods,
    }),
    ...replaceObjectProperties({
      properties,
    }),
    ...replaceInstanceof({
      from: 'NodoOscilador',
      to: 'OscillatorNode',
    }),
    ...replaceObjects({
      objects,
    }),
  }
}
