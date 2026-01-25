import {
  replaceObjects,
  replaceObjectProperties,
  replaceInstanceof,
} from '../utils'

export const report = () =>
  'Converts procesadortrabajodeaudio to audioworkletprocessor'

export const properties = new Map<string, string>([['puerto', 'port']])

export const objects = new Map<string, string>([
  ['ProcesadorTrabajoDeAudio', 'AudioWorkletProcessor'],
])

export function replace() {
  return {
    ...replaceObjectProperties({
      properties,
    }),
    ...replaceInstanceof({
      from: 'ProcesadorTrabajoDeAudio',
      to: 'AudioWorkletProcessor',
    }),
    ...replaceObjects({
      objects,
    }),
  }
}
