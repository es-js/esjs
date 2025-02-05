import {
  replaceExpressionMethods,
  replaceInstanceof,
  replaceObjectProperties,
  replaceObjects,
  replaceObjectStaticMethods,
  replaceObjectStaticProperties,
} from '../utils'

export const report = () => 'Converts Simbolo methods to JavaScript'

export const methods = new Map<string, string>([
  ['valorDe', 'valueOf'],
  ['aPrimitivo', 'toPrimitive'],
])

export const properties = new Map<string, string>([
  ['descripcion', 'description'],
  ['aCadenaEtiqueta', 'toStringTag'],
])

export const staticProperties = new Map<string, string>([
  ['iteradorAsincrono', 'asyncIterator'],
  ['tieneInstancia', 'hasInstance'],
  ['esConcatenableExtendido', 'isConcatSpreadable'],
  ['iterador', 'iterator'],
  ['coincidir', 'match'],
  ['coincidirTodo', 'matchAll'],
  ['reemplazar', 'replace'],
  ['buscarRegex', 'search'],
  ['derivados', 'species'],
  ['dividir', 'split'],
  ['aPrimitivo', 'toPrimitive'],
  ['aCadenaEtiqueta', 'toStringTag'],
  ['excluibles', 'unscopables'],
])

export const staticMethods = new Map<string, string>([
  ['para', 'for'],
  ['paraLlave', 'keyFor'],
])

export const objects = new Map<string, string>([['Simbolo', 'Symbol']])

export function replace() {
  return {
    ...replaceObjectStaticMethods({
      from: 'Simbolo',
      to: 'Symbol',
      methods: staticMethods,
    }),
    ...replaceExpressionMethods({
      methods,
    }),
    ...replaceObjectProperties({
      properties,
    }),
    ...replaceInstanceof({
      from: 'Simbolo',
      to: 'Symbol',
    }),
    ...replaceObjects({
      objects,
    }),
    ...replaceObjectStaticProperties({
      from: 'Simbolo',
      to: 'Symbol',
      properties: staticProperties,
    }),
  }
}
