import {
  replaceExpressionMethods,
  replaceObjects,
  replaceObjectProperties,
  replaceInstanceof,
} from '../utils'

export const report = () => 'Converts nodoanalizador to analysernode'

export const properties = new Map<string, string>([
  ['tamañoFft', 'fftSize'],
  ['cantidadBinesFrecuencia', 'frequencyBinCount'],
  ['constanteTiempoSuavizado', 'smoothingTimeConstant'],
  ['decibeliosMinimos', 'minDecibels'],
  ['decibeliosMaximos', 'maxDecibels'],
])

export const objects = new Map<string, string>([
  ['NodoAnalizador', 'AnalyserNode'],
])

export const methods = new Map<string, string>([
  ['obtenerDatosFlotantesDominioDeTiempo', 'getFloatTimeDomainData'],
  ['obtenerDatosByteDominioDeTiempo', 'getByteTimeDomainData'],
  ['obtenerDatosFlotantesDeFrecuencia', 'getFloatFrequencyData'],
  ['obtenerDatosByteDeFrecuencia', 'getByteFrequencyData'],
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
      from: 'NodoAnalizador',
      to: 'AnalyserNode',
    }),
    ...replaceObjects({
      objects,
    }),
  }
}
