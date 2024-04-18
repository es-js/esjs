import { replaceInstanceof, replaceObjectMethods, replaceObjects } from '../utils'

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
  ['ahora', 'now'],
  ['analizar', 'parse'],
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
  ['UTC', 'UTC'],
  ['valorDe', 'valueOf'],
])

export const objects = new Map<string, string>([
  ['Fecha', 'Date'],
])

export const replace = () => {
  return {
    ...replaceObjects({
      objects,
    }),
    ...replaceObjectMethods({
      methods,
    }),
    ...replaceInstanceof({
      from: 'Fecha',
      to: 'Date',
    }),
  }
}
