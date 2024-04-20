import { replaceExpressionMethods, replaceInstanceof, replaceObjectStaticMethods, replaceObjects } from '../utils'

export const report = () => 'Converts Fecha methods to JavaScript'

export const methods = new Map<string, string>([
  ['obtenerDia', 'getDate'],
  ['obtenerDiaSemana', 'getDay'],
  ['obtenerAnio', 'getFullYear'],
  ['obtenerAño', 'getFullYear'],
  ['obtenerHoras', 'getHours'],
  ['obtenerMilisegundos', 'getMilliseconds'],
  ['obtenerMinutos', 'getMinutes'],
  ['obtenerMes', 'getMonth'],
  ['obtenerSegundos', 'getSeconds'],
  ['obtenerTiempo', 'getTime'],
  ['obtenerDesfaseDeZonaHoraria', 'getTimezoneOffset'],
  ['obtenerDiaUTC', 'getUTCDate'],
  ['obtenerDiaSemanaUTC', 'getUTCDay'],
  ['obtenerAnioUTC', 'getUTCFullYear'],
  ['obtenerAñoUTC', 'getUTCFullYear'],
  ['obtenerHorasUTC', 'getUTCHours'],
  ['obtenerMilisegundosUTC', 'getUTCMilliseconds'],
  ['obtenerMinutosUTC', 'getUTCMinutes'],
  ['obtenerMesUTC', 'getUTCMonth'],
  ['obtenerSegundosUTC', 'getUTCSeconds'],
  ['establecerFecha', 'setDate'],
  ['establecerAnio', 'setFullYear'],
  ['establecerAño', 'setFullYear'],
  ['establecerHoras', 'setHours'],
  ['establecerMilisegundos', 'setMilliseconds'],
  ['establecerMinutos', 'setMinutes'],
  ['establecerMes', 'setMonth'],
  ['establecerSegundos', 'setSeconds'],
  ['establecerTiempo', 'setTime'],
  ['establecerFechaUTC', 'setUTCDate'],
  ['establecerAnioUTC', 'setUTCFullYear'],
  ['establecerAñoUTC', 'setUTCFullYear'],
  ['establecerHorasUTC', 'setUTCHours'],
  ['establecerMilisegundosUTC', 'setUTCMilliseconds'],
  ['establecerMinutosUTC', 'setUTCMinutes'],
  ['establecerMesUTC', 'setUTCMonth'],
  ['establecerSegundosUTC', 'setUTCSeconds'],
  ['aCadenaFecha', 'toDateString'],
  ['aCadenaISO', 'toISOString'],
  ['aJSON', 'toJSON'],
  ['aCadenaFechaLocale', 'toLocaleDateString'],
  ['aCadenaLocale', 'toLocaleString'],
  ['aCadenaTiempoLocale', 'toLocaleTimeString'],
  ['aCadena', 'toString'],
  ['aCadenaTiempo', 'toTimeString'],
  ['aCadenaUTC', 'toUTCString'],
  ['valorDe', 'valueOf'],
])

export const staticMethods = new Map<string, string>([
  ['ahora', 'now'],
  ['analizar', 'parse'],
  ['UTC', 'UTC'],
])

export const objects = new Map<string, string>([
  ['Fecha', 'Date'],
])

export function replace() {
  return {
    ...replaceObjectStaticMethods({
      from: 'Fecha',
      to: 'Date',
      methods: staticMethods,
    }),
    ...replaceExpressionMethods({
      methods,
    }),
    ...replaceInstanceof({
      from: 'Fecha',
      to: 'Date',
    }),
    ...replaceObjects({
      objects,
    }),
  }
}
