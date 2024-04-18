import { replaceInstanceof, replaceObjectMethods, replaceObjects } from '../utils'

export const report = () => 'Converts Funcion methods to JavaScript'

export const methods = new Map<string, string>([])

export const objects = new Map<string, string>([
  ['Funcion', 'Function'],
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
      from: 'Funcion',
      to: 'Function',
    }),
  }
}
