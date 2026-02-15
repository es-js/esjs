import {
  replaceObjects,
  replaceObjectProperties,
  replaceInstanceof,
} from '../utils'

export const report = () =>
  'Converts nodocompresordinamico to dynamicscompressornode'

export const properties = new Map<string, string>([
  ['umbral', 'threshold'],
  ['rodilla', 'knee'],
  ['relacion', 'ratio'],
  ['reduccion', 'reduction'],
  ['ataque', 'attack'],
  ['liberacion', 'release'],
])

export const objects = new Map<string, string>([
  ['NodoCompresorDinamico', 'DynamicsCompressorNode'],
])

export function replace() {
  return {
    ...replaceObjectProperties({
      properties,
    }),
    ...replaceInstanceof({
      from: 'NodoCompresorDinamico',
      to: 'DynamicsCompressorNode',
    }),
    ...replaceObjects({
      objects,
    }),
  }
}
