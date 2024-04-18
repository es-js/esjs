import { replaceObjectMethods, replaceObjects } from '../utils'

export const report = () => 'Converts Promesa methods to JavaScript'

export const methods = new Map<string, string>([
  ['todos', 'all'],
  ['todosTerminados', 'allSettled'],
  ['cualquiera', 'any'],
  ['capturar', 'catch'],
  ['finalmente', 'finally'],
  ['carrera', 'race'],
  ['rechaza', 'reject'],
  ['resuelve', 'resolve'],
  ['luego', 'then'],
])

export const objects = new Map<string, string>([
  ['Promesa', 'Promise'],
])

export const replace = () => {
  return {
    ...replaceObjects({ objects }),

    ...replaceObjectMethods({
      methods,
    }),
  }
}
