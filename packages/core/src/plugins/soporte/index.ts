export const report = () => 'Converts support functions to JavaScript'

export const keywords = new Map<string, string>([
  ['establecerTemporizador', 'setTimeout'],
  ['establecerIntervalo', 'setInterval'],
  ['esNuN', 'isNaN'],
  ['importar.meta', 'import.meta'],
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
  // TODO: Add more support functions.
])

export function replace() {
  return {
    ...Object.fromEntries(
      Array.from(keywords).map(([from, to]) => {
        return [
          from,
          () => {
            return to
          },
        ]
      }),
    ),
  }
}
