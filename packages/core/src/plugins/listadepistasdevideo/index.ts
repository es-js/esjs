import {
  replaceExpressionMethods,
  replaceObjects,
  replaceObjectProperties,
  replaceInstanceof,
} from '../utils'

export const report = () => 'Converts listadepistasdevideo to videotracklist'

export const properties = new Map<string, string>([
  ['longitud', 'length'],
  ['indiceSeleccionado', 'selectedIndex'],
])

export const objects = new Map<string, string>([
  ['ListaDePistasDeVideo', 'VideoTrackList'],
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
      from: 'ListaDePistasDeVideo',
      to: 'VideoTrackList',
    }),
    ...replaceObjects({
      objects,
    }),
  }
}
