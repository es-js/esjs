import { replaceInstanceof, replaceObjectMethods, replaceObjects } from '../utils'

export const report = () => 'Converts Matriz methods to JavaScript'

export const methods = new Map<string, string>([
  ['posicion', 'at'],
  ['concatenar', 'concat'],
  ['copiarDentro', 'copyWithin'],
  ['entradas', 'entries'],
  ['cada', 'every'],
  ['llenar', 'fill'],
  ['filtrar', 'filter'],
  ['buscar', 'find'],
  ['buscarIndice', 'findIndex'],
  ['buscarUltimo', 'findLast'],
  ['buscarUltimoIndice', 'findLastIndex'],
  ['plano', 'flat'],
  ['planoMapear', 'flatMap'],
  ['paraCada', 'forEach'],
  ['grupo', 'group'],
  ['grupoAMapear', 'groupToMap'],
  ['incluye', 'includes'],
  ['indiceDe', 'indexOf'],
  ['juntar', 'join'],
  ['claves', 'keys'],
  ['ultimoIndiceDe', 'lastIndexOf'],
  ['mapear', 'map'],
  ['sacar', 'pop'],
  ['agregar', 'push'],
  ['reducir', 'reduce'],
  ['reducirDerecha', 'reduceRight'],
  ['reverso', 'reverse'],
  ['sacarPrimero', 'shift'],
  ['rodaja', 'slice'],
  ['algun', 'some'],
  ['ordenar', 'sort'],
  ['empalmar', 'splice'],
  ['aCadenaLocalizada', 'toLocaleString'],
  ['aCadena', 'toString'],
  ['agregarInicio', 'unshift'],
  ['valores', 'values'],
  ['de', 'of'],
])

export const objects = new Map<string, string>([
  ['Matriz', 'Array'],
  ['Arreglo', 'Array'],
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
      from: 'Matriz',
      to: 'Array',
    }),
    ...replaceInstanceof({
      from: 'Arreglo',
      to: 'Array',
    }),
  }
}
