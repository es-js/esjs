import { replaceObjectStaticMethods } from '../utils'

export const report = () => 'Converts JSON methods to JavaScript'

export const methods = new Map<string, string>([])

export const staticMethods = new Map<string, string>([
  ['esJSONCrudo', 'isRawJSON'],
  ['analizar', 'parse'],
  ['JSONCrudo', 'rawJSON'],
  ['aTexto', 'stringify'],
])

export const objects = new Map<string, string>([['Fecha', 'Date']])

export function replace() {
  return {
    ...replaceObjectStaticMethods({
      from: 'JSON',
      to: 'JSON',
      methods: staticMethods,
    }),
  }
}
