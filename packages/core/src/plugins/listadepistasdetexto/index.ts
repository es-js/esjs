import {
  replaceExpressionMethods,
  replaceObjects,
  replaceObjectProperties,
  replaceInstanceof,
} from '../utils'

export const report = () => 'Converts listadepistasdetexto to texttracklist'

export const properties = new Map<string, string>([['longitud', 'length']])

export const objects = new Map<string, string>([
  ['ListaDePistasDeTexto', 'TextTrackList'],
])

export const methods = new Map<string, string>([
  ['obtenerPistaPorId', 'getTrackById'],
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
      from: 'ListaDePistasDeTexto',
      to: 'TextTrackList',
    }),
    ...replaceObjects({
      objects,
    }),
  }
}
