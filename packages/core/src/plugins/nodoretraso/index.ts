import {
  replaceObjects,
  replaceObjectProperties,
  replaceInstanceof,
} from '../utils'

export const report = () => 'Converts nodoretraso to delaynode'

export const properties = new Map<string, string>([
  ['tiempoDeRetraso', 'delayTime'],
])

export const objects = new Map<string, string>([['NodoRetraso', 'DelayNode']])

export function replace() {
  return {
    ...replaceObjectProperties({
      properties,
    }),
    ...replaceInstanceof({
      from: 'NodoRetraso',
      to: 'DelayNode',
    }),
    ...replaceObjects({
      objects,
    }),
  }
}
