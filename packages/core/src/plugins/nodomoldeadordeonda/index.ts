import {
  replaceObjects,
  replaceObjectProperties,
  replaceInstanceof,
} from '../utils'

export const report = () => 'Converts nodomoldeadordeonda to waveshapernode'

export const properties = new Map<string, string>([
  ['curva', 'curve'],
  ['sobremuestreo', 'oversample'],
])

export const objects = new Map<string, string>([
  ['NodoMoldeadorDeOnda', 'WaveShaperNode'],
])

export function replace() {
  return {
    ...replaceObjectProperties({
      properties,
    }),
    ...replaceInstanceof({
      from: 'NodoMoldeadorDeOnda',
      to: 'WaveShaperNode',
    }),
    ...replaceObjects({
      objects,
    }),
  }
}
