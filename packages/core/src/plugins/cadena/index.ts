import {
  replaceInstanceof,
  replaceObjectMethods,
  replaceObjectProperties,
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
  ['desdeCodigoDeCaracter', 'fromCharCode'],
  ['desdePuntoDeCodigo', 'fromCodePoint'],
  ['incluye', 'includes'],
  ['indiceDe', 'indexOf'],
  ['ultimoIndiceDe', 'lastIndexOf'],
  ['compararLocalizada', 'localeCompare'],
  ['coincidir', 'match'],
  ['coincidirTodo', 'matchAll'],
  ['normalizar', 'normalize'],
  ['rellenarAlFinal', 'padEnd'],
  ['rellenarAlComienzo', 'padStart'],
  ['crudo', 'raw'],
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

export const properties = new Map<string, string>([
  ['longitud', 'length'],
])

export const objects = new Map<string, string>([
  ['Cadena', 'String'],
])

export const replace = () => {
  return {
    ...replaceObjects({
      objects,
    }),
    ...replaceObjectMethods({
      methods,
    }),
    ...replaceObjectProperties({
      properties,
    }),
    ...replaceInstanceof({
      from: 'Cadena',
      to: 'String',
    }),
  }
}
