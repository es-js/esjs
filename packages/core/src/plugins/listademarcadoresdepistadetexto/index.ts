import {
  replaceExpressionMethods,
  replaceObjects,
  replaceObjectProperties,
  replaceInstanceof,
} from '../utils'

export const report = () =>
  'Converts listademarcadoresdepistadetexto to texttrackcuelist'

export const properties = new Map<string, string>([['longitud', 'length']])

export const objects = new Map<string, string>([
  ['ListaDeMarcadoresDePistaDeTexto', 'TextTrackCueList'],
])

export const methods = new Map<string, string>([
  ['obtenerMarcadorPorId', 'getCueById'],
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
      from: 'ListaDeMarcadoresDePistaDeTexto',
      to: 'TextTrackCueList',
    }),
    ...replaceObjects({
      objects,
    }),
  }
}
