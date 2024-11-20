import {
    replaceExpressionMethods,
    replaceInstanceof,
    replaceObjectProperties,
    replaceObjectStaticProperties,
    replaceObjectStaticMethods,
    replaceObjects,
  } from '../utils'
  
  export const report = () => 'Converts Simbolo methods to JavaScript'
  
  export const methods = new Map<string, string>([
    ['aCadena', 'toString'],
    ['valorDe', 'valueOf'],
    ['esPrimitivo', 'toPrimitive']
  ])

  export const properties = new Map<string, string>([
    ['descripcion', 'description'],
    ['etiquetaCadena', 'toStringTag']
  ])

  export const staticProperties = new Map<string, string>([
    ['iteradorAsincrono', 'asyncIterator'],
    ['tieneInstancia', 'hasInstance'],
    ['esConcatExtendible', 'isConcatSpreadable'],
    ['iterador', 'iterator'],
    ['coincidir', 'match'],
    ['coincidirTodo', 'matchAll'],
    ['reemplazar', 'replace'],
    ['buscarRegex', 'search'],
    ['derivados', 'species'],
    ['dividir', 'split'],
    ['aPrimitivo', 'toPrimitive'],
    ['aCadena', 'toStringTag'],
    ['imposibleDescifrar', 'unscopables']
  ])

  export const staticMethods = new Map<string, string>([
    ['para', 'for'],
    ['paraLlave', 'keyFor']
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
      ...replaceObjectStaticProperties({
        from: 'Simbolo',
        to: 'Symbol',
        properties: staticProperties,
      }),
      ...replaceInstanceof({
        from: 'Simbolo',
        to: 'Symbol',
      }),
      ...replaceObjects({
        objects,
      }),
    }
  }
  