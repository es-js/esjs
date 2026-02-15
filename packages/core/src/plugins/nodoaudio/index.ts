import {
  replaceExpressionMethods,
  replaceObjects,
  replaceObjectProperties,
  replaceInstanceof,
} from '../utils'

export const report = () => 'Converts nodoaudio to audionode'

export const properties = new Map<string, string>([
  ['contexto', 'context'],
  ['numeroDeEntradas', 'numberOfInputs'],
  ['numeroDeSalidas', 'numberOfOutputs'],
  ['conteoDeCanales', 'channelCount'],
  ['modoConteoDeCanales', 'channelCountMode'],
  ['interpretacionCanal', 'channelInterpretation'],
])

export const objects = new Map<string, string>([['NodoAudio', 'AudioNode']])

export const methods = new Map<string, string>([
  ['conectar', 'connect'],
  ['desconectar', 'disconnect'],
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
      from: 'NodoAudio',
      to: 'AudioNode',
    }),
    ...replaceObjects({
      objects,
    }),
  }
}
