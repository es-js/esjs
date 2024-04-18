import { replaceInstanceof, replaceObjectMethods, replaceObjects } from '../utils'

export const report = () => 'Converts Numero methods to JavaScript'

export const methods = new Map<string, string>([
  ['esFinito', 'isFinite'],
  ['esEntero', 'isInteger'],
  ['esEnteroSeguro', 'isSafeInteger'],
  ['interpretarDecimal', 'parseFloat'],
  ['interpretarEntero', 'parseInt'],
  ['aExponencial', 'toExponential'],
  ['fijarDecimales', 'toFixed'],
  ['aCadenaLocalizada', 'toLocaleString'],
  ['aPrecision', 'toPrecision'],
  ['aCadena', 'toString'],
  ['valorDe', 'valueOf'],
])

export const objects = new Map<string, string>([
  ['Número', 'Number'],
  ['Numero', 'Number'],
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
      from: 'Numero',
      to: 'Number',
    }),
  }
}
