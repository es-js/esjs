import {
  replaceExpressionMethods,
  replaceObjects,
  replaceObjectProperties,
} from '../utils'

export const report = () => 'Converts audio to audio'

export const properties = new Map<string, string>([
  ['bucle', 'loop'],
  ['controles', 'controls'],
  ['listaControles', 'controlsList'],
  ['deshabilitarReproduccionRemota', 'disableRemotePlayback'],
  ['silenciado', 'muted'],
  ['precarga', 'preload'],
])

export const objects = new Map<string, string>([['Audio', 'Audio']])

export const methods = new Map<string, string>([
  ['reproducir', 'play'],
  ['pausar', 'pause'],
])

export function replace() {
  return {
    ...replaceExpressionMethods({
      methods,
    }),
    ...replaceObjectProperties({
      properties,
    }),
    ...replaceObjects({
      objects,
    }),
  }
}
