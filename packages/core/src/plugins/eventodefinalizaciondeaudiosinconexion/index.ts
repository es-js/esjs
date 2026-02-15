import {
  replaceObjects,
  replaceObjectProperties,
  replaceInstanceof,
} from '../utils'

export const report = () =>
  'Converts eventodefinalizaciondeaudiosinconexion to offlineaudiocompletionevent'

export const properties = new Map<string, string>([
  ['bufferRenderizado', 'renderedBuffer'],
])

export const objects = new Map<string, string>([
  ['EventoDeFinalizacionDeAudioSinConexion', 'OfflineAudioCompletionEvent'],
])

export function replace() {
  return {
    ...replaceObjectProperties({
      properties,
    }),
    ...replaceInstanceof({
      from: 'EventoDeFinalizacionDeAudioSinConexion',
      to: 'OfflineAudioCompletionEvent',
    }),
    ...replaceObjects({
      objects,
    }),
  }
}
