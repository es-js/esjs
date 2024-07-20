import { replaceObjectStaticMethods } from '../utils'

export const report = () => 'Converts consola to console'

export const methods = new Map<string, string>([
  ['afirmar', 'assert'],
  ['limpiar', 'clear'],
  ['contar', 'count'],
  ['reiniciarContador', 'countReset'],
  ['depurar', 'debug'],
  ['listar', 'dir'],
  ['listarXml', 'dirxml'],
  ['error', 'error'],
  ['agrupar', 'group'],
  ['agruparColapsado', 'groupCollapsed'],
  ['finalizarAgrupacion', 'groupEnd'],
  ['info', 'info'],
  ['escribir', 'log'],
  ['perfil', 'profile'],
  ['finalizarPerfil', 'profileEnd'],
  ['tabla', 'table'],
  ['tiempo', 'time'],
  ['finalizarTiempo', 'timeEnd'],
  ['registrarTiempo', 'timeLog'],
  ['marcaDeTiempo', 'timeStamp'],
  ['rastrear', 'trace'],
  ['advertencia', 'warn'],
])

export const objects = new Map<string, string>([['consola', 'console']])

export function replace() {
  return {
    ...replaceObjectStaticMethods({
      from: 'consola',
      to: 'console',
      methods,
    }),
  }
}
