import { replaceInstanceof, replaceObjects } from '../utils'

export const report = () => 'Converts Booleano methods to JavaScript'

export const methods = new Map<string, string>([
])

export const objects = new Map<string, string>([
  ['Booleano', 'Boolean'],
])

export const replace = () => {
  return {
    ...replaceObjects({
      objects,
    }),
    ...replaceInstanceof({
      from: 'Booleano',
      to: 'Boolean',
    }),
  }
}
