import { replaceInstanceof, replaceObjects } from '../utils'

export const report = () => 'Converts Funcion methods to JavaScript'

export const methods = new Map<string, string>([])

export const objects = new Map<string, string>([['Funcion', 'Function']])

export function replace() {
  return {
    ...replaceInstanceof({
      from: 'Funcion',
      to: 'Function',
    }),
    ...replaceObjects({
      objects,
    }),
  }
}
