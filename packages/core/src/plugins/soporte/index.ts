import { replaceKeywords } from '../utils';

export const report = () => 'Converts support functions to JavaScript'

export const keywords = new Map<string, string>([
  ['establecerTemporizador', 'setTimeout'],
  ['establecerIntervalo', 'setInterval'],
  ['esNuN', 'isNaN'],
  ['limpiarTemporizador', 'clearTimeout'],
  ['limpiarIntervalo', 'clearInterval'],
  ['alerta', "alert"],
  ['preguntar', 'prompt'],
  ['confirmar', 'confirm'],
  ['consultar', 'fetch'],
  ['decodificarURI', 'decodeURI'],
  ['decodificarComponenteURI', 'decodeURIComponent'],
  ['codificarURI', 'encodeURI'],
  ['codificarComponenteURI', 'encodeURIComponent'],
])

export function replace() {
  return {
    ...replaceKeywords({
      keywords,
    }),
  }
}
