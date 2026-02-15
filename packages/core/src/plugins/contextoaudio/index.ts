import {
  replaceExpressionMethods,
  replaceObjects,
  replaceObjectProperties,
  replaceInstanceof,
} from '../utils'

export const report = () => 'Converts contextoaudio to audiocontext'

export const properties = new Map<string, string>([
  ['latenciaBase', 'baseLatency'],
  ['latenciaSalida', 'outputLatency'],
  ['idDeSalida', 'sinkId'],
])

export const objects = new Map<string, string>([
  ['ContextoAudio', 'AudioContext'],
])

export const methods = new Map<string, string>([
  ['cerrar', 'close'],
  ['crearFuenteElementoDeMedios', 'createMediaElementSource'],
  ['crearFuenteFlujoDeMedio', 'createMediaStreamSource'],
  ['crearDestinoFlujoDeMedios', 'createMediaStreamDestination'],
  ['crearFuentePistaFlujoDeMedios', 'createMediaStreamTrackSource'],
  ['obtenerMarcaTiempoDeSalida', 'getOutputTimestamp'],
  ['resumir', 'resume'],
  ['establecerIdDeSalida', 'setSinkId'],
  ['suspender', 'suspend'],
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
      from: 'ContextoAudio',
      to: 'AudioContext',
    }),
    ...replaceObjects({
      objects,
    }),
  }
}
