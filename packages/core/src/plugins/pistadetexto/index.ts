import {
  replaceExpressionMethods,
  replaceObjects,
  replaceObjectProperties,
  replaceInstanceof,
} from '../utils'

export const report = () => 'Converts pistadetexto to texttrack'

export const properties = new Map<string, string>([
  ['marcadoresActivos', 'activeCues'],
  ['marcadores', 'cues'],
  ['tipoDeEnvioDePistaDeMetadatosEnBanda', 'inBandMetadataTrackDispatchType'],
  ['id', 'id'],
  ['clase', 'kind'],
  ['etiqueta', 'label'],
  ['idioma', 'language'],
  ['modo', 'mode'],
  ['bufferDeFuente', 'sourceBuffer'],
])

export const objects = new Map<string, string>([['PistaDeTexto', 'TextTrack']])

export const methods = new Map<string, string>([
  ['agregarMarcador', 'addCue'],
  ['eliminarMarcador', 'removeCue'],
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
      from: 'PistaDeTexto',
      to: 'TextTrack',
    }),
    ...replaceObjects({
      objects,
    }),
  }
}
