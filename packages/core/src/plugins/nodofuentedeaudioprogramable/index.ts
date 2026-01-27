import {
  replaceExpressionMethods,
  replaceObjects,
  replaceInstanceof,
} from '../utils'

export const report = () =>
  'Converts nodofuentedeaudioprogramable to audioscheduledsourcenode'

export const objects = new Map<string, string>([
  ['NodoFuenteDeAudioProgramable', 'AudioScheduledSourceNode'],
])

export const methods = new Map<string, string>([
  ['empezar', 'start'],
  ['detener', 'stop'],
])

export function replace() {
  return {
    ...replaceExpressionMethods({
      methods,
    }),
    ...replaceInstanceof({
      from: 'NodoFuenteDeAudioProgramable',
      to: 'AudioScheduledSourceNode',
    }),
    ...replaceObjects({
      objects,
    }),
  }
}
