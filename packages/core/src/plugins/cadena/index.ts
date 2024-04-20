import {
  replaceExpressionMethods,
  replaceInstanceof,
  replaceObjectProperties,
  replaceObjectStaticMethods,
  replaceObjects,
} from '../utils'

export const report = () => 'Converts Cadena methods to JavaScript'

export const methods = new Map<string, string>([
  ['enPosicion', 'at'],
  ['caracterEn', 'charAt'],
  ['codigoDeCaracterEn', 'charCodeAt'],
  ['puntoDeCodigoEn', 'codePointAt'],
  ['concatenar', 'concat'],
  ['terminaCon', 'endsWith'],
  ['incluye', 'includes'],
  ['indiceDe', 'indexOf'],
  ['ultimoIndiceDe', 'lastIndexOf'],
  ['compararLocalizada', 'localeCompare'],
  ['coincidir', 'match'],
  ['coincidirTodo', 'matchAll'],
  ['normalizar', 'normalize'],
  ['rellenarAlFinal', 'padEnd'],
  ['rellenarAlComienzo', 'padStart'],
  ['repetir', 'repeat'],
  ['reemplazar', 'replace'],
  ['reemplazarTodo', 'replaceAll'],
  ['buscarRegex', 'search'],
  ['recortar', 'slice'],
  ['dividir', 'split'],
  ['comienzaCon', 'startsWith'],
  ['subcadena', 'substring'],
  ['aMinusculasLocalizada', 'toLocaleLowerCase'],
  ['aMayusculasLocalizada', 'toLocaleUpperCase'],
  ['aMinusculas', 'toLowerCase'],
  ['aMayusculas', 'toUpperCase'],
  ['aCadena', 'toString'],
  ['recortarEspacios', 'trim'],
  ['recortarEspaciosAlFinal', 'trimEnd'],
  ['recortarEspaciosAlComienzo', 'trimStart'],
  ['valorDe', 'valueOf'],
])

export const staticMethods = new Map<string, string>([
  ['desdeCodigoDeCaracter', 'fromCharCode'],
  ['desdePuntoDeCodigo', 'fromCodePoint'],
  ['crudo', 'raw'],
])

export const properties = new Map<string, string>([
  ['longitud', 'length'],
])

export const objects = new Map<string, string>([
  ['Cadena', 'String'],
])

export function replace() {
  return {
    ...replaceObjectStaticMethods({
      from: 'Cadena',
      to: 'String',
      methods: staticMethods,
    }),
    ...replaceExpressionMethods({
      methods,
    }),
    ...replaceObjectProperties({
      properties,
    }),
    ...replaceInstanceof({
      from: 'Cadena',
      to: 'String',
    }),
    ...replaceObjects({
      objects,
    }),
  }
}
